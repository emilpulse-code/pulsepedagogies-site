import {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {ScrollTrigger, prefersReducedMotion} from '../lib/gsapSetup';

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uBoost;
  uniform vec2 uPointer;
  attribute float aRand;
  varying float vElev;
  varying float vDist;

  float ring(float x, float sharp) {
    return exp(-x * x * sharp);
  }

  void main() {
    vec3 pos = position;
    float d = length(pos.xy);
    float t = uTime;

    // Ambient interference waves — the rolling orange swell
    float e = 0.0;
    e += sin(pos.x * 0.55 + t * 0.7) * cos(pos.y * 0.45 - t * 0.45) * 0.55;
    e += sin((pos.x + pos.y) * 0.25 + t * 0.35) * 0.4;

    // Heartbeat — a "lub-dub" pair of rings expanding from the center
    float cycle = 3.0;
    float tt = mod(t, cycle);
    float atten = smoothstep(17.0, 2.0, d);
    e += ring(d - tt * 5.2, 0.85) * 2.9 * atten;
    e += ring(d - (tt - 0.34) * 5.2, 0.85) * 1.7 * atten * step(0.34, tt);

    // Pointer lift
    float pd = distance(pos.xy, uPointer);
    e += exp(-pd * pd * 0.07) * 1.25;

    pos.z += e * (1.0 + uBoost);
    vElev = e;
    vDist = d;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.85 + max(e, 0.0) * 0.9 + aRand * 0.5) * (1.0 / -mv.z);
  }
`;

const FRAGMENT = /* glsl */ `
  varying float vElev;
  varying float vDist;

  void main() {
    float a = smoothstep(0.5, 0.08, length(gl_PointCoord - 0.5));
    vec3 dim = vec3(0.34, 0.25, 0.20);
    vec3 orange = vec3(1.0, 0.388, 0.129);
    vec3 hot = vec3(1.0, 0.62, 0.32);
    vec3 col = mix(dim, orange, clamp(vElev * 0.8 + 0.18, 0.0, 1.0));
    col = mix(col, hot, smoothstep(1.6, 2.8, vElev)); // crests glow hotter
    float fade = smoothstep(18.0, 6.0, vDist);
    gl_FragColor = vec4(col, a * (0.3 + 0.7 * fade));
  }
`;

// Fluid ember atmosphere — slow fbm clouds behind the particle field,
// after the blurred red fluid backdrop on lukebaffait.fr
const AURORA_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const AURORA_FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uDive;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.1; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.045;
    float n = fbm(uv * 2.4 + vec2(t, -t * 0.6) + fbm(uv * 3.2 - t) * 0.55);
    vec3 ember = vec3(0.42, 0.06, 0.02);
    vec3 orange = vec3(1.0, 0.388, 0.129);
    vec3 col = mix(ember, orange, smoothstep(0.38, 0.95, n));
    float a = smoothstep(0.32, 0.85, n) * 0.38 * (1.0 - uDive * 0.45);
    float vign = smoothstep(0.0, 0.22, uv.x) * smoothstep(1.0, 0.78, uv.x)
               * smoothstep(0.0, 0.18, uv.y) * smoothstep(1.0, 0.55, uv.y);
    gl_FragColor = vec4(col, a * vign);
  }
`;

function buildGrid(cols: number, rows: number, width: number, depth: number) {
  const count = cols * rows;
  const positions = new Float32Array(count * 3);
  const rands = new Float32Array(count);
  let i = 0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      positions[i * 3] = (x / (cols - 1) - 0.5) * width;
      positions[i * 3 + 1] = (y / (rows - 1) - 0.5) * depth;
      positions[i * 3 + 2] = 0;
      rands[i] = Math.random();
      i++;
    }
  }
  return {positions, rands};
}

/**
 * GPU particle field that "beats" like an EKG — rendered behind the hero.
 * Mobile gets a lighter grid; reduced motion gets a single static frame.
 */
