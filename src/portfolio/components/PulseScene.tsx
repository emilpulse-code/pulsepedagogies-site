import {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {prefersReducedMotion} from '../lib/gsapSetup';

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
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

    // Ambient interference waves
    float e = 0.0;
    e += sin(pos.x * 0.55 + t * 0.7) * cos(pos.y * 0.45 - t * 0.45) * 0.35;
    e += sin((pos.x + pos.y) * 0.25 + t * 0.35) * 0.25;

    // Heartbeat — a "lub-dub" pair of rings expanding from the center
    float cycle = 3.4;
    float tt = mod(t, cycle);
    float atten = smoothstep(17.0, 2.0, d);
    e += ring(d - tt * 5.2, 1.1) * 1.7 * atten;
    e += ring(d - (tt - 0.34) * 5.2, 1.1) * 0.95 * atten * step(0.34, tt);

    // Pointer lift
    float pd = distance(pos.xy, uPointer);
    e += exp(-pd * pd * 0.07) * 0.9;

    pos.z += e;
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
    vec3 dim = vec3(0.30, 0.26, 0.24);
    vec3 orange = vec3(1.0, 0.388, 0.129);
    vec3 col = mix(dim, orange, clamp(vElev * 0.55 + 0.12, 0.0, 1.0));
    float fade = smoothstep(18.0, 6.0, vDist);
    gl_FragColor = vec4(col, a * (0.22 + 0.78 * fade));
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
        uSize: {value: 38 * renderer.getPixelRatio()},
        uPointer: {value: new THREE.Vector2(40, 40)}, // off-field until moved
      },
    });

    const points = new THREE.Points(geometry, material);
    points.rotation.x = -Math.PI / 2;
    scene.add(points);

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

    const clock = new THREE.Clock();
    let raf = 0;
    const uniforms = material.uniforms;

    const renderFrame = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uPointer.value.lerp(pointerTarget, 0.06);
      camera.position.x += (cameraDrift.x * 0.7 - camera.position.x) * 0.04;
      camera.position.y += (5.4 + cameraDrift.y * 0.4 - camera.position.y) * 0.04;
      camera.lookAt(0, 0.4, 0);
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
      window.removeEventListener('pointermove', onPointerMove);
      ro.disconnect();
      io.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
