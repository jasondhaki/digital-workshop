import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import DebugMode from "@/components/DebugMode";
import { LanguageProvider } from "@/context/LanguageContext"; 
import LanguageToggle from "@/components/LanguageToggle"; 
import Navigation from "@/components/Navigation"; 
import { personalInfo } from "@/data/personal"; 

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
 * UPDATED: Optimized for mobile scroll mobility and viewport fluidity.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      /**
       * MOBILE FIX 1: Removed 'h-full' to prevent the browser from locking the page height.
       * ADDED: 'overflow-x-hidden' to prevent layout jitter on small screens.
       */
      className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth overflow-x-hidden`}
    >
      <body 
        /**
         * MOBILE FIX 2: Changed 'min-h-full' to 'min-h-screen'.
         * Ensures the document can expand vertically beyond the initial fold.
         * ADDED: 'relative' to provide a stable reference for absolute UI elements.
         */
        className="min-h-screen flex flex-col font-mono bg-workshop-bg text-white relative"
      >
        <LanguageProvider>
          {/* Global UI Layers: These remain fixed/absolute relative to the body */}
          <CustomCursor /> 
          <DebugMode />
          <LanguageToggle />
          <Navigation />

          {/* Core Content: Now free to scroll on touch devices */}
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}