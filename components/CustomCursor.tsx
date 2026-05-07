"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

/**
 * CustomCursor: A high-tech "sensor" ring that replaces the standard pointer.
 * Optimized in Phase 8 to automatically disable on touch-based mobile devices.
 */
export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  
  // High-performance springs for the "weighted" hardware feel
  const cursorX = useSpring(0, { damping: 25, stiffness: 300 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 300 });

  useEffect(() => {
    // Only track movement if the device supports hover (mouse users)
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);
    
    // Select all interactive elements, including our new WorkshopButtons
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
        scale: isHovering ? 2 : 1,
        borderColor: isHovering ? "rgba(99, 102, 241, 0.8)" : "rgba(99, 102, 241, 0.4)",
        backgroundColor: isHovering ? "rgba(99, 102, 241, 0.1)" : "rgba(99, 102, 241, 0)",
      }}
      // 'hidden md:block' hides the cursor on mobile/tablets to prevent touch-conflict
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-workshop-accent pointer-events-none z-[9999] hidden md:block"
    >
      {/* Central "Target" Dot: Mimics an engineering laser/sensor */}
      <div className="absolute inset-0 m-auto w-1 h-1 bg-workshop-accent rounded-full" />
      
      {/* Visual Feedback: Subtle outer ring pulse on hover */}
      {isHovering && (
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 1 }}
          className="absolute inset-0 border border-workshop-highlight rounded-full opacity-20"
        />
      )}
    </motion.div>
  );
}