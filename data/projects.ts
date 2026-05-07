export interface Project {
  id: string;
  title: string;
  category: 'robotics' | 'app' | 'web';
  description: string;
  blueprintUrl?: string; // For the "Blueprint" view (Robotics)
  resultUrl: string;     // For the "Result" view or video
  processLog: {
    stage: string;
    note: string;
    isPivot?: boolean;   // Highlight "Failures & Pivots" 
  }[];
  techStack: string[];
}

export const projects: Project[] = [
  {
    id: 'gym-leveller',
    title: 'Gym Levelling APK',
    category: 'app',
    description: 'Optimizing hardware-software interfaces for athletic performance tracking.',
    resultUrl: '/projects/gym-result.mp4',
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
    blueprintUrl: '/projects/arm-schematic.png',
    resultUrl: '/projects/arm-demo.mp4',
    processLog: [
      { stage: 'Hardware', note: 'Motor driver v1 blew up during stress test.' },
      { stage: 'Logic', note: 'Implemented PID control for smoother motion.' }
    ],
    techStack: ['Arduino', 'ROS', 'C++']
  }
];