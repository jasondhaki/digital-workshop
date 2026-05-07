"use client";

import { motion } from "framer-motion";

/**
 * ScrollIndicator: A minimalist vertical scanner line.
 * Acts as a visual prompt to begin the system sequence.
 */
export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none">
      <span className="text-[10px] font-mono text-workshop-slate/60 uppercase tracking-[0.2em]">
        Scroll to Explore
      </span>
      <div className="w-[1px] h-12 bg-workshop-slate/20 relative overflow-hidden">
        <motion.div
          animate={{
            y: [-20, 48],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full h-1/3 bg-workshop-accent shadow-[0_0_8px_#6366f1]"
        />
      </div>
    </div>
  );
}