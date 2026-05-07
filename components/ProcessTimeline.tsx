"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { AlertTriangle, CheckCircle2, Terminal } from "lucide-react";

/**
 * ProcessTimeline: A vertical build log that highlights engineering thinking.
 * Implements the "Failures & Pivots" concept from the design strategy.
 */
export default function ProcessTimeline() {
  return (
    <div className="relative max-w-4xl mx-auto py-20 px-6">
      {/* Central Vertical Line  */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-workshop-slate/20" />

      <div className="space-y-24 relative">
        {projects.map((project, index) => (
          <div key={project.id} className="relative">
            {/* Project Header Node */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-12 z-10">
              <div className="bg-workshop-bg border border-workshop-accent px-4 py-1 rounded-full text-[10px] font-mono text-workshop-accent shadow-[0_0_10px_rgba(99,102,241,0.3)] uppercase">
                {project.title} // LOG_INIT
              </div>
            </div>

            {/* Timeline Entries */}
            <div className="space-y-12 pt-8">
              {project.processLog.map((log, logIndex) => (
                <motion.div
                  key={logIndex}
                  initial={{ opacity: 0, x: logIndex % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-8 ${
                    logIndex % 2 === 0 ? "flex-row" : "flex-row-reverse text-right"
                  }`}
                >
                  {/* Log Content Card */}
                  <div className="flex-1">
                    <div className={`p-5 rounded-lg border backdrop-blur-sm transition-all duration-500 ${
                      log.isPivot 
                        ? "bg-red-500/5 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.05)]" 
                        : "bg-workshop-slate/5 border-workshop-slate/20"
                    }`}>
                      <div className={`flex items-center gap-2 mb-2 font-mono text-[10px] uppercase tracking-tighter ${
                        log.isPivot ? "text-red-400" : "text-workshop-accent"
                      }`}>
                        {log.isPivot ? <AlertTriangle size={12} /> : <Terminal size={12} />}
                        <span>STG: {log.stage}</span>
                      </div>
                      <p className="text-workshop-slate text-sm font-mono leading-relaxed">
                        {log.note}
                      </p>
                    </div>
                  </div>

                  {/* Indicator Node */}
                  <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-workshop-bg border border-workshop-slate/30">
                    {log.isPivot ? (
                      <AlertTriangle size={16} className="text-red-500 animate-pulse" />
                    ) : (
                      <CheckCircle2 size={16} className="text-workshop-accent" />
                    )}
                  </div>

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}