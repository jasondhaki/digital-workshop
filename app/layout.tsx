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
const siteUrl = "https://jasondhaki-dev.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jason Dhaki | Robotics & Software Engineer",
    template: "%s | Jason Dhaki",
  },
  description: "Exploring the intersection of pixels and pneumatics through hardware-software integration.",
  keywords: ["Jason Dhaki", "Robotics Engineer", "Software Engineer", "Full-Stack Developer", "Portfolio", "Next.js", "React Native", "Arduino", "ROS"],
  authors: [{ name: personalInfo.name, url: personalInfo.socials.github }],
  creator: personalInfo.name,
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: `${personalInfo.name} | Creative Engineering Portfolio`,
    description: personalInfo.bio.intro,
    url: siteUrl,
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
  twitter: {
    card: 'summary_large_image',
    title: `${personalInfo.name} | Creative Engineering Portfolio`,
    description: personalInfo.bio.intro,
    images: ['/og-image.png'],
  },
};

/**
 * RootLayout: The global wrapper for your portfolio.
 * UPDATED: Optimized with high-performance font loading and mobile viewport fluidity.
 */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  jobTitle: personalInfo.role,
  description: personalInfo.bio.intro,
  url: siteUrl,
  sameAs: [personalInfo.socials.github, personalInfo.socials.linkedin],
};

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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
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
          <main className="grow">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}