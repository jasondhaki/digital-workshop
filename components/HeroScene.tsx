"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
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
      // PERFORMANCE TUNING: fewer segments on mobile keeps the vertex/noise
      // shader work light enough that it doesn't fight the browser for main
      // thread time while the user scrolls.
      args={[1, isMobile ? 32 : 160, isMobile ? 64 : 320]}
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
  const [isInView, setIsInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile for geometry decimation
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // PERFORMANCE TUNING: stop the WebGL render loop entirely once the hero
  // scrolls out of view, so it doesn't keep competing with scroll/paint on
  // the rest of the page for main-thread time.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      // Resume slightly before the hero is actually on screen so any
      // one-time WebGL/shader warm-up cost lands while it's still just
      // out of view, instead of as a visible stutter mid-scroll.
      { threshold: 0, rootMargin: "300px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    /**
     * MASTER SCROLL FIX (UI Layer):
     * 'pointer-events-none' lets swipes pass through to the page on mobile.
     */
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none md:pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        // PERFORMANCE TUNING: Cap pixel ratio (lower on mobile) to prevent lag on high-res screens
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{ antialias: !isMobile }}
        frameloop={isInView ? "always" : "never"}
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
      </Canvas>
    </div>
  );
}