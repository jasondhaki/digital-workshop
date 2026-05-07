"use client";

import { useState, useEffect } from "react";

const statuses = [
  "optimizing gym_levelling.apk...",
  "initializing hardware_interface...",
  "mapping neural_nodes...",
  "compiling creative_logic...",
  "debugging spatial_sensors..."
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
        setText(currentStatus.substring(0, text.length + 1));
        if (text === currentStatus) {
          setIsDeleting(true);
          setTypingSpeed(2500); // Wait at the end of the sentence
        } else {
          setTypingSpeed(80);
        }
      } else {
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
    <div className="absolute top-12 right-12 z-20 w-64 md:w-80 font-mono text-xs hidden lg:block">
      <div className="bg-workshop-bg/80 backdrop-blur-md border border-workshop-slate/30 rounded-lg overflow-hidden shadow-2xl">
        {/* Decorative Window Header */}
        <div className="bg-workshop-slate/20 px-3 py-2 flex items-center justify-between border-b border-workshop-slate/30">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500/30" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
            <div className="w-2 h-2 rounded-full bg-green-500/30" />
          </div>
          <span className="text-workshop-slate/60 text-[9px] uppercase tracking-widest">system_status</span>
        </div>
        
        {/* Terminal Text Content */}
        <div className="p-4 min-h-[90px] text-workshop-accent flex items-start">
          <span className="text-workshop-slate mr-2">{">"}</span>
          <div>
            <span className="text-workshop-slate">status: </span>
            <span className="brightness-125">{text}</span>
            <span className="inline-block w-2 h-4 ml-1 bg-workshop-accent animate-pulse align-middle" />
          </div>
        </div>
      </div>
    </div>
  );
}