export function PulseScene({className = ''}: {className?: string}) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return; // No WebGL — the CSS gradient backdrop stands alone.
    }

    const reduced = prefersReducedMotion();
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const small = window.innerWidth < 768;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2));
    renderer.domElement.style.display = 'block';
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 80);
    camera.position.set(0, 5.4, 9.5);
    camera.lookAt(0, 0.4, 0);

    const cols = small ? 130 : 220;
    const rows = small ? 78 : 130;
    const {positions, rands} = buildGrid(cols, rows, 38, 24);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aRand', new THREE.BufferAttribute(rands, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: {value: 0},
        uSize: {value: 46 * renderer.getPixelRatio()},
        uBoost: {value: 0},
        uPointer: {value: new THREE.Vector2(40, 40)}, // off-field until moved
      },
    });

    const points = new THREE.Points(geometry, material);
    points.rotation.x = -Math.PI / 2;
    scene.add(points);

    // Backdrop atmosphere plane, far behind the field
    const auroraGeo = new THREE.PlaneGeometry(96, 48);
    const auroraMat = new THREE.ShaderMaterial({
      vertexShader: AURORA_VERT,
      fragmentShader: AURORA_FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {uTime: {value: 0}, uDive: {value: 0}},
    });
    const aurora = new THREE.Mesh(auroraGeo, auroraMat);
    aurora.position.set(0, 7, -18);
    aurora.renderOrder = -1;
    scene.add(aurora);

    const resize = () => {
      const {clientWidth: w, clientHeight: h} = mount;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // Pointer → world position on the particle plane (y = 0)
    const raycaster = new THREE.Raycaster();
    const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hit = new THREE.Vector3();
    const ndc = new THREE.Vector2();
    const pointerTarget = new THREE.Vector2(40, 40);
    const cameraDrift = {x: 0, y: 0};

    const onPointerMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      ndc.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(ndc, camera);
      if (raycaster.ray.intersectPlane(groundPlane, hit)) {
        // points is rotated -90° about X: local y = -world z
        pointerTarget.set(hit.x, -hit.z);
      }
      cameraDrift.x = ndc.x;
      cameraDrift.y = ndc.y;
    };
    if (!coarse && !reduced) {
      window.addEventListener('pointermove', onPointerMove, {passive: true});
    }

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(mount);

    // Scroll scrub: as the hero leaves, the camera dives toward the field
    // and the wave amplitude swells (lukebaffait.fr-style scrubbed hero)
    let scrollP = 0;
    let dive = 0;
    const st = reduced
      ? null
      : ScrollTrigger.create({
          trigger: mount,
          start: 'top top',
          end: 'bottom top',
          onUpdate: (self) => (scrollP = self.progress),
        });

    const clock = new THREE.Clock();
    let raf = 0;
    const uniforms = material.uniforms;

    const renderFrame = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uPointer.value.lerp(pointerTarget, 0.06);
      dive += (scrollP - dive) * 0.08;
      uniforms.uBoost.value = dive * 1.3;
      auroraMat.uniforms.uTime.value = uniforms.uTime.value;
      auroraMat.uniforms.uDive.value = dive;
      camera.position.x += (cameraDrift.x * 0.7 - camera.position.x) * 0.04;
      camera.position.y +=
        (5.4 + cameraDrift.y * 0.4 - dive * 3.2 - camera.position.y) * 0.04;
      camera.position.z = 9.5 - dive * 2.6;
      camera.lookAt(0, 0.4 - dive * 0.6, 0);
      renderer.render(scene, camera);
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      renderFrame();
    };

    if (reduced) {
      uniforms.uTime.value = 1.45; // freeze mid-beat
      renderer.render(scene, camera);
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      st?.kill();
      window.removeEventListener('pointermove', onPointerMove);
      ro.disconnect();
      io.disconnect();
      geometry.dispose();
      material.dispose();
      auroraGeo.dispose();
      auroraMat.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
