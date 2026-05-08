"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

/**
 * CustomCursor: A high-tech "sensor" ring.
 * Updated with a strict 'Touch Shield' to ensure zero interference on mobile.
 */
export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useSpring(0, { damping: 25, stiffness: 300 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 300 });

  useEffect(() => {
    // 1. Check if the device even supports hover (Mouse vs Touch)
    const hasMouse = window.matchMedia("(pointer: fine)").matches;
    if (!hasMouse) return;

    const moveCursor = (e: MouseEvent) => {
      // Only show the cursor once the mouse starts moving
      if (!isVisible) setIsVisible(true);
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);
    
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
  }, [cursorX, cursorY, isVisible]);

  // If we aren't visible (mobile) or no mouse is detected, render nothing
  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        translateX: cursorX,
        translateY: cursorY,
      }}
      animate={{
        scale: isHovering ? 1.8 : 1,
        borderColor: isHovering ? "rgba(99, 102, 241, 0.8)" : "rgba(99, 102, 241, 0.4)",
        backgroundColor: isHovering ? "rgba(99, 102, 241, 0.1)" : "rgba(99, 102, 241, 0)",
      }}
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-workshop-accent pointer-events-none z-[9999] hidden md:block"
    >
      <div className="absolute inset-0 m-auto w-1 h-1 bg-workshop-accent rounded-full" />
    </motion.div>
  );
}