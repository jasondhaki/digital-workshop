import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import DebugMode from "@/components/DebugMode";
import { LanguageProvider } from "@/context/LanguageContext"; // Import Context Provider [cite: 1159]
import LanguageToggle from "@/components/LanguageToggle"; // Import Language Toggle [cite: 1159]
import { personalInfo } from "@/data/personal"; // Import your Master Schematic data [cite: 1225, 1228]

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
 * Centralizing metadata here using your personal data ensures brand consistency 
 * and dynamic SEO across search engines and professional social media[cite: 1140, 1143, 1218, 1240].
 */
export const metadata: Metadata = {
  title: `${personalInfo.name} | Digital Workshop`,
  description: personalInfo.bio.intro,
  openGraph: {
    title: `${personalInfo.name} | Creative Engineering Portfolio`,
    description: personalInfo.bio.intro,
    url: personalInfo.socials.linkedin, // Using your LinkedIn as a primary link [cite: 1238]
    siteName: 'Digital Workshop',
    images: [
      {
        url: '/og-image.png', // Update with a screenshot of your site in the public folder [cite: 1151]
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
 * Wrapping the app in LanguageProvider allows all components to access 
 * translation functions instantly across all sections[cite: 1043, 1063].
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
        {/* Global state for bilingual technical support [cite: 1062, 1063] */}
        <LanguageProvider>
          {/* Global Technical Cursor: Acts as a tactile "sensor" [cite: 985, 990] */}
          <CustomCursor /> 
          
          {/* Hidden Debug Mode: Easter Egg to reveal underlying architecture [cite: 1008, 1012] */}
          <DebugMode />
          
          {/* Persistent Global Language Switcher [cite: 1042, 1044] */}
          <LanguageToggle />

          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}