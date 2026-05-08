"use client";

import { motion } from "framer-motion";

// 1. Define the shape of our links to keep TypeScript happy
interface SkillLink {
  source: string;
  target: string;
}

interface Props {
  hoveredId: string | null;
  links: SkillLink[]; // REQUIRED: The connection logic
  getPosById: (id: string) => { x: number; y: number }; // REQUIRED: The coordinate logic
}

/**
 * CircuitLines: Draws the SVG "motherboard traces" between skill nodes.
 * This version is dynamic: it calculates positions on the fly so lines
 * never break on mobile or desktop.
 */
export default function CircuitLines({ hoveredId, links, getPosById }: Props) {
  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      // We don't use a fixed viewBox here so we can use percentages 
      // which align perfectly with your node positions.
    >
      {links.map((link, i) => {
        // 2. Get coordinates for start and end nodes
        const start = getPosById(link.source);
        const end = getPosById(link.target);

        // 3. Logic: Does this line need to glow?
        const isHighlighted = hoveredId === link.source || hoveredId === link.target;
        
        return (
          <g key={`${link.source}-${link.target}-${i}`}>
            {/* Background Trace (Dull Slate) - Always visible but subtle */}
            <line
              x1={`${start.x}%`}
              y1={`${start.y}%`}
              x2={`${end.x}%`}
              y2={`${end.y}%`}
              stroke="#1e293b" 
              strokeWidth="1"
              strokeOpacity="0.2"
              className="transition-all duration-500"
            />
            
            {/* Animated Glow Trace (Active Electric Indigo) */}
            {isHighlighted && (
              <motion.line
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                x1={`${start.x}%`}
                y1={`${start.y}%`}
                x2={`${end.x}%`}
                y2={`${end.y}%`}
                stroke="#6366f1" 
                strokeWidth="2"
                strokeLinecap="round"
                className="drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]"
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}