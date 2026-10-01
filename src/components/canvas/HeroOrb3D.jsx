import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroOrb3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer = null;
    let reqId = null;
    let geomCore, matCore, ring1Geom, ring1Mat, ring2Geom, ring2Mat, particleGeom, particleMat;

    try {
      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.z = 4.2;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      const size = Math.min(mount.clientWidth, 420);
      renderer.setSize(size, size);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mount.appendChild(renderer.domElement);

      // Inner Core: Icosahedron Wireframe + Glow
      geomCore = new THREE.IcosahedronGeometry(1.25, 2);
      matCore = new THREE.MeshPhysicalMaterial({
        color: 0x38bdf8,
        emissive: 0x0f172a,
        roughness: 0.15,
        metalness: 0.85,
        transmission: 0.6,
        thickness: 1.2,
        wireframe: true,
      });
      const coreMesh = new THREE.Mesh(geomCore, matCore);
      scene.add(coreMesh);

      // Outer Gyroscope Rings
      ring1Geom = new THREE.TorusGeometry(1.7, 0.02, 16, 100);
      ring1Mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 });
      const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
      scene.add(ring1);

      ring2Geom = new THREE.TorusGeometry(1.9, 0.015, 16, 100);
      ring2Mat = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.5 });
      const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
      ring2.rotation.x = Math.PI / 3;
      scene.add(ring2);

      // Surrounding Particle Constellation
      const particleCount = 180;
      particleGeom = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        const radius = 2.0 + Math.random() * 0.9;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = radius * Math.cos(phi);
      }
      particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      particleMat = new THREE.PointsMaterial({
        color: 0x38bdf8,
        size: 0.035,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });
      const particles = new THREE.Points(particleGeom, particleMat);
      scene.add(particles);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0x38bdf8, 3, 10);
      pointLight.position.set(3, 3, 3);
      scene.add(pointLight);

      const violetLight = new THREE.PointLight(0xa855f7, 3, 10);
      violetLight.position.set(-3, -3, 2);
      scene.add(violetLight);

      // Mouse responsiveness
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      const onPointerMove = (e) => {
        const rect = mount.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        targetX = x * 0.8;
        targetY = y * 0.8;
      };

      window.addEventListener('pointermove', onPointerMove, { passive: true });

      const clock = new THREE.Clock();

      const animate = () => {
        const elapsed = clock.getElapsedTime();

        // Smooth lerp rotation towards mouse
        mouseX += (targetX - mouseX) * 0.06;
        mouseY += (targetY - mouseY) * 0.06;

        coreMesh.rotation.y = elapsed * 0.35 + mouseX;
        coreMesh.rotation.x = elapsed * 0.2 + mouseY;

        ring1.rotation.z = elapsed * 0.45;
        ring1.rotation.y = mouseX * 0.5;

        ring2.rotation.y = -elapsed * 0.3;
        ring2.rotation.z = mouseY * 0.5;

        particles.rotation.y = elapsed * 0.08;

        renderer.render(scene, camera);
        reqId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        if (reqId) cancelAnimationFrame(reqId);
        window.removeEventListener('pointermove', onPointerMove);
        if (mount && renderer && renderer.domElement) {
          mount.removeChild(renderer.domElement);
        }
        geomCore?.dispose();
        matCore?.dispose();
        ring1Geom?.dispose();
        ring1Mat?.dispose();
        ring2Geom?.dispose();
        ring2Mat?.dispose();
        particleGeom?.dispose();
        particleMat?.dispose();
        renderer?.dispose();
      };
    } catch (err) {
      console.warn('HeroOrb3D WebGL unsupported:', err);
    }
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        maxWidth: '380px',
        aspectRatio: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        margin: '0 auto',
      }}
    />
  );
}
