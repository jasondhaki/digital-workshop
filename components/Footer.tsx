"use client";

import { useState, useEffect } from "react";
import { personalInfo } from "@/data/personal";
import { Cpu, Globe } from "lucide-react";

/**
 * Footer: The final "System Status" bar of the Digital Workshop.
 * Includes a live clock and professional credits.
 */
export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="w-full border-t border-workshop-slate/20 py-8 px-6 bg-workshop-bg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* System Diagnostics */}
        <div className="flex items-center gap-6 font-mono text-[10px] text-workshop-slate">
          <div className="flex items-center gap-2">
            <Cpu size={12} className="text-workshop-accent animate-pulse" />
            <span>ENGINE_STATUS: OPTIMAL</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={12} className="text-workshop-highlight" />
            <span>LOCAL_TIME: {time || "00:00:00"}</span>
          </div>
        </div>

        {/* Ownership Credits */}
        <div className="text-center md:text-right font-mono text-[10px] text-workshop-slate leading-relaxed">
          <p>© {new Date().getFullYear()} {personalInfo.name.toUpperCase()}</p>
          <p className="opacity-50 tracking-tighter">DESIGNED & DEVELOPED BY JASON DHAKI</p>
        </div>

      </div>
    </footer>
  );
}