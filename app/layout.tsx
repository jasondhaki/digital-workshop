import type { Metadata } from "next";
import { Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import DebugMode from "@/components/DebugMode";
import { LanguageProvider } from "@/context/LanguageContext"; 
import LanguageToggle from "@/components/LanguageToggle"; 
import Navigation from "@/components/Navigation"; 
import { personalInfo } from "@/data/personal"; 

/**
 * PERFORMANCE OPTIMIZATION: Next.js Font Module
 * Using 'display: swap' ensures text is visible immediately with a fallback font,
 * preventing the "blank screen" lag on mobile devices.
 */
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Personalized Metadata & SEO Configuration
 */
export const metadata: Metadata = {
  title: "Jason | Robotics & Software Engineer",
  description: "Exploring the intersection of pixels and pneumatics through hardware-software integration.",
  openGraph: {
    title: `${personalInfo.name} | Creative Engineering Portfolio`,
    description: personalInfo.bio.intro,
    url: personalInfo.socials.linkedin, 
    siteName: 'Digital Workshop',
    images: [
      {
        url: '/og-image.png', 
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

/**
 * RootLayout: The global wrapper for your portfolio.
 * UPDATED: Optimized with high-performance font loading and mobile viewport fluidity.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      /* MOBILE FIX: Added overflow-x-hidden and optimized font variables */
      className={`${orbitron.variable} ${jetbrainsMono.variable} antialiased scroll-smooth overflow-x-hidden`}
    >
      <body 
        /**
         * MOBILE FIX: 'min-h-screen' allows natural scrolling.
         * 'font-mono' is now mapped to JetBrains Mono via the Tailwind variable.
         */
        className="min-h-screen flex flex-col font-mono bg-workshop-bg text-white relative antialiased"
      >
        <LanguageProvider>
          {/* Global UI Layers */}
          <CustomCursor /> 
          <DebugMode />
          <LanguageToggle />
          <Navigation />

          {/* Core Content: Free to scroll on touch devices */}
          <main className="flex-grow">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}