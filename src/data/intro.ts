import type { IntroData } from '../types/archive';

export const introData: IntroData = {
  title: 'Woochive',
  subtitle:
    'A personal archive for Music Data Research, Mathematical Foundations, and Creative Works.',
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
      text: 'I enjoy listening to Live Music, playing Instruments, and creating My Own Music.',
      highlights: [
        { phrase: 'Live Music', color: 'purple' },
        { phrase: 'Instruments', color: 'purple' },
        { phrase: 'My Own Music', color: 'purple' },
      ],
    },
  ],
  infoCard: {
    affiliation: 'Undergraduate Researcher at Korea University, Sejong',
    email: '손우진 | sonluos1013@gmail.com',
    links: [
      { label: 'GitHub', href: 'https://github.com/sonluos' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/woojin-son-541705267' },
    ],
  },
};
