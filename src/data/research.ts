import type { ResearchData } from '../types/archive';

export const researchData: ResearchData = {
  publications: [
    {
      id: 'ipiu-2026',
      venue: 'IPIU 2026',
      type: 'Poster Presentation',
      status: 'Presented / In Preparation',
    },
  ],
  projects: [
    {
      id: 'mir-with-tda',
      title: 'MIR with TDA',
      description:
        'Exploring how Topological Data Analysis can be applied to music data and how it compares with traditional DSP-based music feature analysis.',
      tags: ['TDA', 'Music Structure', 'Topology', 'MIR'],
      year: 2026,
      status: 'In Progress',
    },
    {
      id: 'bone-suppression-anisotropic-diffusion',
      title: 'Bone Suppression & Anisotropic Diffusion',
      description:
        'Anisotropic diffusion, EED/CED, and non-deep-learning image processing approaches for structure-preserving medical image preprocessing.',
      tags: ['Image Processing', 'Diffusion', 'EED', 'CED', 'CXR'],
      year: 2025,
    },
    {
      id: 'mir-recommendation-system',
      title: 'MIR Recommendation System',
      description:
        'Analyzing hip-hop album data using Apple Music / Spotify metadata and audio features to design a similarity-based recommendation system.',
      tags: ['MIR', 'Recommendation System', 'Clustering', 'MATLAB'],
      year: 2025,
    },
    {
      id: 'diffusion-education-program',
      title: 'Diffusion Education Program',
      description:
        'Explaining AI and diffusion models through functional thinking, visualization, and simple mathematical intuition.',
      tags: ['AI Education', 'Diffusion', 'Visualization'],
      year: 2024,
    },
  ],
};
