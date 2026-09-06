/**
 * Project: Interface for defining technical case studies.
 * Supports Robotics, App, and Web categories with a focus on "Growth Mindset" logs.
 * SYNCED: Added 'image' property to match Phase 8, Step 3 performance tuning.
 */
export interface Project {
  id: string;
  title: string;
  category: 'robotics' | 'app' | 'web';
  description: string;
  image?: string;        // Omit to show the "no screenshot yet" placeholder instead
  resultUrl: string;     // Demonstration videos or live deployment links
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
    resultUrl: '/gym_levelling.png', // TODO: swap for a real demo video/APK link once available
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
    resultUrl: '/robotics_project.png', // TODO: swap for a real demo video once recorded
    processLog: [
      { stage: 'Sensing', note: 'Integrated a QTR-8A reflectance sensor array and ultrasonic sensor for line tracking and obstacle detection.' },
      { stage: 'Actuation', note: 'Programmed an L298N motor driver and 4-DOF arm to autonomously pick up objects.' }
    ],
    techStack: ['Arduino MEGA', 'L298N Motor Driver', 'QTR-8A Sensor Array', '4-DOF Robotic Arm']
  }
];