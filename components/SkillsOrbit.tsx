"use client";

import { useState } from "react";
import { skills } from "@/data/skills";
import SkillNode from "./SkillNode";
import CircuitLines from "./CircuitLines"; // Import the technical traces component [cite: 227]

/**
 * SkillsOrbit: The main container for the interactive node map.
 * Manages the highlight logic based on technical "connections"[cite: 191, 206, 207].
 */
export default function SkillsOrbit() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Find the skill currently being hovered to check for its "motherboard" connections [cite: 191, 210]
  const activeSkill = skills.find((s) => s.id === hoveredId);

  return (
    <div className="relative w-full h-[500px] border border-workshop-slate/10 rounded-2xl bg-workshop-bg/40 backdrop-blur-sm overflow-hidden flex items-center justify-center p-8">
      {/* Decorative Grid Layer: Mimicking a technical blueprint [cite: 63, 207] */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }}
      />

      <div className="relative w-full h-full max-w-4xl mx-auto">
        {/* Render Circuit Lines behind nodes to complete the motherboard aesthetic [cite: 223, 227, 228] */}
        <CircuitLines hoveredId={hoveredId} />

        {skills.map((skill, index) => {
          // A node is highlighted if it is directly hovered OR connected to the hovered node 
          const isCurrent = hoveredId === skill.id;
          const isConnected = activeSkill?.connections.includes(skill.id);
          const isHighlighted = isCurrent || isConnected;
          
          // Dim unrelated skills to guide the user's eye toward the active "circuit" [cite: 202, 206]
          const isDimmed = hoveredId !== null && !isHighlighted;

          // Manual staggered positioning to mimic a motherboard schematic [cite: 207]
          const positions = [
            { left: '10%', top: '20%' }, // cpp
            { left: '40%', top: '15%' }, // robotics
            { left: '70%', top: '25%' }, // arduino
            { left: '25%', top: '50%' }, // ros
            { left: '55%', top: '45%' }, // react-native
            { left: '80%', top: '65%' }, // web-dev
            { left: '15%', top: '75%' }, // french
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