"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/**
 * Shape component handles the interactive physics and performance scaling.
 */
function Shape({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || isMobile) return; // Disable rotation math on mobile to save CPU
    
    /**
     * Smoothly calculate target rotation based on mouse (pointer) coordinates.
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
    <Sphere 
      ref={meshRef} 
      // PERFORMANCE TUNING: 64 segments on mobile vs 160 on PC
      args={[1, isMobile ? 64 : 160, isMobile ? 128 : 320]} 
      scale={2.2}
    >
      <MeshDistortMaterial
        color="#6366f1" 
        attach="material"
        distort={0.4}
        speed={1.5}
        wireframe={true} 
      />
    </Sphere>
  );
}

export default function HeroScene() {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for geometry decimation
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    /**
     * MASTER SCROLL FIX (UI Layer):
     * 'pointer-events-none' lets swipes pass through to the page on mobile.
     */
    <div className="absolute inset-0 z-0 pointer-events-none md:pointer-events-auto">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }}
        // PERFORMANCE TUNING: Cap pixel ratio to 1.5 to prevent lag on high-res mobile screens
        dpr={[1, 1.5]}
        /**
         * MASTER SCROLL FIX (Canvas Layer):
         * touchAction: 'pan-y' tells the browser the canvas is not for scrolling.
         */
        style={{ 
          pointerEvents: 'none', 
          touchAction: 'pan-y' 
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        
        <Shape isMobile={isMobile} />

        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false} 
        />
      </Canvas>
    </div>
  );
}