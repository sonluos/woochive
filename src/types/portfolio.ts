// Base portfolio item interface
export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  date: string; // ISO 8601 format
  thumbnail?: string;
  tags: string[];
}

// Research project
export interface ResearchProject extends PortfolioItem {
  fullDescription: string;
  images: string[];
  technologies: string[];
  links?: {
    github?: string;
    demo?: string;
    documentation?: string;
  };
}

// Music work
export interface MusicWork extends PortfolioItem {
  instruments: string[];
  audioFile?: string;
  fullDescription: string;
}

// Publication
export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  date: string; // ISO 8601 format
  abstract: string;
  fullContent?: string;
  pdfFile?: string;
  pdfUrl?: string;
  doi?: string;
  arxivUrl?: string;
  tags?: string[];
  links?: {
    doi?: string;
    arxiv?: string;
    other?: string;
  };
}

// Bio information
export interface Bio {
  name: string;
  introduction: string;
  email?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

// Course information
export interface Course {
  id: string;
  code: string;
  name: string;
  semester: string;
  year: number;
  credits: number;
  grade?: string;
  description?: string;
  category?: string;
}
