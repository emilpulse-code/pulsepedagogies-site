import {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {prefersReducedMotion} from '../lib/gsapSetup';

const VERTEX = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  attribute vec2 aCenter;
  attribute vec3 aRand;
  attribute float aFace; // 0 = textured front face, >0 = block side shade
  varying vec2 vUv;
  varying float vFade;
  varying float vFace;

  mat2 rot(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, -s, s, c);
  }

  void main() {
    // Per-shard stagger — every fragment leaves on its own schedule
    float p = smoothstep(aRand.x * 0.5, 1.0, uProgress);

    // Outward + toward the camera — kept tight for a subtle break
    vec3 dir = normalize(vec3(aCenter * 0.4 + (aRand.xy - 0.5) * 0.9, 1.2 + aRand.z * 1.6));

    // Gentle tumble around the shard's own center (two axes)
    vec3 l = position - vec3(aCenter, 0.0);
    l.xy = rot((aRand.y - 0.5) * 2.4 * p) * l.xy;
    l.yz = rot((aRand.z - 0.5) * 1.6 * p) * l.yz;
    vec3 pos = vec3(aCenter, 0.0) + l;

    // Idle breathing — global, not per-shard, so the resting image stays
    // perfectly seamless and recognizable until the break begins
    pos.z += sin(uTime * 1.2) * 0.04;

    pos += dir * p * p * 2.3;
    vFade = 1.0 - smoothstep(0.55, 1.0, p);
    vUv = uv;
    vFace = aFace;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform sampler2D uMap;
  varying vec2 vUv;
  varying float vFade;
  varying float vFace;

  void main() {
    vec4 c = texture2D(uMap, vUv);
    // Block sides/backs: the underlying pixel, darkened by the face shade —
    // shards read as solid chunks carved out of the image
    vec3 col = vFace > 0.0 ? c.rgb * (0.18 + vFace * 0.4) : c.rgb;
    float a = c.a * vFade;
    if (a < 0.02) discard;
    gl_FragColor = vec4(col, a);
  }
`;

interface ShardArrays {
  pos: number[];
  uv: number[];
  center: number[];
  rand: number[];
  face: number[];
}

function pushVert(a: ShardArrays, x: number, y: number, z: number, u: number, t: number, cx: number, cy: number, r: [number, number, number], face: number) {
  a.pos.push(x, y, z);
  a.uv.push(u, t);
  a.center.push(cx, cy);
  a.rand.push(r[0], r[1], r[2]);
  a.face.push(face);
}

function pushQuad(
  a: ShardArrays,
  corners: [number, number, number][], // 4 corners, CCW
  uvs: [number, number][],
  cx: number, cy: number, r: [number, number, number], face: number,
) {
  const [p0, p1, p2, p3] = corners;
  const [u0, u1, u2, u3] = uvs;
  pushVert(a, ...p0, ...u0, cx, cy, r, face);
  pushVert(a, ...p1, ...u1, cx, cy, r, face);
  pushVert(a, ...p2, ...u2, cx, cy, r, face);
  pushVert(a, ...p0, ...u0, cx, cy, r, face);
  pushVert(a, ...p2, ...u2, cx, cy, r, face);
  pushVert(a, ...p3, ...u3, cx, cy, r, face);
}

/**
 * Tessellate the image plane into 3D shards: mostly extruded blocks with
 * random depth, mixed with flat triangle splinters — so the break reads as
 * chunky geometry, not paper confetti.
 */
function buildShards(w: number, h: number, cols: number, rows: number) {
  const a: ShardArrays = {pos: [], uv: [], center: [], rand: [], face: []};

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x0 = -w / 2 + (col / cols) * w;
      const x1 = -w / 2 + ((col + 1) / cols) * w;
      const y0 = -h / 2 + (row / rows) * h;
      const y1 = -h / 2 + ((row + 1) / rows) * h;
      const u0 = col / cols, u1 = (col + 1) / cols;
      const t0 = row / rows, t1 = (row + 1) / rows;
      const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
      const cu = (u0 + u1) / 2, ct = (t0 + t1) / 2;

      if (Math.random() < 0.62) {
        // ── 3D block: textured front at z=0, extruded backward ──
        const r: [number, number, number] = [Math.random(), Math.random(), Math.random()];
        const d = (0.35 + r[2] * 0.85) * (h / rows); // depth ~ tile scale
        // front (textured)
        pushQuad(a, [[x0, y0, 0], [x1, y0, 0], [x1, y1, 0], [x0, y1, 0]],
          [[u0, t0], [u1, t0], [u1, t1], [u0, t1]], cx, cy, r, 0);
        // back
        pushQuad(a, [[x1, y0, -d], [x0, y0, -d], [x0, y1, -d], [x1, y1, -d]],
          [[cu, ct], [cu, ct], [cu, ct], [cu, ct]], cx, cy, r, 0.35);
        // sides: top / bottom / left / right with distinct shades
        pushQuad(a, [[x0, y1, 0], [x1, y1, 0], [x1, y1, -d], [x0, y1, -d]],
          [[cu, ct], [cu, ct], [cu, ct], [cu, ct]], cx, cy, r, 1.0);
        pushQuad(a, [[x0, y0, -d], [x1, y0, -d], [x1, y0, 0], [x0, y0, 0]],
          [[cu, ct], [cu, ct], [cu, ct], [cu, ct]], cx, cy, r, 0.5);
        pushQuad(a, [[x0, y0, -d], [x0, y0, 0], [x0, y1, 0], [x0, y1, -d]],
          [[cu, ct], [cu, ct], [cu, ct], [cu, ct]], cx, cy, r, 0.7);
        pushQuad(a, [[x1, y0, 0], [x1, y0, -d], [x1, y1, -d], [x1, y1, 0]],
          [[cu, ct], [cu, ct], [cu, ct], [cu, ct]], cx, cy, r, 0.85);
      } else {
        // ── two flat triangle splinters, each on its own trajectory ──
        const rA: [number, number, number] = [Math.random(), Math.random(), Math.random()];
        const rB: [number, number, number] = [Math.random(), Math.random(), Math.random()];
        pushVert(a, x0, y0, 0, u0, t0, cx, cy, rA, 0);
        pushVert(a, x1, y0, 0, u1, t0, cx, cy, rA, 0);
        pushVert(a, x1, y1, 0, u1, t1, cx, cy, rA, 0);
        pushVert(a, x0, y0, 0, u0, t0, cx, cy, rB, 0);
        pushVert(a, x1, y1, 0, u1, t1, cx, cy, rB, 0);
        pushVert(a, x0, y1, 0, u0, t1, cx, cy, rB, 0);
      }
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(a.pos), 3));
  geo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(a.uv), 2));
  geo.setAttribute('aCenter', new THREE.BufferAttribute(new Float32Array(a.center), 2));
  geo.setAttribute('aRand', new THREE.BufferAttribute(new Float32Array(a.rand), 3));
  geo.setAttribute('aFace', new THREE.BufferAttribute(new Float32Array(a.face), 1));
  return geo;
}

/**
 * The reveal-frame animation: the artwork is tessellated into 3D blocks and
 * triangle splinters that breathe in place, then tear off and tumble toward
 * the viewer as `progressRef` (driven by the Reveal ScrollTrigger) runs 0 → 1.
 * Expects a square alpha image rendered contain-fit over the ink backdrop.
 */
export function ShatterScene({
  src,
  progressRef,
  className = '',
}: {
  src: string;
  progressRef: {current: number};
  className?: string;
}) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({antialias: false, alpha: true, powerPreference: 'high-performance'});
    } catch {
      return; // static <img> fallback stays visible underneath
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = 'block';
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const FOV = 42;
    const DIST = 5;
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 30);
    camera.position.z = DIST;

    // Square artwork, fit just inside the frame: plane height ≈ view height
    const planeH = 2 * DIST * Math.tan((FOV * Math.PI) / 360) * 0.99;
    const small = window.innerWidth < 768;
    const geometry = buildShards(planeH, planeH, small ? 14 : 22, small ? 14 : 22);

    const texture = new THREE.TextureLoader().load(src, () => {
      if (prefersReducedMotion()) renderer.render(scene, camera);
    });
    texture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      // Depth-write ON: block sides/backs must lose the depth test against
      // their own front face, or the resting image reads as dark blocks
      depthWrite: true,
      side: THREE.DoubleSide,
      uniforms: {
        uMap: {value: texture},
        uProgress: {value: 0},
        uTime: {value: 0},
      },
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const resize = () => {
      const {clientWidth: w, clientHeight: h} = mount;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      // keep the square artwork contained on narrow viewports
      mesh.scale.setScalar(Math.min(1, camera.aspect) * 1);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(mount);

    const clock = new THREE.Clock();
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      const t = clock.getElapsedTime();
      material.uniforms.uTime.value = t;
      // gentle whole-image sway keeps it alive while intact
      mesh.rotation.y = Math.sin(t * 0.35) * 0.045;
      mesh.rotation.x = Math.cos(t * 0.28) * 0.03;
      // ease toward the scrubbed value so the break feels fluid
      const u = material.uniforms.uProgress;
      u.value += (progressRef.current - u.value) * 0.12;
      renderer.render(scene, camera);
    };
    if (!prefersReducedMotion()) loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [src, progressRef]);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
