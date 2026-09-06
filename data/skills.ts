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
  { id: 'react-native', label: 'React Native', category: 'software', connections: ['web-dev', 'app-dev'] },
  { id: 'web-dev', label: 'Web Dev', category: 'software', connections: ['react-native', 'html_css', 'next_js'] },
  { id: 'french', label: 'French (A2)', category: 'language', connections: [] },
  { id: 'html_css', label: 'HTML & CSS', category: 'software', connections: ['react-native', 'web-dev']},
  { id: 'java', label: 'Java', category: 'software', connections: ['app-dev']},
  { id: 'app-dev', label: 'App Dev', category: 'software', connections: ['java' , 'next_js', 'react-native']},
  { id: 'next_js', label: 'Next.js', category: 'software', connections: ['app-dev', 'web-dev']},
  { id: 'javascript', label: 'JavaScript', category: 'software', connections: ['web-dev', 'html_css', 'next_js'] },
  { id: 'python', label: 'Python', category: 'software', connections: ['robotics', 'fastapi', 'ai_agents'] },
  { id: 'node_js', label: 'Node.js', category: 'software', connections: ['web-dev', 'next_js'] },
  { id: 'fastapi', label: 'FastAPI', category: 'software', connections: ['python'] },
  { id: 'ai_agents', label: 'AI Agents', category: 'software', connections: ['python', 'rag'] },
  { id: 'rag', label: 'RAG', category: 'software', connections: ['python', 'ai_agents'] },
  { id: 'streamlit', label: 'Streamlit', category: 'software', connections: ['python'] }
];