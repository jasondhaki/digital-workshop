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
  processLog: {
    stage: string;
    note: string;
    isPivot?: boolean;   // Flags "Failures & Pivots" for technical honesty
  }[];
  techStack: string[];
}

export const projects: Project[] = [
  {
    id: 'gym-leveller',
    title: 'Gym Levelling',
    category: 'app',
    description: 'A gamified MVP mobile app bridging character-attribute progression with physical training density to boost workout consistency.',
    image: '/gym_levelling.png',
    resultUrl: '/gym_levelling.png', // TODO: swap for a real demo video/APK link once available
    processLog: [
      { stage: 'Architecture', note: 'Designed a gamified progression system tying character attributes to real workout density.' },
      { stage: 'Native Build', note: 'Configured Gradle and Android SDK CLI tooling for cross-platform deployment.' }
    ],
    techStack: ['TypeScript', 'React Native', 'Expo Router', 'Gradle', 'Android SDK']
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
  },
  {
    id: 'portfolio-web',
    title: 'Portfolio Architecture',
    category: 'web',
    description: 'A high-performance interactive gallery built with Next.js and React Three Fiber.',
    image: '/portfolio_architecture.png',
    resultUrl: 'https://jason-dev.vercel.app',
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
    description: 'A full-stack B2B wholesale export platform streamlining the international supply chain for sustainable Bangladeshi jute products.',
    image: '/jhunus_craft.png',
    resultUrl: 'https://jhunus-craft.vercel.app/',
    processLog: [
      {
        stage: 'Schema',
        note: 'Designed a relational schema with Prisma and PostgreSQL to handle complex global transactions and wholesale orders.'
      },
      {
        stage: 'Auth',
        note: 'Implemented secure B2B authentication and buyer flows with Clerk.'
      }
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Prisma', 'PostgreSQL', 'Clerk']
  },
  {
    id: 'hope-crafts',
    title: 'Hope Crafts',
    category: 'web',
    description: 'A high-performance e-commerce and storytelling platform for handicraft goods, built on a headless Sanity CMS.',
    resultUrl: 'https://hopes-craft-cvmz.vercel.app/',
    processLog: [
      { stage: 'CMS', note: 'Architected a headless Sanity CMS with optimized GROQ queries for the storytelling and catalog content.' },
      { stage: 'Commerce', note: 'Built the e-commerce flow with Next.js, TypeScript, and DaisyUI on top of Tailwind CSS.' }
    ],
    techStack: ['Next.js', 'TypeScript', 'Sanity.io', 'Clerk', 'Tailwind CSS']
  },
  {
    id: 'trustlens-ai',
    title: 'TrustLens AI',
    category: 'web',
    description: 'A bilingual, multi-platform trust-scoring system using AI models and graph databases to detect misinformation across the Bangladeshi internet ecosystem. Built at The Infinity AI BuildFest 2026 hackathon.',
    resultUrl: 'https://trust-lens-ai-beta.vercel.app',
    processLog: [
      { stage: 'Backend', note: 'Deployed high-throughput FastAPI endpoints on a VPS for real-time content verification.' },
      { stage: 'Graph Data', note: 'Modeled misinformation trust networks with a Neo4j graph database alongside PostgreSQL.' }
    ],
    techStack: ['Python', 'FastAPI', 'Neo4j', 'PostgreSQL', 'Ollama']
  }
];