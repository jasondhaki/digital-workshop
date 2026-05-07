"use client"; // Critical: Allows client-side interactivity and dynamic 3D loading

import dynamic from 'next/dynamic';
import { personalInfo } from "@/data/personal";
import BioSection from "@/components/BioSection";
import CareerTrace from "@/components/CareerTrace";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import Navigation from "@/components/Navigation"; // HUD Navigation
import CustomCursor from "@/components/CustomCursor"; // Tactile Sensor

// Performance Optimization: Dynamic Import for the 3D Hero
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
 * Orchestrates the full 7-stage technical sequence (00-06).
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-workshop-bg text-white selection:bg-workshop-accent/30">
      
      {/* Global System Components */}
      <CustomCursor />
      <Navigation />

      {/* 00 // SYSTEM_START: Hero Section */}
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
          
          <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold tracking-tighter max-w-5xl mx-auto leading-[0.9]">
            BRIDGING THE GAP BETWEEN <br />
            <span className="text-workshop-accent">PIXELS</span> AND <span className="text-workshop-highlight">PNEUMATICS</span>
          </h1>
          
          <p className="mt-6 text-workshop-slate font-mono text-[10px] sm:text-sm tracking-widest uppercase">
            {personalInfo.role} // Portfolio v1.0 
          </p>
        </div>
      </section>

      {/* 01 // BIO_NARRATIVE */}
      <section id="bio" className="py-24 px-6 border-b border-workshop-slate/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-workshop-slate font-mono text-sm mb-12 flex items-center gap-4">
            <span className="text-workshop-accent">01 //</span> BIO_NARRATIVE
          </h2>
          <BioSection />
        </div>
      </section>

      {/* 02 // CAREER_TRACE */}
      <section id="career" className="py-24 px-6 border-b border-workshop-slate/20 bg-workshop-slate/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-workshop-slate font-mono text-sm mb-12 flex items-center gap-4">
            <span className="text-workshop-accent">02 //</span> CAREER_TRACE
          </h2>
          <CareerTrace />
        </div>
      </section>

      {/* 03 // INTEGRATED_SKILLS */}
      <section id="skills" className="min-h-screen py-32 px-6 border-b border-workshop-slate/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-workshop-slate font-mono text-xl mb-12 flex items-center gap-4">
            <span className="text-workshop-accent">03 //</span> INTEGRATED_SKILLS
          </h2>
          <SkillsOrbit />
        </div>
      </section>

      {/* 04 // PROJECT_SHOWROOM */}
      <section id="projects" className="min-h-screen py-32 px-6 border-b border-workshop-slate/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-workshop-slate font-mono text-xl mb-12 flex items-center gap-4">
            <span className="text-workshop-accent">04 //</span> PROJECT_SHOWROOM
          </h2>
          <ProjectShowroom />

          {/* 05 // BUILD_PROCESS_LOG - Targeted with id="process" for Navigation */}
          <div id="process" className="mt-40 scroll-mt-20">
            <h2 className="text-workshop-slate font-mono text-xl mb-12 flex items-center gap-4">
              <span className="text-workshop-accent">05 //</span> BUILD_PROCESS_LOG
            </h2>
            <ProcessTimeline />
          </div>
        </div>
      </section>

      {/* 06 // CONTACT_STATION */}
      <section id="contact" className="py-24 px-6 border-b border-workshop-slate/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-workshop-slate font-mono text-sm mb-12 flex items-center gap-4">
            <span className="text-workshop-accent">06 //</span> CONTACT_STATION
          </h2>
          <ContactSection />
        </div>
      </section>

      <Footer />
    </main>
  );
}