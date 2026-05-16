import type { IntroData, ContactLink } from '../types/archive';

const contact: ContactLink[] = [
  { kind: 'email', label: 'Email' },
  { kind: 'github', label: 'GitHub' },
  { kind: 'website', label: 'Website' },
  { kind: 'cv', label: 'CV/Profile PDF' },
];

export const introData: IntroData = {
  title: 'Woochive',
  subtitle:
    'A personal archive for music data research, mathematical foundations, and creative works.',
  bio: 'I am an undergraduate mathematics student interested in Music Information Retrieval, recommendation systems, Topological Data Analysis, and mathematical approaches to music/audio data.',
  keywords: [
    'Music Information Retrieval',
    'Recommendation Systems',
    'Topological Data Analysis',
    'Music & Audio Computing',
    'Creative Computing',
  ],
  contact,
};
