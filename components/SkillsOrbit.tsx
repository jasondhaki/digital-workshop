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
    { source: 'fastapi', target: 'python' },
    { source: 'ai_agents', target: 'python' },
    { source: 'ai_agents', target: 'rag' },
    { source: 'rag', target: 'python' },
    { source: 'streamlit', target: 'python' },
  ];

  const getPosById = (id: string) => {
    const desktop: Record<string, { x: number; y: number }> = {
      'cpp': { x: 10, y: 20 }, 'robotics': { x: 40, y: 15 }, 'arduino': { x: 70, y: 25 },
      'ros': { x: 25, y: 50 }, 'react-native': { x: 55, y: 45 }, 'web-dev': { x: 80, y: 65 },
      'french': { x: 5, y: 60 }, 'html_css': { x: 95, y: 35 }, 'java': { x: 20, y: 80 },
      'app-dev': { x: 40, y: 65 }, 'next_js': { x: 60, y: 85 },
      'javascript': { x: 85, y: 8 }, 'python': { x: 92, y: 88 }, 'node_js': { x: 8, y: 38 },
      'fastapi': { x: 65, y: 8 }, 'streamlit': { x: 48, y: 30 },
      'ai_agents': { x: 12, y: 52 }, 'rag': { x: 75, y: 45 }
    };

    // A tight, uniform 2-column grid (x=25/75, evenly stepped y) — safe even
    // for the widest label ("React Native") at this container width, and
    // deliberately compact: an earlier version stretched the container tall
    // to fit new rows while keeping the old loose spacing, which read as
    // sparse/empty on a real phone. This favors density over the desktop
    // map's hand-placed "scattered" look, which doesn't work at this scale.
    const mobile: Record<string, { x: number; y: number }> = {
      'cpp': { x: 25, y: 6 }, 'robotics': { x: 75, y: 6 },
      'arduino': { x: 25, y: 16 }, 'ros': { x: 75, y: 16 },
      'app-dev': { x: 25, y: 26 }, 'javascript': { x: 75, y: 26 },
      'react-native': { x: 25, y: 36 }, 'next_js': { x: 75, y: 36 },
      'web-dev': { x: 25, y: 46 }, 'python': { x: 75, y: 46 },
      'french': { x: 25, y: 56 }, 'java': { x: 75, y: 56 },
      'html_css': { x: 25, y: 66 }, 'node_js': { x: 75, y: 66 },
      'fastapi': { x: 25, y: 76 }, 'streamlit': { x: 75, y: 76 },
      'ai_agents': { x: 25, y: 86 }, 'rag': { x: 75, y: 86 }
    };

    return isMobile ? (mobile[id] || { x: 50, y: 50 }) : (desktop[id] || { x: 50, y: 50 });
  };

  return (
    <div className={`relative w-full border border-workshop-slate/10 rounded-2xl bg-workshop-bg/40 backdrop-blur-sm overflow-hidden flex items-center justify-center transition-all duration-500 ${isMobile ? 'h-[700px] p-2' : 'h-[600px] p-8'}`}>
      
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