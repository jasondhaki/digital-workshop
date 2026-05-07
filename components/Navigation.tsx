"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Navigation: A floating HUD that allows users to jump between system sectors.
 * Uses technical indexing (00, 01, etc.) to match the workshop aesthetic.
 */
export default function Navigation() {
  const { language } = useLanguage();

  const navItems = [
    { id: "hero", label: language === "en" ? "INIT" : "INIT" },
    { id: "bio", label: language === "en" ? "NARRATIVE" : "RÉCIT" },
    { id: "career", label: language === "en" ? "HISTORY" : "HISTOIRE" },
    { id: "skills", label: language === "en" ? "SYS_MAP" : "CARTE_SYS" },
    { id: "projects", label: language === "en" ? "DEPLOYMENTS" : "DÉPLOIEMENTS" },
  ];

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden xl:flex flex-col gap-8 items-end">
      {navItems.map((item, idx) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="group flex items-center gap-4 transition-all"
        >
          {/* Label: Only visible on hover */}
          <span className="opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[10px] text-workshop-accent tracking-tighter">
            // {item.label}
          </span>
          
          {/* Visual Indicator */}
          <div className="relative flex items-center justify-center">
            <span className="font-mono text-[8px] text-workshop-slate group-hover:text-workshop-accent transition-colors">
              0{idx}
            </span>
            <motion.div 
              className="absolute -right-2 w-[1px] h-4 bg-workshop-slate group-hover:bg-workshop-accent transition-colors" 
              layoutId="nav-line"
            />
          </div>
        </a>
      ))}
    </nav>
  );
}