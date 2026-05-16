export interface WorkEntry {
  id: string;
  title: string;
  description: string;
  tags: string[];
  size?: 'sm' | 'md' | 'lg';
}

export const worksData: WorkEntry[] = [
  {
    id: 'beat-tape-vol1',
    title: 'Beat Tape Vol. 1',
    description: 'Lo-fi hip-hop beats made with SP-404 and Ableton.',
    tags: ['Beat Making', 'Hip-Hop', 'SP-404'],
    size: 'lg',
  },
  {
    id: 'concert-photo-essay',
    title: 'Concert Photo Essay',
    description: 'Visual reflections from live shows in Seoul.',
    tags: ['Concert', 'Photography', 'Live Music'],
    size: 'md',
  },
  {
    id: 'guitar-covers',
    title: 'Guitar Covers',
    description: 'Acoustic arrangements of favorite tracks.',
    tags: ['Guitar', 'Cover', 'Songwriting'],
    size: 'sm',
  },
  {
    id: 'music-review-zine',
    title: 'Music Review Zine',
    description: 'Short-form album reviews and artist essays.',
    tags: ['Writing', 'Music Review', 'Editorial'],
    size: 'md',
  },
];
