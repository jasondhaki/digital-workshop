"use client"; // Critical: Allows client-side interactivity and dynamic 3D loading

import dynamic from 'next/dynamic';
import { personalInfo } from "@/data/personal";
import BioSection from "@/components/BioSection";
import CareerTrace from "@/components/CareerTrace";
import Footer from "@/components/Footer";

// Step 1: Performance Optimization - Dynamic Imports
const HeroScene = dynamic(() => import("@/components/HeroScene"), { 
  ssr: false,
  loading: () => <div className="h-screen w-full bg-workshop-bg" /> 
});

import Terminal from "@/components/Terminal";
import ScrollIndicator from "@/components/ScrollIndicator";
import SkillsOrbit from "@/components/SkillsOrbit";
import ProjectShowroom from "@/components/ProjectShowroom";
import ProcessTimeline from "@/components/ProcessTimeline";

/**
 * Home: The primary entry point for the Digital Workshop.
 * Fully personalized and optimized for cross-device performance.
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-workshop-bg text-white selection:bg-workshop-accent/30">
      
      {/* Phase 2: Hero Section - Responsive Optimization */}
      <section 
        id="hero" 
        className="relative h-screen flex flex-col items-center justify-center border-b border-workshop-slate/20 px-6 overflow-hidden"
      >
        <HeroScene />
        <Terminal />
        <ScrollIndicator />

        {/* The Blueprint Grid: Background Detail */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />

        <div className="z-10 text-center pointer-events-none">
          <p className="text-workshop-accent font-mono text-[10px] sm:text-xs mb-4 tracking-[0.3em] uppercase">
            // SESSION_OWNER: {personalInfo.name.toUpperCase()}
          </p>
          
          {/* Responsive Hook: Fluid typography scaling for mobile devices */}
          <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold tracking-tighter max-w-5xl mx-auto leading-[0.9]">
            BRIDGING THE GAP BETWEEN <br />
            <span className="text-workshop-accent">PIXELS</span> AND <span className="text-workshop-highlight">PNEUMATICS</span>
          </h1>
          
          <p className="mt-6 text-workshop-slate font-mono text-[10px] sm:text-sm tracking-widest uppercase">
            {personalInfo.role} // Portfolio v1.0 
          </p>
        </div>
      </section>

      {/* Phase 7, Step 3: BioSection - The Technical Narrative */}
      <section id="bio" className="py-24 px-6 border-b border-workshop-slate/20">
        <div className="max-w-7xl mx-auto">
          <BioSection />
        </div>
      </section>

      {/* Phase 7, Step 4: CareerTrace - The Technical History */}
      <section id="career" className="py-24 px-6 border-b border-workshop-slate/20 bg-workshop-slate/5">
        <div className="max-w-7xl mx-auto">
          <CareerTrace />
        </div>
      </section>

      {/* Phase 3: Integrated Skills Orbit */}
      <section id="skills" className="min-h-screen py-32 px-6 border-b border-workshop-slate/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-workshop-slate font-mono text-xl mb-12 flex items-center gap-4">
            <span className="text-workshop-accent">01 //</span> INTEGRATED_SKILLS
          </h2>
          <SkillsOrbit />
        </div>
      </section>

      {/* Phase 4: Project Showroom & Process Timeline */}
      <section id="projects" className="min-h-screen py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-workshop-slate font-mono text-xl mb-12 flex items-center gap-4">
            <span className="text-workshop-accent">02 //</span> PROJECT_SHOWROOM
          </h2>
          <ProjectShowroom />

          {/* Step 4: The Build Process Log */}
          <div className="mt-40">
            <h2 className="text-workshop-slate font-mono text-xl mb-12 flex items-center gap-4">
              <span className="text-workshop-accent">03 //</span> BUILD_PROCESS_LOG
            </h2>
            <ProcessTimeline />
          </div>
        </div>
      </section>

      {/* Phase 7, Step 5: System Status Footer */}
      <Footer />

    </main>
  );
}