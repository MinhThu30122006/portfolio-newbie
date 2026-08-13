import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeHero() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.15, 5.3);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.05, 2),
      new THREE.MeshPhysicalMaterial({
        color: 0xf0a5bb,
        roughness: 0.22,
        metalness: 0.12,
        transmission: 0.25,
        transparent: true,
        opacity: 0.92,
        clearcoat: 0.8,
        clearcoatRoughness: 0.2,
      }),
    );
    group.add(core);

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.16, 2),
      new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.34 }),
    );
    group.add(wire);

    const orbitNodes = new THREE.Group();
    const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xe97f9f });
    const points = [];
    for (let index = 0; index < 18; index += 1) {
      const theta = (index / 18) * Math.PI * 2;
      const radius = 1.52 + Math.sin(index * 2.1) * 0.08;
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(index % 3 === 0 ? 0.075 : 0.045, 16, 16),
        orbitMaterial,
      );
      node.position.set(
        Math.cos(theta) * radius,
        Math.sin(theta * 1.28) * 0.55,
        Math.sin(theta) * radius * 0.63,
      );
      orbitNodes.add(node);
      points.push(node.position.clone());
    }
    orbitNodes.add(
      new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({ color: 0xe97f9f, transparent: true, opacity: 0.38 }),
      ),
    );
    group.add(orbitNodes);

    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(1.65, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xf7c7d5, transparent: true, opacity: 0.09 }),
    );
    group.add(halo);

    scene.add(new THREE.AmbientLight(0xffffff, 1.8));
    const keyLight = new THREE.PointLight(0xffffff, 7, 12);
    keyLight.position.set(2.5, 3.5, 4);
    scene.add(keyLight);
    const pinkLight = new THREE.PointLight(0xf18eae, 4, 10);
    pinkLight.position.set(-3, -2, 2);
    scene.add(pinkLight);

    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    let frameId;

    const handlePointerMove = (event) => {
      const rect = mount.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.6;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.5;
    };
    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };
    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    mount.addEventListener('pointermove', handlePointerMove);
    mount.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('resize', resize);
    resize();

    const startedAt = performance.now();
    const animate = (now) => {
      const elapsed = (now - startedAt) / 1000;
      pointerX += (targetX - pointerX) * 0.035;
      pointerY += (targetY - pointerY) * 0.035;
      group.rotation.y = elapsed * 0.18 + pointerX;
      group.rotation.x = Math.sin(elapsed * 0.32) * 0.08 + pointerY;
      wire.rotation.y = -elapsed * 0.06;
      orbitNodes.rotation.z = elapsed * 0.12;
      core.scale.setScalar(1 + Math.sin(elapsed * 1.4) * 0.025);
      halo.scale.setScalar(1 + Math.sin(elapsed * 0.75) * 0.03);
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      mount.removeEventListener('pointermove', handlePointerMove);
      mount.removeEventListener('pointerleave', handlePointerLeave);
      renderer.dispose();
      scene.traverse((object) => {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
        else object.material?.dispose();
      });
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="three-root" aria-label="Interactive 3D model" />;
}
