import { useEffect, useRef } from "react";
import * as THREE from "three";

const NODE_COUNT_DESKTOP = 90;
const NODE_COUNT_MOBILE = 45;
const LINK_DISTANCE = 2.6;

export default function Hero3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const isLight = document.documentElement.classList.contains("light");
    const nodeColor = isLight ? 0x4a63d1 : 0x8aa4ff;
    const lineColor = isLight ? 0x6f5cc8 : 0x6c8eff;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const isMobile = width < 640;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const nodeCount = isMobile ? NODE_COUNT_MOBILE : NODE_COUNT_DESKTOP;
    const bounds = { x: 7, y: 4.2, z: 4 };

    const nodes = Array.from({ length: nodeCount }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * bounds.x * 2,
        (Math.random() - 0.5) * bounds.y * 2,
        (Math.random() - 0.5) * bounds.z * 2
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.006,
        (Math.random() - 0.5) * 0.006,
        (Math.random() - 0.5) * 0.006
      ),
    }));

    const pointsGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(nodeCount * 3);
    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pointsMaterial = new THREE.PointsMaterial({
      color: nodeColor,
      size: 0.05,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);

    const maxLines = nodeCount * 8;
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(maxLines * 2 * 3);
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: lineColor,
      transparent: true,
      opacity: 0.18,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    const group = new THREE.Group();
    group.add(points);
    scene.remove(points);
    group.add(lines);
    scene.remove(lines);
    scene.add(group);

    let mouseX = 0;
    let mouseY = 0;
    function onMouseMove(e) {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }
    window.addEventListener("mousemove", onMouseMove);

    let raf;
    function animate() {
      raf = requestAnimationFrame(animate);

      if (!prefersReducedMotion) {
        nodes.forEach((n) => {
          n.position.add(n.velocity);
          if (Math.abs(n.position.x) > bounds.x) n.velocity.x *= -1;
          if (Math.abs(n.position.y) > bounds.y) n.velocity.y *= -1;
          if (Math.abs(n.position.z) > bounds.z) n.velocity.z *= -1;
        });

        group.rotation.y += 0.0009;
        group.rotation.x += 0.0002;
      }

      // Gentle parallax toward the cursor
      group.rotation.y += (mouseX * 0.15 - group.rotation.y) * 0.01;
      group.rotation.x += (mouseY * 0.08 - group.rotation.x) * 0.01;

      const posAttr = pointsGeometry.attributes.position;
      nodes.forEach((n, i) => {
        posAttr.setXYZ(i, n.position.x, n.position.y, n.position.z);
      });
      posAttr.needsUpdate = true;

      let lineIdx = 0;
      const linePosAttr = lineGeometry.attributes.position;
      for (let i = 0; i < nodeCount && lineIdx < maxLines; i++) {
        for (let j = i + 1; j < nodeCount && lineIdx < maxLines; j++) {
          const dist = nodes[i].position.distanceTo(nodes[j].position);
          if (dist < LINK_DISTANCE) {
            linePosAttr.setXYZ(lineIdx * 2, nodes[i].position.x, nodes[i].position.y, nodes[i].position.z);
            linePosAttr.setXYZ(
              lineIdx * 2 + 1,
              nodes[j].position.x,
              nodes[j].position.y,
              nodes[j].position.z
            );
            lineIdx++;
          }
        }
      }
      // Zero out unused line segments so they don't render as stray points at origin
      for (let k = lineIdx; k < maxLines; k++) {
        linePosAttr.setXYZ(k * 2, 0, 0, 0);
        linePosAttr.setXYZ(k * 2 + 1, 0, 0, 0);
      }
      linePosAttr.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIdx * 2);

      renderer.render(scene, camera);
    }
    animate();

    function onResize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 opacity-70 pointer-events-none"
      aria-hidden="true"
    />
  );
}
