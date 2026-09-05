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
  image: string;         // Essential for Next.js Image optimization
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
    title: 'Gym Levelling APK',
    category: 'app',
    description: 'Optimizing hardware-software interfaces for athletic performance tracking.',
    image: '/gym_levelling.png',
    resultUrl: '/gym_levelling.png', // TODO: replace with real demo video once recorded (public/projects/gym-result.mp4 does not exist yet)
    processLog: [
      { stage: 'v1.0', note: 'Initial sensor mapping failed due to latency.' },
      { stage: 'Pivot', note: 'Switched to low-level socket communication.', isPivot: true }
    ],
    techStack: ['React Native', 'C++', 'Spatial Sensors']
  },
  {
    id: 'arm-controller',
    title: 'Precision Robotic Arm',
    category: 'robotics',
    description: 'A 4-DOF wireframe-controlled arm using custom kinematics.',
    image: '/robotics_project.png',
    resultUrl: '/robotics_project.png', // TODO: replace with real demo video once recorded (public/projects/arm-demo.mp4 does not exist yet)
    processLog: [
      { stage: 'Hardware', note: 'Motor driver v1 blew up during stress test.' },
      { stage: 'Logic', note: 'Implemented PID control for smoother motion.' }
    ],
    techStack: ['Arduino', 'ROS', 'C++']
  },
  {
    id: 'portfolio-web',
    title: 'Portfolio Architecture',
    category: 'web',
    description: 'A high-performance interactive gallery built with Next.js 15 and React Three Fiber.',
    image: '/portfolio_architecture.png',
    resultUrl: 'https://jason-dev.vercel.app',
    processLog: [
      { stage: 'Architecture', note: 'Initialized with Next.js 15 and Turbopack for "blazing speed".' },
      { stage: 'Interaction', note: 'Pivot: Replaced standard scroll logic with a custom Framer Motion scanner.', isPivot: true },
      { stage: 'Deployment', note: 'Integrated Vercel Edge Network for global low-latency delivery.' }
    ],
    techStack: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Three.js']
  },
  {
    id: 'jhunus-craft',
    title: "Jhunu's Craft",
    category: 'web',
    description: "Digital storefront for a sustainable jute handicraft business, optimizing global reach and inventory management.",
    image: '/jhunus_craft.png',
    resultUrl: 'https://jhunus-craft.vercel.app/',
    processLog: [
      { 
        stage: 'Catalog', 
        note: 'Designed a minimalist UI to highlight the natural texture of jute handicrafts.' 
      },
      { 
        stage: 'Performance', 
        note: 'Pivot: Switched to progressive blur-up image loading to maintain speed with high-res galleries.', 
        isPivot: true 
      },
      { 
        stage: 'Commerce', 
        note: 'Implemented secure checkout with Stripe integration and local currency conversion.' 
      }
    ],
    techStack: ['Next.js', 'Stripe API', 'Cloudinary', 'Tailwind CSS']
  }
];