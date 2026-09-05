"use client";

import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
}

const translations = {
  en: {
    hero_status: "System Initialization...",
    hero_hook: "BRIDGING THE GAP BETWEEN PIXELS AND PNEUMATICS",
    skills_title: "01 // INTEGRATED_SKILLS",
    projects_title: "02 // PROJECT_SHOWROOM",
    process_title: "03 // BUILD_PROCESS_LOG",
  },
  fr: {
    hero_status: "Initialisation du Système...",
    hero_hook: "COMBLER L'ÉCART ENTRE LES PIXELS ET LA PNEUMATIQUE",
    skills_title: "01 // COMPÉTENCES_INTÉGRÉES",
    projects_title: "02 // GALERIE_DE_PROJETS",
    process_title: "03 // JOURNAL_DE_CONSTRUCTION",
  }
} as const;

type TranslationKey = keyof typeof translations["en"];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  
  const t = (key: TranslationKey) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};