export interface WorkEntry {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  year: number;
  size?: 'sm' | 'md' | 'lg';
}

export const worksData: WorkEntry[] = [
  // Beat Making
  {
    id: 'billie-i-willish',
    title: 'Billie I Willish',
    description: 'Billie Eilish와 Beatles의 「I Will」을 섞은 비트',
    category: 'Beat Making',
    tags: ['Pop', 'Production', 'Mix-up'],
    year: 2026,
    size: 'md',
  },
  {
    id: 'carnival-lets-go',
    title: "CARNIVAL, Let's Go",
    description: 'Kanye West의 「Carnival」과 Tyler, The Creator의 「Come On, Let\'s Go」를 섞은 비트',
    category: 'Beat Making',
    tags: ['Hip-hop', 'Production', 'Mix-up'],
    year: 2026,
    size: 'md',
  },
  {
    id: 'chillin-it',
    title: "Chillin It!",
    description: '다양한 샘플을 사용해 제작한 비트',
    category: 'Beat Making',
    tags: ['Comedy', 'Production', 'Beat Making'],
    year: 2023,
    size: 'lg',
  },
  {
    id: 'sprechstimme',
    title: 'Sprechstimme',
    description: '현대 음악의 이해 수업에서 배운 Sprechstimme에서 영감을 받아 제작한 비트',
    category: 'Beat Making',
    tags: ['Classic', 'Production', 'Beat Making'],
    year: 2026,
    size: 'sm',
  },
  {
    id: 'trumbap',
    title: 'TrumBap',
    description: '트럼펫 중심으로 구성한 붐뱁 비트',
    category: 'Beat Making',
    tags: ['Boom-bap', 'Production', 'Beat Making'],
    year: 2024,
    size: 'sm',
  },
  // Guitar/Drum Cover
  {
    id: 'guitar-best-parts',
    title: 'Best Parts',
    description: 'Daniel Caesar의 「Best Parts」 기타 커버',
    category: 'Guitar/Drum Cover',
    tags: ['R&B', 'Cover', 'Guitar'],
    year: 2026,
    size: 'sm',
  },
  {
    id: 'guitar-public-enemy',
    title: 'Public Enemy',
    description: 'Sik-K & Lil Moshpit의 「Public Enemy」 기타 톤 커버',
    category: 'Guitar/Drum Cover',
    tags: ['Rage', 'Cover', 'Electric Guitar'],
    year: 2026,
    size: 'sm',
  },
  {
    id: 'guitar-who-knows',
    title: 'Who Knows?',
    description: 'Daniel Caesar의 「Who Knows?」 기타 커버',
    category: 'Guitar/Drum Cover',
    tags: ['R&B', 'Cover', 'Guitar'],
    year: 2026,
    size: 'md',
  },
  {
    id: 'drum-meaning',
    title: '너의 의미',
    description: 'IU의 「너의 의미」 드럼 커버',
    category: 'Guitar/Drum Cover',
    tags: ['Pop', 'Cover', 'Drum'],
    year: 2026,
    size: 'sm',
  },
  // Report
  {
    id: 'chromakopia-tour',
    title: 'CHROMAKOPIA TOUR X CIRCUS MAXIMUS',
    description: 'Tyler, The Creator 공연 경험을 기록한 라이브 리포트',
    category: 'Report',
    tags: ['Hip-hop', 'Live', 'Report'],
    year: 2025,
    size: 'lg',
  },
  {
    id: 'music-of-the-spheres',
    title: 'Music of the Spheres',
    description: 'Coldplay 월드투어 공연 경험을 기록한 라이브 리포트',
    category: 'Report',
    tags: ['Pop', 'Live', 'Report'],
    year: 2025,
    size: 'md',
  },
  {
    id: 'young-gugak',
    title: '젊은 국악',
    description: '젊은 국악 공연 경험을 기록한 라이브 리포트',
    category: 'Report',
    tags: ['Korean Music', 'Live', 'Report'],
    year: 2023,
    size: 'sm',
  },
  {
    id: 'crimson-art',
    title: '크림슨 예술 공연',
    description: '크림슨 예술 공연 경험을 기록한 라이브 리포트',
    category: 'Report',
    tags: ['Classic', 'Live', 'Report'],
    year: 2025,
    size: 'sm',
  },
  // Other
  {
    id: 'diffusion-presentation',
    title: 'Diffusion Models',
    description: 'Diffusion 모델을 시각적으로 설명한 프레젠테이션',
    category: 'Other',
    tags: ['Visualization', 'Diffusion', 'AI'],
    year: 2026,
    size: 'md',
  },
  {
    id: 'mugyeonggye',
    title: '무경계',
    description: '콘서트 경험을 바탕으로 제작한 인스타그램 숏폼 영상',
    category: 'Other',
    tags: ['Contest', 'Concerts', 'Shortform'],
    year: 2025,
    size: 'sm',
  },
];
