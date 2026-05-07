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
     * Note: Interactivity will only trigger on desktop (md screens and up)
     * where pointer events are enabled on the container.
     */
    const targetX = state.pointer.y * 0.5;
    const targetY = state.pointer.x * 0.5;

    // Apply linear interpolation (lerp) for smooth, high-end motion 
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
        wireframe={true} // Establishing the technical schematic look
      />
    </Sphere>
  );
}

export default function HeroScene() {
  return (
    /**
     * Mobile Fix: 'pointer-events-none' ensures the 3D scene doesn't 
     * intercept touch/swipe gestures, solving the "stuck scroll" issue.
     * We use 'md:pointer-events-auto' to restore mouse-tracking on desktop.
     */
    <div className="absolute inset-0 z-0 pointer-events-none md:pointer-events-auto">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }}
        // Explicitly allows vertical panning on mobile
        style={{ touchAction: 'pan-y' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        
        <Shape />

        {/* Disable standard controls to allow our custom schematic logic to shine */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false} 
        />
      </Canvas>
    </div>
  );
}