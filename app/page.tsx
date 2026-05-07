import HeroScene from "@/components/HeroScene";
import Terminal from "@/components/Terminal"; // Import the terminal component [cite: 117]
import ScrollIndicator from "@/components/ScrollIndicator"; // Import the new scroll indicator [cite: 158]
import SkillsOrbit from "@/components/SkillsOrbit"; // Import the interactive node map [cite: 209]
import ProjectShowroom from "@/components/ProjectShowroom"; // Import the showroom gallery [cite: 301]
import ProcessTimeline from "@/components/ProcessTimeline"; // Import the build log timeline [cite: 323]

export default function Home() {
  return (
    <main className="min-h-screen bg-workshop-bg text-white selection:bg-workshop-accent/30">
      {/* Phase 2: Hero Section - The First Impression [cite: 147, 157, 159, 172, 176] */}
      <section 
        id="hero" 
        className="relative h-screen flex flex-col items-center justify-center border-b border-workshop-slate/20 px-6 overflow-hidden"
      >
        {/* The 3D Workshop Floor: Interactive wireframe that tracks mouse movement [cite: 95, 131, 140, 178] */}
        <HeroScene />

        {/* The Terminal Status Window: Live-typing system updates [cite: 115, 124, 150, 180] */}
        <Terminal />

        {/* The Scroll Indicator: Technical scanner animation [cite: 157, 159, 172, 181] */}
        <ScrollIndicator />

        {/* The Blueprint Grid: Subtle background to mimic a digital drafting table [cite: 63, 121, 167] */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />

        <div className="z-10 text-center pointer-events-none">
          <p className="text-workshop-accent font-mono text-xs mb-4 tracking-[0.3em] uppercase">
            // System Initialization...
          </p>
          
          {/* The Hook: Bold, high-tech typography defined in the design strategy [cite: 108, 124, 150, 169, 170, 179] */}
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter max-w-5xl mx-auto leading-[0.9]">
            BRIDGING THE GAP BETWEEN <br />
            <span className="text-workshop-accent">PIXELS</span> AND <span className="text-workshop-highlight">PNEUMATICS</span>
          </h1>
          
          <p className="mt-6 text-workshop-slate font-mono text-sm tracking-widest uppercase">
            Creative Engineering Portfolio v1.0 [cite: 65, 82]
          </p>
        </div>
      </section>

      {/* Phase 3: Integrated Skills Section [cite: 184, 185, 251] */}
      <section id="skills" className="min-h-screen py-32 px-6 border-b border-workshop-slate/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-workshop-slate font-mono text-xl mb-12 flex items-center gap-4">
            <span className="text-workshop-accent">01 //</span> INTEGRATED_SKILLS
          </h2>
          
          {/* The interactive motherboard map showing interconnected expertise [cite: 206, 209, 220, 255] */}
          <SkillsOrbit />
        </div>
      </section>

      {/* Phase 4: Project Showroom & Process Timeline [cite: 262, 298, 319, 320, 323] */}
      <section id="projects" className="min-h-screen py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-workshop-slate font-mono text-xl mb-12 flex items-center gap-4">
            <span className="text-workshop-accent">02 //</span> PROJECT_SHOWROOM
          </h2>
          
          {/* The responsive showroom grid pulling from data/projects.ts [cite: 299, 301, 313, 314] */}
          <ProjectShowroom />

          {/* Step 4: The Build Process Log highlighting "Failures & Pivots" [cite: 320, 321, 323, 326] */}
          <div className="mt-40">
            <h2 className="text-workshop-slate font-mono text-xl mb-12 flex items-center gap-4">
              <span className="text-workshop-accent">03 //</span> BUILD_PROCESS_LOG
            </h2>
            {/* The vertical timeline to build trust with technical reviewers [cite: 323, 326] */}
            <ProcessTimeline />
          </div>
        </div>
      </section>
    </main>
  );
}