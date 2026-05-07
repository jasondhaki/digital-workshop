export default function Home() {
  return (
    <main className="min-h-screen bg-workshop-bg text-white selection:bg-workshop-accent/30">
      {/* Phase 2: Hero Section Placeholder */}
      <section 
        id="hero" 
        className="relative h-screen flex flex-col items-center justify-center border-b border-workshop-slate/20 px-6"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
        <div className="z-10 text-center">
          <p className="text-workshop-accent font-mono text-xs mb-4 tracking-[0.3em] uppercase">
            // System Initialization...
          </p>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter max-w-4xl mx-auto leading-none">
            WORKSHOP CANVAS <span className="text-workshop-slate text-2xl align-top">v1.0</span>
          </h1>
        </div>
      </section>

      {/* Phase 3: Skills Section Placeholder */}
      <section id="skills" className="min-h-screen py-32 px-6 border-b border-workshop-slate/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-workshop-slate font-mono text-xl mb-12 flex items-center gap-4">
            <span className="text-workshop-accent">01 //</span> INTEGRATED_SKILLS
          </h2>
          <div className="h-[400px] border-2 border-dashed border-workshop-slate/20 rounded-lg flex items-center justify-center">
            <p className="text-workshop-slate font-mono">NODE_MAP_PENDING...</p>
          </div>
        </div>
      </section>

      {/* Phase 4: Project Showroom Placeholder */}
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