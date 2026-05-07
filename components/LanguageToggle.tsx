"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="fixed top-6 right-24 z-[100] flex items-center gap-3 font-mono text-[10px]">
      <span className={language === 'fr' ? 'text-workshop-accent' : 'text-workshop-slate'}>FR</span>
      <button 
        onClick={toggleLanguage}
        className="w-10 h-5 bg-workshop-slate/20 rounded-full relative border border-workshop-slate/30"
      >
        <motion.div 
          animate={{ x: language === 'en' ? 20 : 2 }}
          className="w-4 h-4 bg-workshop-accent rounded-full absolute top-[1px]"
        />
      </button>
      <span className={language === 'en' ? 'text-workshop-accent' : 'text-workshop-slate'}>EN</span>
    </div>
  );
}