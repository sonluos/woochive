import type { FoundationsData } from '../types/archive';

export const foundationsData: FoundationsData = [
  {
    id: 'mathematics',
    title: 'Mathematics',
    items: [
      { label: 'Real Analysis', status: 'In Progress' },
      { label: 'Topology I', status: 'In Progress' },
      { label: 'Algebra I' },
      { label: 'Numerical Analysis' },
      { label: 'Linear Algebra' },
      { label: 'Differential Equations' },
    ],
  },
  {
    id: 'cs-ai',
    title: 'Computer Science & AI',
    items: [
      { label: 'Data Science', status: 'Code' },
      { label: 'Artificial Intelligence', status: 'In Progress' },
      { label: 'Neural Network from Scratch', status: 'Code' },
      { label: 'MATLAB / Python Notes', status: 'Code' },
    ],
  },
  {
    id: 'paper-reading',
    title: 'Paper Reading',
    items: [
      { label: 'Anisotropic Diffusion in ITK', status: 'Paper Reading' },
      { label: 'MIR papers', status: 'Paper Reading' },
      { label: 'TDA papers', status: 'Paper Reading' },
      { label: 'Music and Audio Computing papers', status: 'Paper Reading' },
    ],
  },
  {
    id: 'latex-notes',
    title: 'LaTeX Notes',
    items: [
      { label: 'Overleaf notes', status: 'LaTeX Note' },
      { label: 'Research summaries', status: 'LaTeX Note' },
      { label: 'Mathematical derivations', status: 'LaTeX Note' },
      { label: 'Presentation notes', status: 'Presentation' },
    ],
  },
];
