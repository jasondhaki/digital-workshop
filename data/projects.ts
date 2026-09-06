/**
 * Project: Interface for defining technical case studies.
 * Supports Robotics, App, and Web categories with a focus on "Growth Mindset" logs.
 * SYNCED: Added 'image' property to match Phase 8, Step 3 performance tuning.
 */
export interface Project {
  id: string;
  title: string;
  category: 'robotics' | 'app' | 'web' | 'tool';
  description: string;
  image?: string;        // Omit to show the "no screenshot yet" placeholder instead
  resultUrl?: string;    // Live deployment link. Omit if there's no live site (hides VISIT_SITE)
  repoUrl?: string;      // Omit to fall back to the GitHub profile link
  processLog: {
    stage: string;
    note: string;
    isPivot?: boolean;   // Flags "Failures & Pivots" for technical honesty
  }[];
  techStack: string[];
}

export const projects: Project[] = [
  {
    id: 'portfolio-web',
    title: 'Portfolio Architecture',
    category: 'web',
    description: 'A performance-tuned personal portfolio with a live WebGL hero, scroll-triggered reveals, and a hardened, SEO-ready Next.js foundation.',
    image: '/portfolio_architecture.png',
    resultUrl: 'https://jasondhaki-dev.vercel.app',
    repoUrl: 'https://github.com/jasondhaki/jasondhaki_portfolio',
    processLog: [
      { stage: 'Architecture', note: 'Initialized with Next.js and Turbopack for "blazing speed".' },
      { stage: 'Interaction', note: 'Pivot: Replaced standard scroll logic with a custom Framer Motion scanner.', isPivot: true },
      { stage: 'Deployment', note: 'Integrated Vercel Edge Network for global low-latency delivery.' }
    ],
    techStack: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Three.js']
  },
  {
    id: 'jhunus-craft',
    title: "Jhunu's Craft",
    category: 'web',
    description: 'A B2B/B2C storefront for handcrafted Bangladeshi jute goods, with Stripe checkout and a Prisma-backed catalog built for wholesale export.',
    image: '/jhunus_craft.png',
    resultUrl: 'https://jhunus-craft.vercel.app/',
    repoUrl: 'https://github.com/jasondhaki/jhunus-crafts',
    processLog: [
      {
        stage: 'Schema',
        note: 'Designed a relational schema with Prisma and PostgreSQL to handle complex global transactions and wholesale orders.'
      },
      {
        stage: 'Auth & Payments',
        note: 'Implemented secure B2B authentication with NextAuth and checkout with Stripe.'
      }
    ],
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'Stripe', 'NextAuth']
  },
  {
    id: 'hope-crafts',
    title: 'Hope Crafts',
    category: 'web',
    description: 'A heritage-driven jute goods storefront empowering 500+ artisans, with a headless Sanity CMS and multi-gateway checkout for global and local buyers.',
    image: '/hopes_craft.png',
    resultUrl: 'https://hopes-craft-cvmz.vercel.app/',
    repoUrl: 'https://github.com/jasondhaki/hopes-craft',
    processLog: [
      { stage: 'CMS', note: 'Architected a headless Sanity CMS with optimized GROQ queries for the storytelling and catalog content.' },
      { stage: 'Payments', note: 'Integrated Stripe and SSLCommerz (supporting bKash) so both global and local Bangladeshi buyers can check out.' }
    ],
    techStack: ['Next.js', 'Sanity CMS', 'Clerk', 'Stripe', 'SSLCommerz']
  },
  {
    id: 'trustlens-ai',
    title: 'TrustLens AI',
    category: 'web',
    description: 'A bilingual misinformation-detection tool that scores any claim 0-100 across six explainable pillars, accessible via web, Telegram, and a Chrome extension.',
    image: '/trustlensAI.png',
    resultUrl: 'https://trust-lens-ai-beta.vercel.app',
    repoUrl: 'https://github.com/mahdiebene/TrustLensAI',
    processLog: [
      { stage: 'Pipeline', note: 'Built a two-pass, verifier-first scoring pipeline: one pass cross-checks claims via live web search, the next scores 6 weighted pillars.' },
      { stage: 'Backend', note: 'Deployed a rate-limited FastAPI backend with Redis caching, plus optional PostgreSQL and Neo4j for RAG/author-network experiments.' }
    ],
    techStack: ['Next.js', 'Python', 'FastAPI', 'Redis', 'Neo4j']
  },
  {
    id: 'gym-leveller',
    title: 'Gym Levelling',
    category: 'app',
    description: 'A gamified fitness-tracking MVP built with Expo and React Native, turning workout consistency into RPG-style character progression.',
    image: '/gym_levelling.png',
    // No live demo yet — TODO: add one once a build/video exists.
    repoUrl: 'https://github.com/jasondhaki/gym-rpg-mvp',
    processLog: [
      { stage: 'Architecture', note: 'Designed a gamified progression system tying character attributes to real workout density.' },
      { stage: 'Native Build', note: 'Built on Expo Router with NativeWind and Zustand for state, targeting cross-platform deployment.' }
    ],
    techStack: ['Expo', 'React Native', 'TypeScript', 'Expo Router', 'NativeWind']
  },
  {
    id: 'arm-controller',
    title: 'Autonomous Line Following Robot',
    category: 'robotics',
    description: 'An autonomous line-following and obstacle-avoidance vehicle with a 4-DOF robotic arm for object pickup.',
    image: '/robotics_project.png',
    // No live demo yet — TODO: add one once a video is recorded.
    processLog: [
      { stage: 'Sensing', note: 'Integrated a QTR-8A reflectance sensor array and ultrasonic sensor for line tracking and obstacle detection.' },
      { stage: 'Actuation', note: 'Programmed an L298N motor driver and 4-DOF arm to autonomously pick up objects.' }
    ],
    techStack: ['Arduino MEGA', 'L298N Motor Driver', 'QTR-8A Sensor Array', '4-DOF Robotic Arm']
  },
  {
    id: 'ai5k-profile-intelligence',
    title: 'AI5K Profile Intelligence',
    category: 'web',
    description: 'An AI freelancer-profile analyzer that scores CV/GitHub/Upwork readiness across 8 evidence tiers and rewrites your title/overview — every claim traces back to a real source.',
    image: '/ai5k_profile_intelligence.png',
    resultUrl: 'https://jasondhaki.github.io/UpworkGitHUBresumeAI/',
    repoUrl: 'https://github.com/jasondhaki/UpworkGitHUBresumeAI',
    processLog: [
      { stage: 'Grounding', note: 'Built the generation step so a number that can\'t be traced to a real claim never gets published — no hallucinated scores.' },
      { stage: 'Ingestion', note: 'Parsed real CVs with Docling and pulled GitHub data straight from the API rather than trusting self-reported claims.' },
      { stage: 'Deployment', note: 'Pivot: split into a static GitHub Pages preview and a full backend on Render, since CV-parsing dependencies exceeded Vercel\'s serverless size limit.', isPivot: true }
    ],
    techStack: ['Python', 'FastAPI', 'Gemini API', 'Docling', 'SQLite']
  },
  {
    id: 'economics-ai-tutor',
    title: 'A-Levels Economics AI Tutor',
    category: 'web',
    description: 'A RAG-based Economics tutor chatbot for my own A-Level students, grounded in real course notes, with a private history vault that needs no account.',
    repoUrl: 'https://github.com/jasondhaki/A-Levels-Economics-AI-Agent',
    processLog: [
      { stage: 'RAG Pipeline', note: 'Ingested A-Level Economics notes into ChromaDB using Gemini embeddings so answers stay grounded in the actual syllabus.' },
      { stage: 'Agent Logic', note: 'Built the tutoring flow as a LangGraph state machine instead of a single prompt, so it can reason over multi-step questions.' },
      { stage: 'Privacy', note: 'Each student gets a private 4-character vault key to save and resume their history without creating an account.' }
    ],
    techStack: ['Python', 'Streamlit', 'LangGraph', 'Gemini API', 'ChromaDB']
  },
  {
    id: 'automation-scripts',
    title: 'Desktop Automation Suite',
    category: 'tool',
    description: 'A set of Python utilities that prep my laptop for deep work, organize Downloads by file type, and flatten nested archive folders.',
    repoUrl: 'https://github.com/jasondhaki/Automation_Scripts',
    processLog: [
      { stage: 'Focus Mode', note: 'One script closes distracting apps (Discord, Steam, Spotify) and opens work tools (VS Code, GitHub, Gemini).' },
      { stage: 'File Ops', note: 'Cross-platform (Windows/macOS/Linux) scripts organize Downloads by type and un-nest archive folders automatically.' }
    ],
    techStack: ['Python']
  }
];