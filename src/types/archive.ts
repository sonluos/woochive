export type ContactLinkKind = 'email' | 'github' | 'website' | 'cv';

export interface ContactLink {
  kind: ContactLinkKind;
  label: string;
  /** undefined = placeholder (not yet available) */
  href?: string;
}

export type HighlightColor = 'gray' | 'purple' | 'gradient';

export interface TextHighlight {
  phrase: string;
  color: HighlightColor;
}

export interface BioLine {
  text: string;
  highlights: TextHighlight[];
}

export interface InfoCardData {
  affiliation: string;
  email: string;
  links: Array<{ label: string; href: string }>;
}

export interface IntroData {
  title: string;
  subtitle: string;
  bio: BioLine[];
  infoCard: InfoCardData;
}

export type StatusBadgeValue =
  | 'In Progress'
  | 'LaTeX Note'
  | 'Code'
  | 'Presentation'
  | 'Paper Reading'
  | 'Presented / In Preparation';

export interface PublicationEntry {
  id: string;
  venue: string;
  type: 'Poster Presentation' | 'Paper' | 'Talk';
  status: StatusBadgeValue;
  /** undefined fields render as Placeholder */
  title?: string;
  authors?: string[];
  abstract?: string;
  posterPdf?: string;
  relatedProject?: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  year: number;
  status?: StatusBadgeValue;
  pdfUrl?: string;
  links?: {
    github?: string;
    paper?: string;
    demo?: string;
  };
}

export interface ResearchData {
  publications: PublicationEntry[];
  projects: ResearchProject[];
}

export interface FoundationItem {
  label: string;
  status?: StatusBadgeValue;
}

export interface FoundationCard {
  id: string;
  title: string;
  items: FoundationItem[];
}

export type FoundationsData = FoundationCard[];

export interface WorkTopic {
  label: string;
}

export interface WorkCard {
  id: string;
  title: string;
  topics: WorkTopic[];
}

export type WorksData = WorkCard[];

export interface FooterData {
  siteName: string;
  tagline: string;
  contact: ContactLink[];
}
