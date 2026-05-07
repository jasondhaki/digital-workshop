"use client";

import { useState } from "react";
import { skills } from "@/data/skills";
import SkillNode from "./SkillNode";
import CircuitLines from "./CircuitLines";

/**
 * SkillsOrbit: The main container for the interactive node map.
 * Manages the highlight logic and the physical SVG "circuit" links.
 */
export default function SkillsOrbit() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Find the skill currently being hovered to check for its motherboard connections [cite: 734]
  const activeSkill = skills.find((s) => s.id === hoveredId);

  /**
   * skillLinks: Defines the logical relationships for the "Electric Indigo" glow.
   * IDs match the 'id' field in your data/skills.ts file[cite: 794, 831].
   */
  const skillLinks = [
    // Core Engineering
    { source: 'robotics', target: 'cpp' },
    { source: 'ros', target: 'robotics' },
    { source: 'arduino', target: 'robotics' },
    
    // Web & Fundamentals
    { source: 'html_css', target: 'web-dev' },
    
    // App Development Hub
    { source: 'app-dev', target: 'java' },
    { source: 'app-dev', target: 'next_js' },
    { source: 'app-dev', target: 'react-native' },
    
    // Web Development Hub
    { source: 'web-dev', target: 'next_js' },
    { source: 'web-dev', target: 'react-native' },
  ];

  return (
    <div className="relative w-full h-[600px] border border-workshop-slate/10 rounded-2xl bg-workshop-bg/40 backdrop-blur-sm overflow-hidden flex items-center justify-center p-8">
      {/* Decorative Grid Layer [cite: 735] */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }}
      />

      <div className="relative w-full h-full max-w-4xl mx-auto">
        {/* Passing the logic to the visual layer - This will trigger a temporary TS error until Step 3 */}
        <CircuitLines hoveredId={hoveredId} links={skillLinks} />

        {skills.map((skill, index) => {
          const isCurrent = hoveredId === skill.id;
          const isConnected = activeSkill?.connections.includes(skill.id);
          const isHighlighted = isCurrent || isConnected;
          const isDimmed = hoveredId !== null && !isHighlighted;

          // Manual staggered positioning for the 11-node schematic [cite: 737, 745]
          const positions = [
            { left: '10%', top: '20%' }, // cpp
            { left: '40%', top: '15%' }, // robotics
            { left: '70%', top: '25%' }, // arduino
            { left: '25%', top: '50%' }, // ros
            { left: '55%', top: '45%' }, // react-native
            { left: '80%', top: '65%' }, // web-dev
            { left: '-5%', top: '60%' }, // french
            { left: '95%', top: '35%' }, // html_css
            { left: '20%', top: '80%' }, // java
            { left: '40%', top: '65%' }, // app-dev
            { left: '60%', top: '85%' }, // next_js
          ];
          
          const pos = positions[index] || { left: '50%', top: '50%' };

          return (
            <div
              key={skill.id}
              className="absolute z-10"
              style={{ left: pos.left, top: pos.top }}
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