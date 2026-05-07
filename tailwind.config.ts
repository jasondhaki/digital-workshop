import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        workshop: {
          bg: '#0f1115',      // Deep Charcoal 
          slate: '#1e293b',    // Slate Gray 
          accent: '#6366f1',   // Electric Indigo 
          highlight: '#adff2f' // Cyber Lime 
        }
      },
      fontFamily: {
        // Monospace for the technical "schematic" feel 
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'], 
      }
    },
  },
  plugins: [],
};
export default config;