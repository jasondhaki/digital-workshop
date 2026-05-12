"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

/**
 * WorkshopButtonProps: 
 * We use 'HTMLMotionProps<"button">' to perfectly sync standard HTML 
 * button attributes with Framer Motion's animation engine.
 */
interface WorkshopButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: "primary" | "outline";
}

/**
 * WorkshopButton: A custom button component with "mechanical" feedback.
 * Now 100% Type-Safe for forms and animations.
 */
export default function WorkshopButton({ 
  children, 
  className = "", 
  variant = "primary",
  // We extract 'type' and 'whileHover'/'whileTap' to manage defaults, 
  // then spread everything else via '...props'
  type = "button", 
  ...props 
}: WorkshopButtonProps) {
  
  const baseStyles = "px-6 py-3 font-mono text-xs tracking-widest uppercase transition-all relative overflow-hidden flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-workshop-accent text-white border-b-4 border-indigo-800 active:border-b-0 disabled:bg-workshop-slate/20 disabled:border-b-0 disabled:text-workshop-slate/50",
    outline: "border border-workshop-slate/30 text-workshop-slate hover:text-workshop-accent hover:border-workshop-accent border-b-4 active:border-b-0 disabled:opacity-50"
  };

  return (
    <motion.button
      // Logic: If the parent doesn't provide hover/tap settings, use these defaults
      whileHover={props.whileHover || { scale: 1.02 }}
      whileTap={props.whileTap || { y: 2 }} 
      
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props} // Spreads standard attributes (disabled, onClick, etc.)
    >
      {children}
      
      {/* Subtle scan-line overlay for extra technical texture */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/5 to-transparent opacity-20" />
    </motion.button>
  );
}