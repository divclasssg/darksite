"use client";

import { useRef } from "react";
import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { useRecommendationWorkspace } from "@/recommendation/state";
import "./GlobeCanvas.scss";

function EarthPreview() {
  const groupRef = useRef<Group>(null);
  const dragRef = useRef({ isDragging: false, x: 0, y: 0 });

  useFrame(() => {
    if (!groupRef.current || dragRef.current.isDragging) return;
    groupRef.current.rotation.y += 0.0022;
  });

  function handlePointerDown(event: ThreeEvent<PointerEvent>) {
    dragRef.current = { isDragging: true, x: event.clientX, y: event.clientY };
  }

  function handlePointerMove(event: ThreeEvent<PointerEvent>) {
    if (!groupRef.current || !dragRef.current.isDragging) return;

    const deltaX = event.clientX - dragRef.current.x;
    const deltaY = event.clientY - dragRef.current.y;
    groupRef.current.rotation.y += deltaX * 0.006;
    groupRef.current.rotation.x += deltaY * 0.004;
    dragRef.current = { isDragging: true, x: event.clientX, y: event.clientY };
  }

  function handlePointerUp() {
    dragRef.current.isDragging = false;
  }

  return (
    <group
      ref={groupRef}
      rotation={[0.32, -0.58, 0.12]}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <mesh>
        <sphereGeometry args={[1.82, 64, 64]} />
        <meshStandardMaterial color="#123a54" metalness={0.08} roughness={0.42} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.84, 64, 64]} />
        <meshBasicMaterial color="#5eead4" wireframe transparent opacity={0.2} />
      </mesh>
      <mesh position={[0.82, -1.08, 1.26]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color="#a3e635" />
      </mesh>
    </group>
  );
}

export function GlobeCanvas() {
  const selectedDate = useRecommendationWorkspace((state) => state.selectedDate);
  const activeLayers = useRecommendationWorkspace((state) => state.activeLayers);
  const activeLayerCount = Object.values(activeLayers).filter(Boolean).length;

  return (
    <div className="globe-canvas" aria-label="3D globe preview">
      <Canvas camera={{ position: [0, 0.45, 5], fov: 42 }}>
        <color attach="background" args={["#02040a"]} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[4, 3, 5]} intensity={2.6} />
        <EarthPreview />
      </Canvas>
      <div className="globe-readout">
        <span>NZ fixture orbit</span>
        <strong>{selectedDate}</strong>
        <small>{activeLayerCount} layers active</small>
      </div>
    </div>
  );
}
