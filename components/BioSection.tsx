"use client";

import { personalInfo } from "@/data/personal";
import { Code, Share2, Mail, ArrowUpRight, ArrowDown } from "lucide-react";
import WorkshopButton from "./WorkshopButton"; // Import the mechanical button component
import { scrollToSection } from "@/lib/scroll";

/**
 * BioSection: Displays the technical narrative and social connections.
 * Now upgraded with tactile WorkshopButtons for professional "Control Panel" feedback.
 */
export default function BioSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
      {/* Narrative Column: Your Engineering Philosophy */}
      <div className="lg:col-span-2 space-y-6">
        <p className="text-workshop-accent font-mono text-xs tracking-widest uppercase">
          {"// THE_NARRATIVE"}
        </p>
        <h3 className="text-2xl md:text-3xl font-bold leading-tight">
          {personalInfo.bio.intro}
        </h3>
        <p className="text-workshop-slate font-mono text-sm leading-relaxed max-w-2xl">
          {personalInfo.bio.details}
        </p>
      </div>

      {/* Connection Column: Upgraded to Mechanical Control Protocols */}
      <div className="space-y-6 bg-workshop-slate/5 border border-workshop-slate/20 p-8 rounded-xl backdrop-blur-sm">
        <p className="text-workshop-accent font-mono text-[10px] tracking-widest uppercase">
          {"// CONNECT_PROTOCOLS"}
        </p>
        
        <div className="flex flex-col gap-4">
          {/* GitHub Repository Button */}
          <a 
            href={personalInfo.socials.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full"
          >
            <WorkshopButton variant="outline" className="w-full justify-between">
              <div className="flex items-center gap-3">
                <Code size={16} /> 
                <span>GITHUB_REPOSITORY</span>
              </div>
              <ArrowUpRight size={14} />
            </WorkshopButton>
          </a>

          {/* LinkedIn Profile Button */}
          <a 
            href={personalInfo.socials.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full"
          >
            <WorkshopButton variant="outline" className="w-full justify-between">
              <div className="flex items-center gap-3">
                <Share2 size={16} /> 
                <span>LINKEDIN_PROFILE</span>
              </div>
              <ArrowUpRight size={14} />
            </WorkshopButton>
          </a>

          {/* Direct Communications Button - scrolls to the Contact section */}
          <WorkshopButton
            variant="primary"
            className="w-full justify-between"
            onClick={() => scrollToSection("contact")}
          >
            <div className="flex items-center gap-3">
              <Mail size={16} />
              <span>DIRECT_COMMS</span>
            </div>
            <ArrowDown size={14} />
          </WorkshopButton>
        </div>
      </div>
    </div>
  );
}