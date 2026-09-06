"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { skills } from "@/data/skills";
import SkillNode from "./SkillNode";
import CircuitLines from "./CircuitLines";

/**
 * SkillsOrbit: Interactive Motherboard Map
 * FINAL PERFORMANCE FIX: Optimized stacking context and stable transitions.
 */
export default function SkillsOrbit() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const skillLinks = [
    { source: 'robotics', target: 'cpp' },
    { source: 'ros', target: 'robotics' },
    { source: 'arduino', target: 'robotics' },
    { source: 'html_css', target: 'web-dev' },
    { source: 'app-dev', target: 'java' },
    { source: 'app-dev', target: 'next_js' },
    { source: 'app-dev', target: 'react-native' },
    { source: 'web-dev', target: 'next_js' },
    { source: 'web-dev', target: 'react-native' },
    { source: 'javascript', target: 'web-dev' },
    { source: 'javascript', target: 'html_css' },
    { source: 'python', target: 'robotics' },
    { source: 'node_js', target: 'web-dev' },
  ];

  const getPosById = (id: string) => {
    const desktop: Record<string, { x: number; y: number }> = {
      'cpp': { x: 10, y: 20 }, 'robotics': { x: 40, y: 15 }, 'arduino': { x: 70, y: 25 },
      'ros': { x: 25, y: 50 }, 'react-native': { x: 55, y: 45 }, 'web-dev': { x: 80, y: 65 },
      'french': { x: 5, y: 60 }, 'html_css': { x: 95, y: 35 }, 'java': { x: 20, y: 80 },
      'app-dev': { x: 40, y: 65 }, 'next_js': { x: 60, y: 85 },
      'javascript': { x: 85, y: 8 }, 'python': { x: 92, y: 88 }, 'node_js': { x: 8, y: 38 }
    };

    // Existing rows alternate: two hand-offset "pairs", then a repeating
    // (aligned pair, solo-center) rhythm. The 3 new nodes convert the 3
    // solo-center rows into aligned pairs (same x=25/75 pattern already
    // used elsewhere) instead of adding new rows — keeps the same vertical
    // range so nothing shifts toward the container's clipped edges.
    const mobile: Record<string, { x: number; y: number }> = {
      'cpp': { x: 25, y: 5 }, 'robotics': { x: 75, y: 12 }, 'arduino': { x: 25, y: 20 },
      'ros': { x: 75, y: 28 },
      'app-dev': { x: 25, y: 40 }, 'javascript': { x: 75, y: 40 },
      'react-native': { x: 25, y: 52 }, 'next_js': { x: 75, y: 52 },
      'web-dev': { x: 25, y: 65 }, 'python': { x: 75, y: 65 },
      'french': { x: 25, y: 78 }, 'java': { x: 75, y: 78 },
      'html_css': { x: 25, y: 92 }, 'node_js': { x: 75, y: 92 }
    };

    return isMobile ? (mobile[id] || { x: 50, y: 50 }) : (desktop[id] || { x: 50, y: 50 });
  };

  return (
    <div className={`relative w-full border border-workshop-slate/10 rounded-2xl bg-workshop-bg/40 backdrop-blur-sm overflow-hidden flex items-center justify-center transition-all duration-500 ${isMobile ? 'h-[950px] p-2' : 'h-[600px] p-8'}`}>
      
      {/* 1. Background Grid Layer */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }}
      />

      <div className="relative w-full h-full max-w-4xl mx-auto">
        
        {/* 2. SVG Trace Layer (z-0 to stay behind nodes) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <CircuitLines 
            hoveredId={hoveredId} 
            links={skillLinks} 
            getPosById={getPosById} 
          />
        </div>

        {/* 3. Skill Nodes (z-10 to stay on top) */}
        {skills.map((skill) => {
          const isHighlighted = hoveredId === skill.id || skills.find(s => s.id === hoveredId)?.connections?.includes(skill.id);
          const isDimmed = hoveredId !== null && !isHighlighted;
          const pos = getPosById(skill.id);

          return (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: isMobile ? 1 : 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              // STABILITY FIX: Define transition directly to avoid clashing
              transition={isMobile 
                ? { duration: 0.3 } 
                : { type: "spring", stiffness: 260, damping: 20 }
              }
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <SkillNode
                skill={skill}
                isHighlighted={!!isHighlighted}
                isDimmed={isDimmed}
                onHover={setHoveredId}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}