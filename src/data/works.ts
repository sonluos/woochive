export interface WorkEntry {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  year: number;
  size?: 'sm' | 'md' | 'lg';
  pdfUrl?: string;
  mediaUrl?: string;
}

export const worksData: WorkEntry[] = [
  // 0 — Production (2x2)
  {
    id: 'chillin-it',
    title: "Chillin It!",
    description: '다양한 샘플을 사용해 제작한 비트',
    category: 'Production',
    tags: ['Comedy', 'Beat Making'],
    year: 2023,
    pdfUrl: '/works/%EA%B3%A0%EC%A0%80%EC%8A%A4%EC%B1%8C%EB%A6%B0%EC%A7%80_%EA%B2%B0%EA%B3%BC%EB%B3%B4%EA%B3%A0%EC%84%9C.pdf',
    mediaUrl: 'https://drive.google.com/file/d/17I1aOE0KY_vkRt40HmTnEtHrz7LUITcm/view',
  },
  // 1 — Report (1x1)
  {
    id: 'young-gugak',
    title: '젊은 국악',
    description: '공연 리포트',
    category: 'Report',
    tags: ['Korean Music', 'Live'],
    year: 2023,
    pdfUrl: '/works/%EC%A0%8A%EC%9D%80%20%EA%B5%AD%EC%95%85_%EB%A0%88%ED%8F%AC%ED%8A%B8.pdf',
  },
  // 2 — Cover (1x1)
  {
    id: 'drum-meaning',
    title: '너의 의미',
    description: 'by IU',
    category: 'Cover',
    tags: ['Pop', 'Drum'],
    year: 2026,
    mediaUrl: 'https://drive.google.com/file/d/1aGCK7iPQm8gAlaezC3EnAl0zLVAWPT2k/view',
  },
  // 3 — Production (2x2)
  {
    id: 'carnival-lets-go',
    title: "CARNIVAL, Let's Go",
    description: 'Kanye West의 「Carnival」과 Tyler, The Creator의 「Come On, Let\'s Go」의 믹스 업',
    category: 'Production',
    tags: ['Hip-hop', 'Mix-up'],
    year: 2026,
    mediaUrl: 'https://drive.google.com/file/d/1CmdKZ-tE1KinG4Zwhs9-ELDBy9g84FCw/view',
  },
  // 4 — Report (2x1)
  {
    id: 'chromakopia-tour',
    title: 'CHROMAKOPIA TOUR X CIRCUS MAXIMUS',
    description: 'by Tyler, The Creator & Travis Scott',
    category: 'Report',
    tags: ['Hip-hop', 'Live'],
    year: 2025,
    pdfUrl: '/works/CHROMAKOPIA%20TOUR%20X%20CIRCUS%20MAXIMUS_%EB%A0%88%ED%8F%AC%ED%8A%B8.pdf',
  },
  // 5 — Cover (1x1)
  {
    id: 'guitar-best-parts',
    title: 'Best Parts',
    description: 'by Daniel Caesar',
    category: 'Cover',
    tags: ['R&B', 'Guitar'],
    year: 2026,
    mediaUrl: 'https://drive.google.com/file/d/1XGtrsR5bcC20rx1JAGbHN3gncy0KI_IO/view',
  },
  // 6 — Production (2x2)
  {
    id: 'billie-i-willish',
    title: 'Billie I Willish',
    description: 'Billie Eilish와 Beatles의 「I Will」을 섞은 믹스 업',
    category: 'Production',
    tags: ['Pop', 'Mix-up'],
    year: 2026,
    mediaUrl: 'https://drive.google.com/file/d/18VEi0uo3UauhF_nlYSsWYIurwjpk9naa/view',
  },
  // 7 — Other (2x1)
  {
    id: 'diffusion-presentation',
    title: 'Diffusion Models',
    description: 'Diffusion 모델의 시각화',
    category: 'Other',
    tags: ['Visualization', 'Diffusion', 'AI'],
    year: 2026,
    mediaUrl: 'https://drive.google.com/file/d/1danuyhZbH5T8xDAi87-Teqx_bnkPeyxh/view',
  },
  // 8 — Cover (1x1)
  {
    id: 'guitar-public-enemy',
    title: 'Public Enemy',
    description: 'by Sik-K & Lil Moshpit',
    category: 'Cover',
    tags: ['Rage', 'Electric Guitar'],
    year: 2026,
    mediaUrl: 'https://drive.google.com/file/d/1538jLbO2flx9zSjd5KGHh9MD5QQS8DhX/view',
  },
  // 9 — Production (2x2)
  {
    id: 'sprechstimme',
    title: 'Sprechstimme',
    description: '현대 음악의 이해 수업에서 배운 Sprechstimme에서 영감을 받아 제작한 비트',
    category: 'Production',
    tags: ['Classic', 'Beat Making'],
    year: 2026,
    mediaUrl: 'https://drive.google.com/file/d/1ZivUkDxidrRN-gS8DpGO8vHAm9ndMv61/view',
  },
  // 10 — Report (2x1)
  {
    id: 'music-of-the-spheres',
    title: 'Music of the Spheres',
    description: 'by Coldplay',
    category: 'Report',
    tags: ['Pop', 'Live'],
    year: 2025,
    pdfUrl: '/works/Music%20of%20the%20Spheres_%EB%A0%88%ED%8F%AC%ED%8A%B8.pdf',
  },
  // 11 — Cover (2x1)
  {
    id: 'guitar-who-knows',
    title: 'Who Knows?',
    description: 'by Daniel Caesar',
    category: 'Cover',
    tags: ['R&B', 'Guitar'],
    year: 2026,
    mediaUrl: 'https://drive.google.com/file/d/1L3oJtxvA7dazDfr8VAgB35as44L-mvBy/view',
  },
  // 12 — Production (2x2)
  {
    id: 'trumbap',
    title: 'TrumBap',
    description: '트럼펫 중심으로 구성한 붐뱁 비트',
    category: 'Production',
    tags: ['Boom-bap', 'Beat Making'],
    year: 2024,
    mediaUrl: 'https://drive.google.com/file/d/1nAl7BB6DEer8EO99AHbJqN-BZrQeYP15/view',
  },
  // 13 — Other (2x1)
  {
    id: 'mugyeonggye',
    title: '무경계',
    description: '인스타그램 숏폼 공모전',
    category: 'Other',
    tags: ['Contest', 'Concerts', 'Shortform'],
    year: 2025,
    mediaUrl: 'https://drive.google.com/file/d/1-Dv0HVa8tCd5tZfvJXGJVomSR5aHEQBt/view',
  },
  // 14 — Report (1x1)
  {
    id: 'crimson-art',
    title: '크림슨 예술 공연',
    description: '공연 리포트',
    category: 'Report',
    tags: ['Classic', 'Live'],
    year: 2025,
    pdfUrl: '/works/%ED%81%AC%EB%A6%BC%EC%8A%A8%20%EC%98%88%EC%88%A0%20%EA%B3%B5%EC%97%B0_%EB%A0%88%ED%8F%AC%ED%8A%B8.pdf',
  },
];
