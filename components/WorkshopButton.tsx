"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface WorkshopButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "outline";
}

/**
 * WorkshopButton: A custom button component with "mechanical" feedback.
 * Mimics a physical switch by shifting depth and shadow on click.
 */
export default function WorkshopButton({ children, onClick, className = "", variant = "primary" }: WorkshopButtonProps) {
  
  const baseStyles = "px-6 py-3 font-mono text-xs tracking-widest uppercase transition-all relative overflow-hidden";
  
  const variants = {
    primary: "bg-workshop-accent text-white border-b-4 border-indigo-800 active:border-b-0",
    outline: "border border-workshop-slate/30 text-workshop-slate hover:text-workshop-accent hover:border-workshop-accent border-b-4 active:border-b-0"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ y: 2 }} // Physical downward shift
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <div className="flex items-center justify-center gap-2">
        {children}
      </div>
      
      {/* Subtle scan-line overlay for extra technical texture */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/5 to-transparent opacity-20" />
    </motion.button>
  );
}