import { useEffect, useRef } from "react";
import * as THREE from "three";

// Isolated decorative hero moment — rotating low-poly wireframe car.
// Vanilla Three.js only, code-split via React.lazy in App.jsx so it never
// blocks the estimator wizard's load or interactivity.
export default function Hero3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(4, 2.2, 5.5);
    camera.lookAt(0, 0.3, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // ── Low-poly wireframe car, built from primitives (no external asset) ──
    const car = new THREE.Group();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.85,
    });

    function addEdges(geometry, position, rotationX = 0) {
      const edges = new THREE.EdgesGeometry(geometry);
      const line = new THREE.LineSegments(edges, lineMaterial);
      if (position) line.position.set(...position);
      if (rotationX) line.rotation.x = rotationX;
      car.add(line);
      return line;
    }

    addEdges(new THREE.BoxGeometry(3.2, 0.7, 1.4), [0, 0.35, 0]);
    addEdges(new THREE.BoxGeometry(1.6, 0.6, 1.3), [-0.15, 0.95, 0]);

    const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.25, 12);
    [
      [1.1, 0, 0.75],
      [1.1, 0, -0.75],
      [-1.1, 0, 0.75],
      [-1.1, 0, -0.75],
    ].forEach((pos) => addEdges(wheelGeo, pos, Math.PI / 2));

    car.position.y = -0.3;
    scene.add(car);

    let frameId;
    function animate() {
      if (!prefersReducedMotion) car.rotation.y += 0.006;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }
    animate();

    function handleResize() {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      lineMaterial.dispose();
      wheelGeo.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" aria-hidden="true" />;
}
