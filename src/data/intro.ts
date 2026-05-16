import type { IntroData } from '../types/archive';

export const introData: IntroData = {
  title: 'Woochive',
  subtitle:
    'A personal archive for music data research, mathematical foundations, and creative works.',
  bio: [
    {
      text: 'I study Applied Mathematics.',
      highlights: [{ phrase: 'Applied Mathematics', color: 'gray' }],
    },
    {
      text: 'I research Music Information Retrieval, DSP, TDA, and Image Processing.',
      highlights: [
        { phrase: 'Music Information Retrieval', color: 'purple' },
        { phrase: 'DSP', color: 'gray' },
        { phrase: 'TDA', color: 'gray' },
        { phrase: 'Image Processing', color: 'gray' },
      ],
    },
    {
      text: 'I listen to live music, create music, and archive the sounds of my world.',
      highlights: [
        { phrase: 'live music', color: 'purple' },
        { phrase: 'music', color: 'purple' },
        { phrase: 'sounds', color: 'purple' },
      ],
    },
  ],
  infoCard: {
    affiliation: 'Undergraduate Researcher at Korea University, Sejong',
    email: 'sonluos1013@gmail.com',
    links: [
      { label: 'GitHub', href: 'https://github.com/sonluos' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/woojin-son-541705267' },
    ],
  },
};
