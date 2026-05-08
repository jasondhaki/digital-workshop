"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/**
 * Shape component handles the interactive physics.
 * It tracks mouse movement to create the "schematic" reactive feel.
 */
function Shape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    /**
     * Smoothly calculate target rotation based on mouse (pointer) coordinates.
     * Note: This interaction will only trigger on desktop where pointer events 
     * are enabled.
     */
    const targetX = state.pointer.y * 0.5;
    const targetY = state.pointer.x * 0.5;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x, 
      targetX, 
      0.1
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y, 
      targetY, 
      0.1
    );
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.2}>
      <MeshDistortMaterial
        color="#6366f1" // workshop.accent from theme
        attach="material"
        distort={0.4}
        speed={1.5}
        wireframe={true} // Technical schematic look
      />
    </Sphere>
  );
}

export default function HeroScene() {
  return (
    /**
     * MASTER SCROLL FIX (UI Layer):
     * 1. 'pointer-events-none' on the container makes the whole 3D area 
     * "invisible" to touch, solving the scroll trap.
     * 2. 'md:pointer-events-auto' restores mouse-tracking for desktop users.
     */
    <div className="absolute inset-0 z-0 pointer-events-none md:pointer-events-auto">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }}
        /**
         * MASTER SCROLL FIX (Canvas Layer):
         * 'pointerEvents: none' here is the final lock-breaker. It tells the 
         * browser's gesture engine to completely ignore the 3D canvas when 
         * calculating swipes, passing the event directly to the page scroll.
         */
        style={{ 
          pointerEvents: 'none', 
          touchAction: 'pan-y' 
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        
        <Shape />

        {/* Disable standard controls to keep the scene as a background element */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false} 
        />
      </Canvas>
    </div>
  );
}