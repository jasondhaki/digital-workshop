import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import DebugMode from "@/components/DebugMode";
import { LanguageProvider } from "@/context/LanguageContext"; // Import Context Provider
import LanguageToggle from "@/components/LanguageToggle"; // Import Language Toggle
import Navigation from "@/components/Navigation"; // Import the floating HUD Navigation
import { personalInfo } from "@/data/personal"; // Import Master Schematic data

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Personalized Metadata & SEO Configuration
 * Pulling directly from personal.ts ensures your professional identity is 
 * baked into the browser tab and social sharing cards.
 */
export const metadata: Metadata = {
  title: `${personalInfo.name} | Digital Workshop`,
  description: personalInfo.bio.intro,
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
 * Placing the Navigation here ensures it stays persistent and 
 * accessible throughout the user's journey.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-mono bg-workshop-bg text-white">
        {/* Global state for bilingual support and interactive UI layers */}
        <LanguageProvider>
          {/* Global Technical Cursor: Tactile sensor feedback */}
          <CustomCursor /> 
          
          {/* Hidden Debug Mode: Architectural Easter Egg */}
          <DebugMode />
          
          {/* Persistent Global Language Switcher */}
          <LanguageToggle />

          {/* Floating HUD Navigation: Cross-sector jumping */}
          <Navigation />

          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}