"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Navigation: A floating HUD Side-Bar.
 * Programmatic scroll ensures it bypasses anchor jumping and respects Navbar offsets.
 */
export default function Navigation() {
  const { language } = useLanguage();

  const navItems = [
    { id: "hero",     label: language === "en" ? "INIT" : "INIT" },
    { id: "bio",      label: language === "en" ? "NARRATIVE" : "RÉCIT" },
    { id: "career",   label: language === "en" ? "HISTORY" : "HISTOIRE" },
    { id: "skills",   label: language === "en" ? "SYS_MAP" : "CARTE_SYS" },
    { id: "projects", label: language === "en" ? "SHOWROOM" : "GALERIE" },
    { id: "logs",     label: language === "en" ? "PROCESS" : "PROCESSUS" },
    { id: "contact",  label: language === "en" ? "COMMS" : "COMMS" },
  ];

  // Logic to handle smooth scrolling via JS
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden xl:flex flex-col gap-8 items-end">
      {navItems.map((item, idx) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className="group flex items-center gap-4 transition-all bg-transparent border-none cursor-pointer p-0"
        >
          {/* Label: Slides in from the right on hover */}
          <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 font-mono text-[10px] text-workshop-accent tracking-tighter text-right">
            // {item.label}
          </span>
          
          {/* Visual Index: 00 through 06 */}
          <div className="relative flex items-center justify-center w-8">
            <span className="font-mono text-[9px] text-workshop-slate group-hover:text-white transition-colors">
              0{idx}
            </span>
            
            {/* Active Sector Line */}
            <motion.div 
              className="absolute -right-2 w-[1px] h-4 bg-workshop-slate/20 group-hover:bg-workshop-accent transition-colors" 
              whileHover={{ height: 24 }}
            />
          </div>
        </button>
      ))}
    </nav>
  );
}