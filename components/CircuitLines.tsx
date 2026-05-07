"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/skills";

interface Props {
  hoveredId: string | null;
}

/**
 * CircuitLines: Draws the SVG "motherboard traces" between skill nodes.
 * Lines glow based on the active "interconnectivity" logic.
 */
export default function CircuitLines({ hoveredId }: Props) {
  // Define paths between IDs. These coordinates match the node positions in SkillsOrbit.
  const paths = [
    { from: "cpp", to: "robotics", d: "M 10 20 L 40 15" },
    { from: "robotics", to: "arduino", d: "M 40 15 L 70 25" },
    { from: "robotics", to: "ros", d: "M 40 15 L 25 50" },
    { from: "cpp", to: "ros", d: "M 10 20 L 25 50" },
    { from: "react-native", to: "web-dev", d: "M 55 45 L 80 65" },
  ];

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
      {paths.map((path, i) => {
        const isHighlighted = hoveredId === path.from || hoveredId === path.to;
        
        return (
          <g key={i}>
            {/* Background Trace (Dull) */}
            <path
              d={path.d}
              fill="none"
              stroke="#1e293b" // workshop.slate
              strokeWidth="0.2"
              className="transition-colors duration-500"
            />
            
            {/* Animated Glow Trace (Active)  */}
            {isHighlighted && (
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                d={path.d}
                fill="none"
                stroke="#6366f1" // workshop.accent
                strokeWidth="0.4"
                className="drop-shadow-[0_0_2px_#6366f1]"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}