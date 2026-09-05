"use client";

import { personalInfo } from "@/data/personal";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Zap } from "lucide-react";

/**
 * CareerTrace: A dual-column technical log for Education and Experience.
 * Designed to look like a system log or a hardware history trace.
 */
export default function CareerTrace() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
      {/* Education Column */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 border-b border-workshop-slate/20 pb-4">
          <GraduationCap className="text-workshop-accent" size={20} />
          <h3 className="font-mono text-sm tracking-widest uppercase">
            {"// ACADEMIC_HISTORY"}
          </h3>
        </div>

        {personalInfo.education.map((edu, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative pl-6 border-l border-workshop-accent/30"
          >
            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-workshop-accent" />
            <p className="text-workshop-accent font-mono text-[10px] mb-1">{edu.duration}</p>
            <h4 className="font-bold text-lg leading-tight">{edu.degree}</h4>
            <p className="text-workshop-slate text-sm font-mono mt-1">{edu.institution}</p>
            <ul className="mt-3 space-y-1">
              {edu.notable.map((item, i) => (
                <li key={i} className="text-[10px] font-mono text-workshop-slate/80 flex items-center gap-2">
                  <Zap size={10} className="text-workshop-highlight" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Experience Column */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 border-b border-workshop-slate/20 pb-4">
          <Briefcase className="text-workshop-highlight" size={20} />
          <h3 className="font-mono text-sm tracking-widest uppercase">
            {"// PROFESSIONAL_DEPLOYMENTS"}
          </h3>
        </div>

        {personalInfo.experience.map((exp, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative pl-6 border-l border-workshop-highlight/30"
          >
            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-workshop-highlight" />
            <p className="text-workshop-highlight font-mono text-[10px] mb-1">{exp.duration}</p>
            <h4 className="font-bold text-lg leading-tight">{exp.position}</h4>
            <p className="text-workshop-slate text-sm font-mono mt-1 uppercase tracking-tighter">{exp.company}</p>
            <p className="mt-3 text-xs text-workshop-slate/80 font-mono leading-relaxed">
              {exp.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}