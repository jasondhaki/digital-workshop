"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { projects } from "@/data/projects";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Terminal as TerminalIcon, 
  Globe, 
  Cpu, 
  Smartphone 
} from "lucide-react";

/**
 * ProcessTimeline: A vertical build log that highlights engineering thinking.
 * Supports Web, App, and Robotics categories with dynamic diagnostic icons.
 * Implements the "Failures & Pivots" concept from the design strategy.
 */
export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Animation: Drawing the central "Data Trace" line on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Helper to get the correct icon based on project category from data/projects.ts
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web': return <Globe size={12} />;
      case 'robotics': return <Cpu size={12} />;
      case 'app': return <Smartphone size={12} />;
      default: return <TerminalIcon size={12} />;
    }
  };

  return (
    <div ref={containerRef} className="relative max-w-5xl mx-auto py-20 px-6 overflow-hidden">
      
      {/* Central Animated Data Trace: Mimics a live system loading process */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-workshop-slate/20 hidden md:block">
        <motion.div 
          style={{ scaleY: pathLength, originY: 0 }}
          className="w-full h-full bg-workshop-accent shadow-[0_0_15px_#6366f1]"
        />
      </div>

      <div className="space-y-32 relative">
        {projects.map((project) => (
          <div key={project.id} className="relative space-y-16">
            
            {/* Project Header Capsule: Identifies the technical domain */}
            <div className="flex justify-center relative z-20">
              <div className="bg-workshop-bg border border-workshop-accent/50 px-4 py-1 rounded-full text-[10px] font-mono tracking-[0.2em] text-workshop-accent flex items-center gap-2 shadow-[0_0_10px_rgba(99,102,241,0.2)] uppercase">
                {getCategoryIcon(project.category)}
                <span>{project.title} // LOG_INIT</span>
              </div>
            </div>

            {/* Timeline Entries: Alternating Data Packets */}
            <div className="space-y-16">
              {project.processLog.map((log, logIndex) => {
                const isEven = logIndex % 2 === 0;
                return (
                  <motion.div
                    key={logIndex}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`flex flex-col md:flex-row items-center gap-8 ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Log Content Card: Glassmorphism layout with Pivot highlights */}
                    <div className="w-full md:w-1/2 z-10">
                      <div className={`p-6 rounded-xl border backdrop-blur-md transition-all duration-500 group hover:shadow-2xl ${
                        log.isPivot 
                          ? "bg-red-500/5 border-red-500/20 hover:border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.05)]" 
                          : "bg-workshop-slate/5 border-workshop-slate/20 hover:border-workshop-accent/40"
                      }`}>
                        <div className="flex items-center justify-between mb-4">
                          <div className={`flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest ${
                            log.isPivot ? "text-red-400" : "text-workshop-accent"
                          }`}>
                            {log.isPivot ? <AlertTriangle size={12} /> : <TerminalIcon size={12} />}
                            <span>STG: {log.stage.toUpperCase()}</span>
                          </div>
                          <span className="text-workshop-slate/50 font-mono text-[8px]">v1.{logIndex}</span>
                        </div>
                        <p className={`text-sm font-mono leading-relaxed transition-colors ${
                          log.isPivot ? "text-red-100/80 group-hover:text-red-100" : "text-workshop-slate group-hover:text-white"
                        }`}>
                          {log.note}
                        </p>
                      </div>
                    </div>

                    {/* Indicator Node on Timeline: Visual status check */}
                    <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
                      <div className={`absolute inset-0 rounded-full blur-md opacity-20 ${
                        log.isPivot ? "bg-red-500" : "bg-workshop-accent"
                      }`} />
                      <div className={`relative z-20 w-8 h-8 rounded-full border-2 bg-workshop-bg flex items-center justify-center ${
                        log.isPivot ? "border-red-500 text-red-500" : "border-workshop-accent text-workshop-accent"
                      }`}>
                        {log.isPivot ? (
                          <AlertTriangle size={14} className="animate-pulse" />
                        ) : (
                          <CheckCircle2 size={14} />
                        )}
                      </div>
                    </div>

                    {/* Spacer for centered packet-based alternation */}
                    <div className="hidden md:block w-1/2" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}