"use client";

import dynamic from 'next/dynamic';
import { personalInfo } from "@/data/personal";
import BioSection from "@/components/BioSection";
import CareerTrace from "@/components/CareerTrace";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import Navigation from "@/components/Navigation"; 
import Navbar from "@/components/Navbar"; 
import CustomCursor from "@/components/CustomCursor";
import Terminal from "@/components/Terminal";
import ScrollIndicator from "@/components/ScrollIndicator";

/**
 * PERFORMANCE TUNING: Dynamic Imports
 * We load heavy interactive components only when needed.
 */
const HeroScene = dynamic(() => import("@/components/HeroScene"), { 
  ssr: false,
  loading: () => <div className="h-screen w-full bg-workshop-bg" /> 
});

const SkillsOrbit = dynamic(() => import("@/components/SkillsOrbit"), { 
  ssr: false,
  loading: () => <div className="h-[600px] md:h-[950px] bg-workshop-slate/5 animate-pulse rounded-2xl" /> 
});

const ProjectShowroom = dynamic(() => import("@/components/ProjectShowroom"), { 
  ssr: false 
});

// Note: ProcessTimeline import removed to streamline the bundle

export default function Home() {
  return (
    <main className="min-h-screen bg-workshop-bg text-white selection:bg-workshop-accent/30 relative overflow-x-hidden">
      
      {/* Global System Components */}
      <CustomCursor />
      <Navbar />      {/* TOP MENU BAR */}
      <Navigation />  {/* SIDE HUD INDICATOR */}

      {/* 00 // SYSTEM_START: Hero Section */}
      <section 
        id="hero" 
        className="relative h-[100dvh] flex flex-col items-center justify-center border-b border-workshop-slate/20 px-6 touch-pan-y overflow-visible"
      >
        <HeroScene />
        
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />

        <Terminal />
        <ScrollIndicator />

        {/* Hero Content */}
        <div className="z-10 text-center pointer-events-none">
          <p className="text-workshop-accent font-mono text-[12px] sm:text-xl mb-4 tracking-[0.3em] uppercase">
            {"// SESSION_OWNER: "}{personalInfo.name.toUpperCase()}
          </p>
          
          <h1 className="text-2xl sm:text-4xl md:text-7xl font-bold tracking-tighter max-w-5xl mx-auto leading-[0.9]">
            BRIDGING THE GAP BETWEEN <br />
            <span className="text-workshop-accent font-orbit">PIXELS</span> AND <span className="text-workshop-highlight font-orbit">PNEUMATICS</span>
          </h1>
          
          <p className="mt-6 text-workshop-slate font-mono text-[12px] sm:text-xl tracking-widest uppercase">
            {personalInfo.role} 
          </p>
        </div>
      </section>

      {/* 01 // BIO_NARRATIVE & 02 // CAREER_TRACE */}
      <div id="bio" className="scroll-mt-20">
        <section className="py-24 px-6 border-b border-workshop-slate/20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-workshop-slate font-mono text-xl mb-12 flex items-center gap-4">
              <span className="text-workshop-accent">01 //</span> BIO_NARRATIVE
            </h2>
            <BioSection />
          </div>
        </section>

        {/* Individual ID for the Side HUD to track 'career' specifically */}
        <section id="career" className="py-24 px-6 border-b border-workshop-slate/20 bg-workshop-slate/5 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-workshop-slate font-mono text-xl mb-12 flex items-center gap-4">
              <span className="text-workshop-accent">02 //</span> CAREER_TRACE
            </h2>
            <CareerTrace />
          </div>
        </section>
      </div>

      {/* 03 // INTEGRATED_SKILLS */}
      <section id="skills" className="min-h-screen py-32 px-6 border-b border-workshop-slate/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-workshop-slate font-mono text-xl mb-12 flex items-center gap-4">
            <span className="text-workshop-accent">03 //</span> INTEGRATED_SKILLS
          </h2>
          <SkillsOrbit />
        </div>
      </section>

      {/* 04 // PROJECT_SHOWROOM */}
      <section id="projects" className="min-h-screen py-32 px-6 border-b border-workshop-slate/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-workshop-slate font-mono text-xl mb-12 flex items-center gap-4">
            <span className="text-workshop-accent">04 //</span> PROJECT_SHOWROOM
          </h2>
          <ProjectShowroom />
        </div>
      </section>

      {/* 05 // CONTACT_STATION: Recalibrated numbering from 06 to 05 after removing Build Logs */}
      <section id="contact" className="py-24 px-6 border-b border-workshop-slate/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-workshop-slate font-mono text-xl mb-12 flex items-center gap-4">
            <span className="text-workshop-accent">05 //</span> CONTACT_STATION
          </h2>
          <ContactSection />
        </div>
      </section>

      <Footer />
    </main>
  );
}