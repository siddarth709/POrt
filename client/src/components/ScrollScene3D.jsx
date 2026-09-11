import React, { useLayoutEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const fallbackImage = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1600 900%22 preserveAspectRatio=%22none%22%3E%3Crect width=%221600%22 height=%22900%22 fill=%22%23050508%22/%3E%3Cpath d=%22M-80 760 520 140l350 300L1510-40M410 940 980 260l700 480%22 fill=%22none%22 stroke=%22%2367E8F9%22 stroke-opacity=%22.2%22 stroke-width=%22120%22/%3E%3Ccircle cx=%221140%22 cy=%22340%22 r=%22130%22 fill=%22none%22 stroke=%22%23A78BFA%22 stroke-opacity=%22.26%22 stroke-width=%223%22/%3E%3C/svg%3E';

function ScrollMesh({ reducedMotion }) {
  const groupRef = useRef(null);
  const meshRef = useRef(null);

  useLayoutEffect(() => {
    if (reducedMotion || !groupRef.current) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      [
        { selector: '#about', rotation: { x: 0.15, y: -0.35, z: 0.08 }, scale: 1.05 },
        { selector: '#projects', rotation: { x: -0.2, y: 0.5, z: -0.12 }, scale: 1.28 },
        { selector: '#contact', rotation: { x: 0.3, y: -0.7, z: 0.18 }, scale: 0.9 },
      ].forEach(({ selector, rotation, scale }) => {
        const trigger = document.querySelector(selector);
        if (!trigger) return;
        gsap.to(groupRef.current.rotation, {
          ...rotation,
          scrollTrigger: {
            trigger,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
        gsap.to(groupRef.current.scale, {
          x: scale,
          y: scale,
          z: scale,
          scrollTrigger: {
            trigger,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      });

      const projects = document.querySelector('#projects');
      if (projects && meshRef.current) {
        gsap.to(meshRef.current.material, {
          opacity: 0.18,
          scrollTrigger: {
            trigger: projects,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
        });
      }
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <group ref={groupRef} rotation={[0.16, -0.3, 0]}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshStandardMaterial color="#67e8f9" emissive="#164e63" emissiveIntensity={1.8} roughness={0.22} metalness={0.72} transparent opacity={0.32} wireframe />
      </mesh>
      <mesh rotation={[0.4, 0.2, 0.1]} scale={0.7}>
        <torusGeometry args={[1.55, 0.018, 12, 96]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.7} />
      </mesh>
      <mesh rotation={[-0.7, 0.55, -0.25]} scale={0.95}>
        <torusGeometry args={[1.85, 0.012, 12, 96]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.48} />
      </mesh>
    </group>
  );
}

export default function ScrollScene3D() {
  const [failed, setFailed] = useState(false);
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion || failed) {
    return <img className="portfolio-3d-fallback" src={fallbackImage} alt="" aria-hidden="true" />;
  }

  return (
    <Canvas
      className="portfolio-3d-canvas"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.domElement.addEventListener('webglcontextlost', () => setFailed(true), { once: true });
      }}
      fallback={<img className="portfolio-3d-fallback" src={fallbackImage} alt="" aria-hidden="true" />}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 2, 4]} color="#67e8f9" intensity={7} distance={12} />
      <pointLight position={[-4, -2, 2]} color="#a78bfa" intensity={5} distance={10} />
      <ScrollMesh reducedMotion={reducedMotion} />
    </Canvas>
  );
}
