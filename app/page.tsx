import HeroScene from "@/components/HeroScene";
import Terminal from "@/components/Terminal"; // Import the terminal component [cite: 117]
import ScrollIndicator from "@/components/ScrollIndicator"; // Import the new scroll indicator [cite: 158]
import SkillsOrbit from "@/components/SkillsOrbit"; // Import the interactive node map 

export default function Home() {
  return (
    <main className="min-h-screen bg-workshop-bg text-white selection:bg-workshop-accent/30">
      {/* Phase 2: Hero Section - The First Impression [cite: 147, 157] */}
      <section 
        id="hero" 
        className="relative h-screen flex flex-col items-center justify-center border-b border-workshop-slate/20 px-6 overflow-hidden"
      >
        {/* The 3D Workshop Floor: Interactive wireframe that tracks mouse movement [cite: 95, 131, 140] */}
        <HeroScene />

        {/* The Terminal Status Window: Live-typing system updates [cite: 115, 124, 150] */}
        <Terminal />

        {/* The Scroll Indicator: Technical scanner animation [cite: 157, 159] */}
        <ScrollIndicator />

        {/* The Blueprint Grid: Subtle background to mimic a drafting table [cite: 63, 121] */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />

        <div className="z-10 text-center pointer-events-none">
          <p className="text-workshop-accent font-mono text-xs mb-4 tracking-[0.3em] uppercase">
            // System Initialization...
          </p>
          
          {/* The Hook: Bold, high-tech typography defined in the design strategy [cite: 108, 124, 150, 169, 170] */}
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter max-w-5xl mx-auto leading-[0.9]">
            BRIDGING THE GAP BETWEEN <br />
            <span className="text-workshop-accent">PIXELS</span> AND <span className="text-workshop-highlight">PNEUMATICS</span>
          </h1>
          
          <p className="mt-6 text-workshop-slate font-mono text-sm tracking-widest uppercase">
            Creative Engineering Portfolio v1.0 [cite: 65]
          </p>
        </div>
      </section>

      {/* Phase 3: Integrated Skills Section [cite: 185, 206] */}
      <section id="skills" className="min-h-screen py-32 px-6 border-b border-workshop-slate/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-workshop-slate font-mono text-xl mb-12 flex items-center gap-4">
            <span className="text-workshop-accent">01 //</span> INTEGRATED_SKILLS
          </h2>
          
          {/* The interactive motherboard map showing interconnected expertise [cite: 206, 209] */}
          <SkillsOrbit />
        </div>
      </section>

      {/* Phase 4: Project Showroom Placeholder [cite: 64, 154, 174] */}
      <section id="projects" className="min-h-screen py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-workshop-slate font-mono text-xl mb-12 flex items-center gap-4">
            <span className="text-workshop-accent">02 //</span> PROJECT_SHOWROOM
          </h2>
          <div className="h-[400px] border-2 border-dashed border-workshop-slate/20 rounded-lg flex items-center justify-center">
            <p className="text-workshop-slate font-mono">CASE_STUDY_SLOTS_EMPTY</p>
          </div>
        </div>
      </section>
    </main>
  );
}