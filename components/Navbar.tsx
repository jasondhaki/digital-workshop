"use client";

import { motion } from "framer-motion";
import { scrollToSection } from "@/lib/scroll";

/**
 * navLinks: Recalibrated navigation array.
 * Removed "LOGS" to match the updated Sector flow.
 */
const navLinks = [
  { name: "HOME", id: "hero" },
  { name: "BIO", id: "bio" },
  { name: "SKILLS", id: "skills" },
  { name: "PROJECTS", id: "projects" },
  { name: "CONTACT", id: "contact" },
];

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-[100] bg-slate-950/50 backdrop-blur-md border-b border-workshop-accent/20"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* System Identifier */}
        <span className="font-mono text-workshop-accent font-bold tracking-tighter cursor-default">
          JASON_DHAKI.SYS
        </span>
        
        {/* Desktop Command Terminal Links */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-[10px] font-mono text-slate-400 hover:text-workshop-accent transition-colors tracking-widest uppercase"
            >
              {link.name}
            </button>
          ))}
        </div>
        
        {/* Mobile Status Indicator */}
        <div className="md:hidden text-[10px] font-mono text-workshop-accent animate-pulse">
          SYSTEM_ONLINE
        </div>
      </div>
    </motion.nav>
  );
}