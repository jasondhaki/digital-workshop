export interface SkillNode {
  id: string;
  label: string;
  category: 'software' | 'hardware' | 'language';
  connections: string[]; // IDs of related skills to highlight
}

export const skills: SkillNode[] = [
  { id: 'cpp', label: 'C++', category: 'software', connections: ['robotics', 'arduino'] },
  { id: 'robotics', label: 'Robotics', category: 'hardware', connections: ['cpp', 'ros', 'arduino'] },
  { id: 'arduino', label: 'Arduino', category: 'hardware', connections: ['cpp', 'robotics'] },
  { id: 'ros', label: 'ROS', category: 'software', connections: ['robotics', 'cpp'] },
  { id: 'react-native', label: 'React Native', category: 'software', connections: ['web-dev'] },
  { id: 'web-dev', label: 'Web Dev', category: 'software', connections: ['react-native'] },
  { id: 'french', label: 'French (A2/B1)', category: 'language', connections: [] },
];