"use client";

import { useState, useEffect } from "react";

/**
 * Technical Statuses: Personalized to Jason's specific engineering projects.
 * These act as a "live log" of the workshop's current background processes.
 */
const statuses = [
  "optimizing gym_levelling.apk...",
  "initializing hardware_interface...",
  "calibrating robotic_arm_4dof...",
  "mapping anatomical_nodes...",
  "monitoring coastal_afforestation...",
  "compiling creative_logic..."
];

export default function Terminal() {
  const [text, setText] = useState("");
  const [statusIndex, setStatusIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentStatus = statuses[statusIndex];
    
    const handleTyping = () => {
      if (!isDeleting) {
        // Typing Phase
        setText(currentStatus.substring(0, text.length + 1));
        if (text === currentStatus) {
          setIsDeleting(true);
          setTypingSpeed(2500); // Pause to allow reading at the end
        } else {
          setTypingSpeed(80);
        }
      } else {
        // Deleting Phase
        setText(currentStatus.substring(0, text.length - 1));
        if (text === "") {
          setIsDeleting(false);
          setStatusIndex((prev) => (prev + 1) % statuses.length);
        }
        setTypingSpeed(40);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, statusIndex, typingSpeed]);

  return (
    /**
     * POSITIONING FIX: 
     * Changed 'top-12' to 'top-24' to clear the h-16 Navbar height + padding.
     * Changed 'right-12' to 'right-6' for better alignment with the Side HUD.
     */
    <div className="absolute top-24 right-6 z-20 w-64 md:w-80 font-mono text-xs hidden lg:block pointer-events-none">
      <div className="bg-workshop-bg/60 backdrop-blur-xl border border-workshop-slate/30 rounded-lg overflow-hidden shadow-2xl">
        
        {/* Decorative Window Header: Mimics a standard terminal/CLI */}
        <div className="bg-workshop-slate/20 px-3 py-2 flex items-center justify-between border-b border-workshop-slate/30">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/20" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
            <div className="w-2 h-2 rounded-full bg-green-500/20" />
          </div>
          <span className="text-workshop-slate/40 text-[8px] uppercase tracking-[0.2em]">system_status</span>
        </div>
        
        {/* Terminal Content Area */}
        <div className="p-4 min-h-[90px] text-workshop-accent flex items-start">
          <span className="text-workshop-slate mr-2">{">"}</span>
          <div className="leading-relaxed">
            <span className="text-workshop-slate/80">root@workshop:~$ </span>
            <span className="brightness-125 text-workshop-highlight">{text}</span>
            <span className="inline-block w-1.5 h-3.5 ml-1 bg-workshop-accent animate-pulse align-middle" />
          </div>
        </div>

        {/* Footer Diagnostic Line */}
        <div className="px-4 py-2 bg-workshop-accent/5 border-t border-workshop-slate/10">
          <div className="flex justify-between items-center text-[8px] text-workshop-slate/50">
            <span>BITRATE: 12.4kbps</span>
            <span className="text-workshop-accent/60">ONLINE</span>
          </div>
        </div>
      </div>
    </div>
  );
}