export interface WorkEntry {
  id: string;
  title: string;
  description: string;
  tags: string[];
  size?: 'sm' | 'md' | 'lg';
}

export const worksData: WorkEntry[] = [
  {
    id: 'billie-i-willish',
    title: 'Billie I Willish',
    description: 'Original beat production inspired by Billie Eilish aesthetics.',
    tags: ['Beat Making', 'Production'],
    size: 'md',
  },
  {
    id: 'carnival-lets-go',
    title: "CARNIVAL, Let's Go",
    description: 'High-energy beat with carnival-inspired rhythm and texture.',
    tags: ['Beat Making', 'Production'],
    size: 'md',
  },
  {
    id: 'chillin-it',
    title: "Chillin It!",
    description: 'Chill hip-hop beat submitted for 고저스 챌린지.',
    tags: ['Beat Making', 'Hip-Hop'],
    size: 'lg',
  },
  {
    id: 'sprechstimme',
    title: 'Sprechstimme',
    description: 'Experimental vocal-driven beat blending speech and melody.',
    tags: ['Beat Making', 'Experimental'],
    size: 'sm',
  },
  {
    id: 'trumbap',
    title: 'TrumBap',
    description: 'Boom-bap style beat with trumpet samples.',
    tags: ['Beat Making', 'Boom-Bap'],
    size: 'sm',
  },
  {
    id: 'guitar-best-parts',
    title: 'Best Parts',
    description: 'Guitar cover of Daniel Caesar & H.E.R.',
    tags: ['Guitar', 'Cover'],
    size: 'sm',
  },
  {
    id: 'guitar-public-enemy',
    title: 'Public Enemy',
    description: 'Guitar arrangement and cover.',
    tags: ['Guitar', 'Cover'],
    size: 'sm',
  },
  {
    id: 'guitar-who-knows',
    title: 'Who Knows?',
    description: 'Two-part guitar cover exploring different voicings.',
    tags: ['Guitar', 'Cover'],
    size: 'md',
  },
  {
    id: 'drum-meaning',
    title: '너의 의미',
    description: 'Drum pad cover of IU\'s 너의 의미.',
    tags: ['Drum', 'Cover'],
    size: 'sm',
  },
  {
    id: 'chromakopia-tour',
    title: 'CHROMAKOPIA TOUR X CIRCUS MAXIMUS',
    description: 'Concert report on Tyler, The Creator\'s tour.',
    tags: ['Concert', 'Report'],
    size: 'lg',
  },
  {
    id: 'music-of-the-spheres',
    title: 'Music of the Spheres',
    description: 'Concert report on Coldplay\'s world tour.',
    tags: ['Concert', 'Report'],
    size: 'md',
  },
  {
    id: 'young-gugak',
    title: '젊은 국악',
    description: '전통 국악 공연 감상 리포트.',
    tags: ['Concert', 'Report'],
    size: 'sm',
  },
  {
    id: 'crimson-art',
    title: '크림슨 예술 공연',
    description: '크림슨 예술 공연 감상 리포트.',
    tags: ['Concert', 'Report'],
    size: 'sm',
  },
  {
    id: 'diffusion-presentation',
    title: 'Diffusion Models',
    description: 'Visual presentation explaining diffusion model concepts.',
    tags: ['Presentation', 'AI'],
    size: 'md',
  },
  {
    id: 'mugyeonggye',
    title: '무경계',
    description: 'Short-form video for Instagram.',
    tags: ['Video', 'Creative'],
    size: 'sm',
  },
];
