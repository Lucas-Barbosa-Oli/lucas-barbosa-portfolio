'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface NeuralCore3DProps {
  scrollProgress: number;
  theme: 'dark' | 'light';
  lang?: 'pt' | 'en';
}

const PALETTES = [
  { primary: new THREE.Color('#38bdf8'), secondary: new THREE.Color('#2dd4bf') },
  { primary: new THREE.Color('#2dd4bf'), secondary: new THREE.Color('#14b8a6') },
  { primary: new THREE.Color('#e07a5f'), secondary: new THREE.Color('#f59e0b') },
  { primary: new THREE.Color('#818cf8'), secondary: new THREE.Color('#38bdf8') },
];

export default function NeuralCore3D({ scrollProgress, theme, lang = 'en' }: NeuralCore3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(scrollProgress);
  const themeRef = useRef(theme);
  const pulseRef = useRef(0);
  const [webglReady, setWebglReady] = useState(true);

  progressRef.current = scrollProgress;
  themeRef.current = theme;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglReady(false);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      Math.max(1, container.clientWidth) / Math.max(1, container.clientHeight),
      0.1,
      100,
    );
    camera.position.set(0, 0, 6.4);

    const root = new THREE.Group();
    scene.add(root);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.85);
    const keyLight = new THREE.PointLight(0x38bdf8, 3.2, 18);
    keyLight.position.set(3.2, 2.8, 4.2);
    const rimLight = new THREE.PointLight(0x2dd4bf, 2.4, 18);
    rimLight.position.set(-3.4, -2.2, 3.0);
    scene.add(ambient, keyLight, rimLight);

    // Inner faceted core
    const coreGeo = new THREE.OctahedronGeometry(0.78, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      emissive: 0x1e293b,
      emissiveIntensity: 0.55,
      metalness: 0.35,
      roughness: 0.22,
      clearcoat: 0.9,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    root.add(coreMesh);

    // Outer neural wireframe shell
    const shellGeo = new THREE.IcosahedronGeometry(1.32, 1);
    const shellWireGeo = new THREE.WireframeGeometry(shellGeo);
    const shellMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.42,
    });
    const shellLines = new THREE.LineSegments(shellWireGeo, shellMat);
    root.add(shellLines);

    // Three orbital rings
    const ringConfigs = [
      { radius: 1.78, tube: 0.022, rx: 1.05, ry: 0.25 },
      { radius: 2.12, tube: 0.018, rx: -0.68, ry: 0.88 },
      { radius: 2.46, tube: 0.014, rx: 0.32, ry: -1.12 },
    ];
    const rings: THREE.Mesh[] = [];
    const ringMats: THREE.MeshStandardMaterial[] = [];
    const ringGeos: THREE.TorusGeometry[] = [];

    ringConfigs.forEach((cfg, idx) => {
      const geo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 16, 96);
      const mat = new THREE.MeshStandardMaterial({
        color: idx % 2 === 0 ? 0x38bdf8 : 0x2dd4bf,
        emissive: idx % 2 === 0 ? 0x38bdf8 : 0x2dd4bf,
        emissiveIntensity: 0.35,
        metalness: 0.5,
        roughness: 0.28,
        transparent: true,
        opacity: 0.82 - idx * 0.14,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.set(cfg.rx, cfg.ry, idx * 0.4);
      root.add(mesh);
      rings.push(mesh);
      ringMats.push(mat);
      ringGeos.push(geo);
    });

    // Orbital satellite nodes
    const satCount = 48;
    const satPositions = new Float32Array(satCount * 3);
    for (let i = 0; i < satCount; i++) {
      const theta = (i / satCount) * Math.PI * 2;
      const phi = Math.acos(2 * ((i * 0.6180339887) % 1) - 1);
      const r = 1.9 + (i % 4) * 0.28;
      satPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      satPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      satPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const satGeo = new THREE.BufferGeometry();
    satGeo.setAttribute('position', new THREE.BufferAttribute(satPositions, 3));
    const satMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.055,
      transparent: true,
      opacity: 0.75,
    });
    const satellites = new THREE.Points(satGeo, satMat);
    root.add(satellites);

    // Pointer parallax
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointerMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const onResize = () => {
      if (!container) return;
      const w = Math.max(1, container.clientWidth);
      const h = Math.max(1, container.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const workingPrimary = new THREE.Color();
    const workingSecondary = new THREE.Color();

    let rafId = 0;
    const clock = new THREE.Clock();

    const renderFrame = () => {
      const t = clock.getElapsedTime();
      const p = Math.max(0, Math.min(1, progressRef.current));

      // Smoothly interpolate across the 4 chapter palettes based on scroll
      const scaled = p * (PALETTES.length - 1);
      const idx = Math.min(PALETTES.length - 2, Math.floor(scaled));
      const localT = scaled - idx;
      workingPrimary.lerpColors(PALETTES[idx].primary, PALETTES[idx + 1].primary, localT);
      workingSecondary.lerpColors(PALETTES[idx].secondary, PALETTES[idx + 1].secondary, localT);

      const isLight = themeRef.current === 'light';
      coreMat.color.setHex(isLight ? 0xe2e8f0 : 0x0f172a);
      coreMat.emissive.copy(workingPrimary).multiplyScalar(isLight ? 0.22 : 0.35);

      shellMat.color.copy(workingPrimary);
      shellMat.opacity = isLight ? 0.52 : 0.42;
      satMat.color.copy(workingSecondary);
      keyLight.color.copy(workingPrimary);
      rimLight.color.copy(workingSecondary);

      ringMats.forEach((m, i) => {
        const col = i % 2 === 0 ? workingPrimary : workingSecondary;
        m.color.copy(col);
        m.emissive.copy(col);
        m.emissiveIntensity = isLight ? 0.18 : 0.38;
      });

      // Decay click pulse
      pulseRef.current *= 0.93;
      const pulseScale = 1 + pulseRef.current * 0.16;

      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;

      // Scroll-driven geometric evolution
      const baseSpin = reduceMotion ? 0 : t * 0.22;
      root.rotation.y = baseSpin + p * Math.PI * 1.85 + pointer.x * 0.35;
      root.rotation.x = Math.sin(p * Math.PI) * 0.42 - pointer.y * 0.28;
      root.scale.setScalar(pulseScale * (1 - p * 0.08));

      coreMesh.rotation.y = -baseSpin * 1.4 - p * 2.1;
      coreMesh.rotation.z = baseSpin * 0.8;

      const shellScale = 1 + Math.sin(p * Math.PI) * 0.18 + pulseRef.current * 0.1;
      shellLines.scale.setScalar(shellScale);
      shellLines.rotation.x = -baseSpin * 0.5 + p * 1.4;

      rings.forEach((ring, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        if (!reduceMotion) {
          ring.rotation.z += 0.0025 * dir;
        }
        ring.scale.setScalar(1 + p * (i * 0.06));
      });

      satellites.rotation.y = -baseSpin * 0.4 + p * 1.2;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(renderFrame);
    };

    rafId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      ro.disconnect();
      coreGeo.dispose();
      coreMat.dispose();
      shellGeo.dispose();
      shellWireGeo.dispose();
      shellMat.dispose();
      ringGeos.forEach(g => g.dispose());
      ringMats.forEach(m => m.dispose());
      satGeo.dispose();
      satMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webglReady) {
    return (
      <div className="neural-fallback" aria-hidden="true">
        <div className="neural-fallback-ring r1" />
        <div className="neural-fallback-ring r2" />
        <div className="neural-fallback-core" />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="neural-canvas-wrap"
      onClick={() => {
        pulseRef.current = 1;
      }}
      title={lang === 'pt' ? 'Clique para pulsar a estrutura 3D' : 'Click to pulse the 3D core'}
      aria-hidden="true"
    />
  );
}
