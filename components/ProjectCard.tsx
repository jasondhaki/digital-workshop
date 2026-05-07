"use client";

import { motion } from "framer-motion";
import { Project } from "@/data/projects";
// Swapped Github for Code to ensure a stable build [cite: 311, 312]
import { ExternalLink, Code, Box, Smartphone, Globe } from "lucide-react";

interface Props {
  project: Project;
}

/**
 * ProjectCard: A smart component that applies distinct visual identities
 * based on the project category (Robotics, App, Web)[cite: 297, 299, 301].
 */
export default function ProjectCard({ project }: Props) {
  const isApp = project.category === 'app';
  const isRobotics = project.category === 'robotics';

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`
        relative group rounded-xl border overflow-hidden transition-all duration-500
        ${isApp 
          ? 'bg-workshop-slate/10 backdrop-blur-xl border-white/10 shadow-xl' // Glassmorphism style [cite: 299, 301]
          : 'bg-workshop-bg border-workshop-slate/30 shadow-2xl'}
      `}
    >
      {/* Category Icon Overlay */}
      <div className="absolute top-4 right-4 text-workshop-slate/40 group-hover:text-workshop-accent transition-colors">
        {project.category === 'robotics' && <Box size={20} />}
        {project.category === 'app' && <Smartphone size={20} />}
        {project.category === 'web' && <Globe size={20} />}
      </div>

      {/* Visual Area (Image/Video Placeholder) [cite: 299, 301] */}
      <div className={`
        aspect-video w-full relative overflow-hidden bg-workshop-slate/20
        ${isRobotics ? 'border-b border-workshop-accent/20' : ''}
      `}>
        {/* Schematic Overlay for Robotics [cite: 299, 301] */}
        {isRobotics && (
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy-dark.png')]" />
        )}
        <div className="flex items-center justify-center h-full text-workshop-slate/30 font-mono text-xs uppercase tracking-widest">
          {isRobotics ? "[ Schematic_Active ]" : "[ Visual_Feed_Pending ]"}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:text-workshop-accent transition-colors uppercase">
          {project.title}
        </h3>
        <p className="text-workshop-slate text-sm leading-relaxed mb-6 font-mono">
          {project.description}
        </p>

        {/* Tech Stack Badges [cite: 301] */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <span 
              key={tech} 
              className="px-2 py-1 text-[10px] font-mono bg-workshop-slate/20 text-workshop-accent border border-workshop-accent/20 rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button className="flex items-center gap-2 text-xs font-mono text-workshop-accent hover:brightness-125 transition-all">
            <ExternalLink size={14} /> VIEW_DETAILS
          </button>
          {/* Using the Code icon here for stability [cite: 312] */}
          <button className="flex items-center gap-2 text-xs font-mono text-workshop-slate hover:text-white transition-all">
            <Code size={14} /> SOURCE
          </button>
        </div>
      </div>
      
      {/* Glowing Bottom Border for Robotics [cite: 301] */}
      {isRobotics && (
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-workshop-accent shadow-[0_0_10px_#6366f1]" />
      )}
    </motion.div>
  );
}