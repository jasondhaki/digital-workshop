"use client";

import { motion } from "framer-motion";

// Define the connection shape to fix the TypeScript 'IntrinsicAttributes' error
interface SkillLink {
  source: string;
  target: string;
}

interface Props {
  hoveredId: string | null;
  links?: SkillLink[]; // Component now accepts the custom link logic
}

/**
 * CircuitLines: Draws the SVG "motherboard traces" between skill nodes.
 * Coordinates (X Y) match the 'positions' percentages in SkillsOrbit.
 */
export default function CircuitLines({ hoveredId }: Props) {
  const paths = [
    // --- Core Engineering ---
    { from: "cpp", to: "robotics", d: "M 10 20 L 40 15" },
    { from: "robotics", to: "arduino", d: "M 40 15 L 70 25" },
    { from: "robotics", to: "ros", d: "M 40 15 L 25 50" },
    { from: "cpp", to: "ros", d: "M 10 20 L 25 50" },

    // --- React Native Dual Hub ---
    { from: "react-native", to: "app-dev", d: "M 55 45 L 40 65" },
    { from: "react-native", to: "web-dev", d: "M 55 45 L 80 65" },

    // --- Next.js Dual Hub ---
    { from: "next_js", to: "app-dev", d: "M 60 85 L 40 65" },
    { from: "next_js", to: "web-dev", d: "M 60 85 L 80 65" },

    // --- Fundamentals & Logic ---
    { from: "html_css", to: "web-dev", d: "M 95 35 L 80 65" },
    { from: "app-dev", to: "java", d: "M 40 65 L 20 80" },
  ];

  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none z-0" 
      viewBox="0 0 100 100" 
      preserveAspectRatio="none"
    >
      {paths.map((path, i) => {
        // Line glows if either end of the trace is being hovered [cite: 32, 833]
        const isHighlighted = hoveredId === path.from || hoveredId === path.to;
        
        return (
          <g key={i}>
            {/* Background Trace (Dull Slate) */}
            <path
              d={path.d}
              fill="none"
              stroke="#1e293b" 
              strokeWidth="0.2"
              className="transition-colors duration-500"
            />
            
            {/* Animated Glow Trace (Active Electric Indigo) */}
            {isHighlighted && (
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                d={path.d}
                fill="none"
                stroke="#6366f1" 
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