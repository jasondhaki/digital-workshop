"use client";

import { useState, useEffect } from "react";
import { Terminal, ShieldAlert, Code } from "lucide-react";

/**
 * DebugMode: A hidden toggle that reveals the "under the hood" 
 * architecture of the Digital Workshop.
 */
export default function DebugMode() {
  const [isDebug, setIsDebug] = useState(false);

  // Apply global "wireframe" class to the body when debug is active
  useEffect(() => {
    if (isDebug) {
      document.body.classList.add("debug-screens");
      // Optional: Add a CSS filter or global wireframe effect
      document.documentElement.style.filter = "contrast(1.2) brightness(0.8) sepia(0.2)";
    } else {
      document.body.classList.remove("debug-screens");
      document.documentElement.style.filter = "";
    }
  }, [isDebug]);

  return (
    <>
      {/* The Hidden Toggle: Tucked in the bottom left corner */}
      <button
        onClick={() => setIsDebug(!isDebug)}
        className="fixed bottom-4 left-4 z-[100] p-2 opacity-10 hover:opacity-100 transition-opacity text-workshop-slate hover:text-workshop-accent flex items-center gap-2 font-mono text-[10px]"
      >
        <Terminal size={14} />
        {isDebug ? "EXIT_DEBUG_INIT" : "RUN_SYS_CHECK"}
      </button>

      {/* Debug Overlay: Only visible when active */}
      {isDebug && (
        <div className="fixed inset-0 pointer-events-none z-[90] overflow-hidden">
          {/* Scrolling "Code" Rain effect */}
          <div className="absolute top-0 right-10 bottom-0 w-64 opacity-10 font-mono text-[8px] text-workshop-accent overflow-hidden leading-tight select-none">
            {Array.from({ length: 50 }).map((_, i) => (
              <p key={i} className="whitespace-nowrap">
                0x{Math.random().toString(16).slice(2, 10).toUpperCase()} // 
                EXEC_STRUCT_SCAN // STACK_TRACE_{i}
              </p>
            ))}
          </div>

          {/* Global Scanner Bar */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-workshop-accent/5 to-transparent h-20 w-full animate-scan" />

          {/* Status HUD */}
          <div className="absolute top-24 left-6 bg-black/80 border border-workshop-accent p-4 font-mono text-[10px] text-workshop-accent shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <div className="flex items-center gap-2 mb-2 border-b border-workshop-accent/30 pb-1">
              <ShieldAlert size={12} />
              <span>RAW_ARCHITECTURE_VIEW</span>
            </div>
            <p>V_DOM: ACTIVE</p>
            <p>RENDER_ENGINE: NEXT_JS_15</p>
            <p>UI_LAYER: TAILWIND_V4</p>
            <p className="mt-2 animate-pulse text-red-400">&gt; SYSTEM_VULNERABLE_TO_INSPECTION</p>
          </div>
        </div>
      )}
    </>
  );
}