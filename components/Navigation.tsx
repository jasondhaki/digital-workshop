"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Navigation: A floating HUD Side-Bar.
 * Recalibrated to 6 sectors (00-05) after removing the Process Log.
 */
export default function Navigation() {
  const { language } = useLanguage();

  const navItems = [
    { id: "hero",     label: language === "en" ? "INIT" : "INIT" },
    { id: "bio",      label: language === "en" ? "NARRATIVE" : "RÉCIT" },
    { id: "career",   label: language === "en" ? "HISTORY" : "HISTOIRE" },
    { id: "skills",   label: language === "en" ? "SYS_MAP" : "CARTE_SYS" },
    { id: "projects", label: language === "en" ? "SHOWROOM" : "GALERIE" },
    { id: "contact",  label: language === "en" ? "COMMS" : "COMMS" },
  ];

  /**
   * scrollToSection: Synchronized with Navbar scrolling logic.
   * Uses an 80px offset to account for the top menu bar.
   */
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
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
          {/* Label: HUD text that slides in on hover */}
          <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 font-mono text-[10px] text-workshop-accent tracking-tighter text-right">
            // {item.label}
          </span>
          
          {/* Visual Index: Automatically recalibrated to 00-05 */}
          <div className="relative flex items-center justify-center w-8">
            <span className="font-mono text-[9px] text-workshop-slate group-hover:text-white transition-colors">
              0{idx}
            </span>
            
            {/* Sector Indicator Line */}
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