import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import DebugMode from "@/components/DebugMode";
import { LanguageProvider } from "@/context/LanguageContext"; // Import Context Provider [cite: 409]
import LanguageToggle from "@/components/LanguageToggle"; // Import Language Toggle [cite: 409]

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Update metadata to reflect your "Digital Workshop" theme [cite: 387, 409]
export const metadata: Metadata = {
  title: "Digital Workshop | Creative Engineering Portfolio",
  description: "Bridging the gap between pixels and pneumatics.",
};

/**
 * RootLayout: The global wrapper for your portfolio.
 * Wrapping the app in LanguageProvider allows all components to access 
 * translation functions instantly.
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
        {/* Wrap the entire app to provide global language state [cite: 409] */}
        <LanguageProvider>
          {/* Technical UI Layers [cite: 409] */}
          <CustomCursor /> 
          <DebugMode />
          
          {/* Global Language Switcher [cite: 409, 410] */}
          <LanguageToggle />

          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}