"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Project } from "@/data/projects";
import { personalInfo } from "@/data/personal";
import { ExternalLink, Code, Box, Smartphone, Globe, ChevronDown, AlertTriangle } from "lucide-react";

interface Props {
  project: Project;
  index: number; // Added index to handle 'priority' loading for the first card
}

/**
 * ProjectCard: Optimized for Performance & Mobile Rendering.
 * Uses next/image with specific sizing to prevent mobile lag.
 */
export default function ProjectCard({ project, index }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isApp = project.category === 'app';
  const isRobotics = project.category === 'robotics';
  // Only projects with a real external deployment get a "visit site" link -
  // the robotics/gym projects have no live site (resultUrl is just a local
  // image path used for the VIEW_DETAILS fallback).
  const hasLiveSite = project.resultUrl.startsWith('http');

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`
        relative group rounded-xl border overflow-hidden transition-all duration-500
        ${isApp 
          ? 'bg-workshop-slate/10 backdrop-blur-xl border-white/10 shadow-xl' 
          : 'bg-workshop-bg border-workshop-slate/30 shadow-2xl'}
      `}
    >
      {/* Category Icon Overlay */}
      <div className="absolute top-4 right-4 z-20 text-workshop-slate/40 group-hover:text-workshop-accent transition-colors">
        {project.category === 'robotics' && <Box size={20} />}
        {project.category === 'app' && <Smartphone size={20} />}
        {project.category === 'web' && <Globe size={20} />}
      </div>

      {/* Visual Area: Optimized with next/image */}
      <div className={`
        aspect-video w-full relative overflow-hidden bg-workshop-slate/20
        ${isRobotics ? 'border-b border-workshop-accent/20' : ''}
      `}>
        {/* Schematic Overlay for Robotics: CSS-only grid pattern (no external image request) */}
        {isRobotics && (
          <div
            className="absolute inset-0 z-10 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)',
              backgroundSize: '12px 12px',
            }}
          />
        )}

        {/* PERFORMANCE FIX:
          1. 'fill' ensures the image covers the container.
          2. 'sizes' tells Next.js to serve a tiny image on mobile.
          3. 'priority' is true only for the first project to speed up LCP.
        */}
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index === 0}
          />
        ) : (
          // No screenshot asset yet for this project — an honest placeholder
          // beats a broken image request to a file that doesn't exist.
          <div className="absolute inset-0 flex items-center justify-center text-workshop-slate/30 font-mono text-xs uppercase tracking-widest z-0">
            {isRobotics ? "[ Schematic_Active ]" : "[ Visual_Feed_Pending ]"}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-6">
        <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:text-workshop-accent transition-colors uppercase">
          {project.title}
        </h3>
        <p className="text-workshop-slate text-sm leading-relaxed mb-6 font-mono">
          {project.description}
        </p>

        {/* Tech Stack Badges */}
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
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-expanded={isExpanded}
            className="flex items-center gap-2 text-xs font-mono text-workshop-accent hover:brightness-125 transition-all"
          >
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            />
            VIEW_DETAILS
          </button>
          {hasLiveSite && (
            <a
              href={project.resultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-workshop-highlight hover:brightness-125 transition-all"
            >
              <ExternalLink size={14} /> VISIT_SITE
            </a>
          )}
          <a
            href={project.repoUrl || personalInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-mono text-workshop-slate hover:text-white transition-all"
          >
            <Code size={14} /> SOURCE
          </a>
        </div>

        {/* Build Log: the process behind the result, expanded on demand */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-6 pt-6 border-t border-workshop-slate/20 space-y-4">
                {project.processLog.map((entry, i) => (
                  <div key={i} className="flex gap-3">
                    {entry.isPivot ? (
                      <AlertTriangle size={14} className="text-workshop-highlight shrink-0 mt-0.5" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-workshop-accent shrink-0 mt-1.5" />
                    )}
                    <p className="text-xs font-mono text-workshop-slate leading-relaxed">
                      <span className={entry.isPivot ? "text-workshop-highlight" : "text-workshop-accent"}>
                        {entry.stage}:
                      </span>{" "}
                      {entry.note}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Glowing Bottom Border for Robotics */}
      {isRobotics && (
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-workshop-accent shadow-[0_0_10px_#6366f1]" />
      )}
    </motion.div>
  );
}