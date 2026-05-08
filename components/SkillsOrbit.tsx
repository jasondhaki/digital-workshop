"use client";

import { useState, useEffect } from "react";
import { skills } from "@/data/skills";
import SkillNode from "./SkillNode";
import CircuitLines from "./CircuitLines";

export default function SkillsOrbit() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // 1. Setup Mobile Detection
  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  /**
   * 2. Position Dictionary: Hard-coded coordinates for every skill ID.
   * This ensures nodes never overlap on mobile.
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
      'cpp': { x: 25, y: 8 },
      'robotics': { x: 75, y: 15 },
      'arduino': { x: 25, y: 22 },
      'ros': { x: 75, y: 30 },
      'app-dev': { x: 50, y: 45 }, // Hub
      'react-native': { x: 25, y: 58 },
      'nextjs': { x: 75, y: 58 },
      'web-dev': { x: 50, y: 72 }, // Hub
      'java': { x: 25, y: 85 },
      'html-css': { x: 75, y: 85 },
      'hardware-interface': { x: 50, y: 95 }
    };

    return isMobile ? (mobile[id] || { x: 50, y: 50 }) : (desktop[id] || { x: 50, y: 50 });
  };

  // 3. Define the connections for the SVG lines
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
  ];

  return (
    <div className={`relative w-full border border-workshop-slate/10 rounded-2xl bg-workshop-bg/40 backdrop-blur-sm overflow-hidden flex items-center justify-center transition-all duration-500 ${isMobile ? 'h-[900px]' : 'h-[600px]'}`}>
      
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }}
      />

      <div className="relative w-full h-full max-w-4xl mx-auto">
        {/* SVG Circuit Lines */}
        <CircuitLines 
          hoveredId={hoveredId} 
          links={skillLinks} 
          getPosById={getPosById} 
        />

        {/* Skill Nodes */}
        {skills.map((skill) => {
          // Calculate highlight state locally to avoid ReferenceErrors
          const isCurrent = hoveredId === skill.id;
          
          // Check if this node is a connection of the currently hovered node
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