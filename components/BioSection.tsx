"use client";

import { personalInfo } from "@/data/personal";
import { motion } from "framer-motion";
// Using core Lucide icons to avoid brand-icon naming conflicts 
import { Code, Share2, Mail, ArrowUpRight } from "lucide-react";

/**
 * BioSection: Displays the technical narrative and social connections.
 * Follows the minimalist, high-tech gallery aesthetic[cite: 1320, 1339].
 */
export default function BioSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
      {/* Narrative Column */}
      <div className="lg:col-span-2 space-y-6">
        <p className="text-workshop-accent font-mono text-xs tracking-widest uppercase">
          // THE_NARRATIVE
        </p>
        <h3 className="text-2xl md:text-3xl font-bold leading-tight">
          {personalInfo.bio.intro}
        </h3>
        <p className="text-workshop-slate font-mono text-sm leading-relaxed max-w-2xl">
          {personalInfo.bio.details}
        </p>
      </div>

      {/* Connection Column */}
      <div className="space-y-6 bg-workshop-slate/5 border border-workshop-slate/20 p-8 rounded-xl backdrop-blur-sm">
        <p className="text-workshop-accent font-mono text-[10px] tracking-widest uppercase">
          // CONNECT_PROTOCOLS
        </p>
        
        <div className="flex flex-col gap-4">
          <a 
            href={personalInfo.socials.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between group text-sm font-mono text-workshop-slate hover:text-white transition-colors"
          >
            <div className="flex items-center gap-3">
              {/* 'Code' represents the technical repository  */}
              <Code size={18} /> <span>GITHUB_REPOSITORY</span>
            </div>
            <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          <a 
            href={personalInfo.socials.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between group text-sm font-mono text-workshop-slate hover:text-white transition-colors"
          >
            <div className="flex items-center gap-3">
              {/* 'Share2' represents the professional network connection */}
              <Share2 size={18} /> <span>LINKEDIN_PROFILE</span>
            </div>
            <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          <a 
            href={`mailto:${personalInfo.socials.email}`} 
            className="flex items-center justify-between group text-sm font-mono text-workshop-slate hover:text-white transition-colors"
          >
            <div className="flex items-center gap-3">
              <Mail size={18} /> <span>DIRECT_COMMS</span>
            </div>
            <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </div>
  );
}