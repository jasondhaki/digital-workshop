"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

/**
 * CustomCursor: A high-tech "sensor" ring that replaces the standard pointer.
 * Implements the expanding "target" behavior from the design strategy.
 */
export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  
  // Using springs for high-end, smooth physics-based motion
  const cursorX = useSpring(0, { damping: 20, stiffness: 250 });
  const cursorY = useSpring(0, { damping: 20, stiffness: 250 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);
    
    // Select all interactive elements to trigger the expansion effect
    const clickables = document.querySelectorAll('button, a, [role="button"], .cursor-crosshair');
    clickables.forEach(el => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      clickables.forEach(el => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{
        translateX: cursorX,
        translateY: cursorY,
      }}
      animate={{
        scale: isHovering ? 2.5 : 1,
        borderColor: isHovering ? "rgba(99, 102, 241, 0.8)" : "rgba(99, 102, 241, 0.4)",
      }}
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-workshop-accent pointer-events-none z-[9999] hidden lg:block"
    >
      {/* Central "Target" Dot */}
      <div className="absolute inset-0 m-auto w-1 h-1 bg-workshop-accent rounded-full" />
    </motion.div>
  );
}