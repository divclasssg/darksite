"use client";

import { Canvas } from "@react-three/fiber";
import "./GlobeCanvas.scss";

function EarthPreview() {
  return (
    <group rotation={[0.32, -0.58, 0.12]}>
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
        <strong>Client data first</strong>
      </div>
    </div>
  );
}
