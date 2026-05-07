import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import DebugMode from "@/components/DebugMode";
import { LanguageProvider } from "@/context/LanguageContext"; // Import Provider [cite: 409]
import LanguageToggle from "@/components/LanguageToggle"; // Import Toggle [cite: 409]

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Technical Metadata & SEO Configuration
 * Centralizing metadata here ensures "impression-making performance" 
 * and professional discoverability across search engines and social media[cite: 512, 513].
 */
export const metadata: Metadata = {
  title: "Digital Workshop | Creative Engineering Portfolio",
  description: "Bridging the gap between pixels and pneumatics.",
  openGraph: {
    title: "Digital Workshop",
    description: "Creative engineering by [Your Name].",
    url: 'https://your-portfolio-url.com', // Replace with your final URL [cite: 518]
    siteName: 'Digital Workshop',
    images: [
      {
        url: '/og-image.png', // Add a screenshot of your site to the public folder later [cite: 518]
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
 * translation functions instantly across all sections[cite: 368, 377, 409, 429].
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
        {/* Global state for bilingual technical support [cite: 409, 441] */}
        <LanguageProvider>
          {/* Global Technical Cursor: Acts as a tactile "sensor" [cite: 352, 370] */}
          <CustomCursor /> 
          
          {/* Hidden Debug Mode: Easter Egg to reveal underlying architecture [cite: 375, 377] */}
          <DebugMode />
          
          {/* Persistent Global Language Switcher [cite: 410, 430] */}
          <LanguageToggle />

          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}