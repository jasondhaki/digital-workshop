"use client";

import { motion } from "framer-motion";
import { Cpu, Code, Languages } from "lucide-react";
import { SkillNode as SkillNodeType } from "@/data/skills";

interface Props {
  skill: SkillNodeType;
  isHighlighted: boolean;
  isDimmed: boolean;
  onHover: (id: string | null) => void;
}

const categoryIcons = {
  software: <Code size={14} />,
  hardware: <Cpu size={14} />,
  language: <Languages size={14} />,
};

/**
 * SkillNode: Individual interactive "chip" for the motherboard map.
 * Handles hover states and signals interconnectivity.
 */
export default function SkillNode({ skill, isHighlighted, isDimmed, onHover }: Props) {
  return (
    <motion.div
      onMouseEnter={() => onHover(skill.id)}
      onMouseLeave={() => onHover(null)}
      animate={{
        scale: isHighlighted ? 1.05 : 1,
        opacity: isDimmed ? 0.4 : 1,
      }}
      className={`
        relative px-4 py-2 rounded-md border font-mono text-[10px] cursor-crosshair transition-all duration-300
        flex items-center gap-3 group whitespace-nowrap
        ${isHighlighted 
          ? 'border-workshop-accent bg-workshop-accent/10 text-white shadow-[0_0_20px_rgba(99,102,241,0.2)]' 
          : 'border-workshop-slate/30 bg-workshop-bg/40 text-workshop-slate'}
      `}
    >
      {/* Category Icon with high-tech indicator */}
      <div className={`
        flex items-center justify-center
        ${isHighlighted ? 'text-workshop-accent animate-pulse' : 'text-workshop-slate/50'}
      `}>
        {categoryIcons[skill.category]}
      </div>

      <div className="flex flex-col">
        <span className="uppercase tracking-widest">{skill.label}</span>
      </div>
      
      {/* Decorative "Circuit Trace" Glow */}
      {isHighlighted && (
        <motion.div 
          layoutId="glow-ring"
          className="absolute -inset-[2px] rounded-md border border-workshop-accent/30 blur-[1px] pointer-events-none"
        />
      )}
    </motion.div>
  );
}