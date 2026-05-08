"use client";

import { useState, useEffect } from "react";
import { skills } from "@/data/skills";
import SkillNode from "./SkillNode";
import CircuitLines from "./CircuitLines";

/**
 * SkillsOrbit: Interactive Motherboard Map
 * Master Fix: Implements a "Zig-Zag Ladder" for mobile to prevent node clumping.
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

  // Define the logical connections (must match IDs in your data/skills.ts)
  const skillLinks = [
    { source: 'robotics', target: 'cpp' },
    { source: 'ros', target: 'robotics' },
    { source: 'arduino', target: 'robotics' },
    { source: 'html-css', target: 'web-dev' },
    { source: 'app-dev', target: 'java' },
    { source: 'app-dev', target: 'nextjs' },
    { source: 'app-dev', target: 'react-native' },
    { source: 'web-dev', target: 'nextjs' },
    { source: 'web-dev', target: 'react-native' },
    { source: 'hardware-interface', target: 'arduino' },
  ];

  /**
   * getPosById: Precise Coordinate Mapping
   * Mobile (isMobile): Optimized vertical spacing with a 1000px height buffer.
   * Desktop: Scattered schematic layout.
   */
  const getPosById = (id: string) => {
    const desktop: Record<string, { x: number; y: number }> = {
      'cpp': { x: 15, y: 20 },
      'robotics': { x: 40, y: 15 },
      'arduino': { x: 70, y: 25 },
      'ros': { x: 25, y: 50 },
      'react-native': { x: 55, y: 45 },
      'web-dev': { x: 85, y: 65 },
      'html-css': { x: 95, y: 35 },
      'java': { x: 20, y: 80 },
      'app-dev': { x: 40, y: 65 },
      'nextjs': { x: 65, y: 85 },
      'hardware-interface': { x: 10, y: 60 }
    };

    const mobile: Record<string, { x: number; y: number }> = {
      'cpp': { x: 25, y: 5 },
      'robotics': { x: 75, y: 12 },
      'arduino': { x: 25, y: 20 },
      'ros': { x: 75, y: 28 },
      'hardware-interface': { x: 50, y: 38 }, // Center Hub
      'app-dev': { x: 50, y: 48 }, // Center Hub
      'react-native': { x: 25, y: 58 },
      'nextjs': { x: 75, y: 66 },
      'web-dev': { x: 50, y: 76 }, // Center Hub
      'java': { x: 25, y: 86 },
      'html-css': { x: 75, y: 94 }
    };

    const coords = isMobile ? mobile[id] : desktop[id];
    
    // Safety Fallback: If a new ID is added, calculate a row automatically
    if (!coords && isMobile) {
      const idx = skills.findIndex(s => s.id === id);
      return { x: idx % 2 === 0 ? 25 : 75, y: 10 + (idx * 8) };
    }

    return coords || { x: 50, y: 50 };
  };

  return (
    <div className={`relative w-full border border-workshop-slate/10 rounded-2xl bg-workshop-bg/40 backdrop-blur-sm overflow-hidden flex items-center justify-center transition-all duration-500 ${isMobile ? 'h-[1000px] p-2' : 'h-[600px] p-8'}`}>
      
      {/* Decorative Motherboard Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }}
      />

      <div className="relative w-full h-full max-w-4xl mx-auto">
        {/* SVG Circuit Trace Layer */}
        <CircuitLines 
          hoveredId={hoveredId} 
          links={skillLinks} 
          getPosById={getPosById} 
        />

        {/* Interactive Skill Nodes */}
        {skills.map((skill) => {
          const isCurrent = hoveredId === skill.id;
          const hoveredNodeData = skills.find(s => s.id === hoveredId);
          const isConnected = hoveredNodeData?.connections.includes(skill.id);
          
          const isHighlighted = isCurrent || isConnected;
          const isDimmed = hoveredId !== null && !isHighlighted;
          const pos = getPosById(skill.id);

          return (
            <div
              key={skill.id}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <SkillNode
                skill={skill}
                isHighlighted={!!isHighlighted}
                isDimmed={isDimmed}
                onHover={setHoveredId}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}