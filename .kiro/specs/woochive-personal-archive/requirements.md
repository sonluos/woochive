# Requirements Document

## Introduction

Woochive is a personal archive website for an undergraduate mathematics student focused on Music Information Retrieval, Topological Data Analysis, and creative works. The site is a static, single-page portfolio with four main sections: Intro, Research, Foundations, and Works. It is built with React + TypeScript + Vite, requires no backend, and is designed to be minimal, responsive, and easy to expand.

## Glossary

- **Site**: The Woochive personal archive website
- **Section**: A major navigable area of the Site (Intro, Research, Foundations, Works)
- **Card**: A self-contained UI component displaying a single project, topic, or item
- **Nav**: The top-level navigation bar linking to each Section
- **Status_Badge**: A visual label indicating the state of a card item (e.g., In Progress, LaTeX Note, Code, Presentation, Paper Reading)
- **Placeholder**: A UI element that reserves space for content not yet available (e.g., PDF links, external URLs)
- **Smooth_Scroll**: Browser-native or JS-assisted scrolling that animates between anchor targets
- **Viewport**: The visible area of the browser window

---

## Requirements

### Requirement 1: Site Navigation

**User Story:** As a visitor, I want a persistent navigation bar, so that I can jump to any section from anywhere on the page.

#### Acceptance Criteria

1. THE Nav SHALL display links for Intro, Research, Foundations, and Works.
2. WHEN a visitor clicks a Nav link, THE Site SHALL scroll to the corresponding Section using Smooth_Scroll.
3. WHILE a visitor scrolls the page, THE Nav SHALL remain visible at the top of the Viewport.
4. WHEN the Viewport width is less than 768px, THE Nav SHALL collapse into a mobile-friendly menu.

---

### Requirement 2: Intro Section

**User Story:** As a visitor, I want to see a clear introduction, so that I can quickly understand who maintains this archive and what it covers.

#### Acceptance Criteria

1. THE Intro Section SHALL display the title "Woochive".
2. THE Intro Section SHALL display the subtitle "A personal archive for music data research, mathematical foundations, and creative works."
3. THE Intro Section SHALL display the bio: "I am an undergraduate mathematics student interested in Music Information Retrieval, recommendation systems, Topological Data Analysis, and mathematical approaches to music/audio data."
4. THE Intro Section SHALL display the following research keywords as visual tags: Music Information Retrieval, Recommendation Systems, Topological Data Analysis, Music & Audio Computing, Creative Computing.
5. THE Intro Section SHALL display a contact area containing placeholders for Email, GitHub, Website, and CV/Profile PDF.
6. IF a contact link target is not yet available, THEN THE Site SHALL render the contact item as a visible Placeholder that does not navigate to a broken URL.

---

### Requirement 3: Research Section — Layout and Prominence

**User Story:** As a visitor, I want the Research section to be visually prominent, so that it is clearly the main focus of the archive.

#### Acceptance Criteria

1. THE Research Section SHALL be rendered with greater visual weight than the Foundations and Works Sections (e.g., larger heading, more spacing, or a distinct background treatment).
2. THE Research Section SHALL display each research item as a Card.
3. THE Research Section SHALL contain the following subsections: Publications & Presentations, MIR Recommendation System, MIR with TDA, Bone Suppression & Anisotropic Diffusion, Diffusion Education Program.

---

### Requirement 4: Research Section — Publications & Presentations Card

**User Story:** As a visitor, I want to see publication and presentation records, so that I can review the author's academic output.

#### Acceptance Criteria

1. THE Publications Card SHALL display a title Placeholder, authors Placeholder, abstract Placeholder, poster PDF Placeholder, and related project Placeholder.
2. THE Publications Card SHALL display the entry "IPIU 2026 Poster Presentation" with type "Poster Presentation".
3. THE Publications Card SHALL display a Status_Badge with value "Presented / In Preparation".
4. IF a PDF or external link is not yet available, THEN THE Publications Card SHALL render the link as a disabled or visually distinct Placeholder.

---

### Requirement 5: Research Section — Project Cards

**User Story:** As a visitor, I want to read about each research project, so that I can understand the scope and methods used.

#### Acceptance Criteria

1. THE MIR Recommendation System Card SHALL display the description: "A research project analyzing hip-hop album data using Apple Music / Spotify metadata and audio features to design a similarity-based recommendation system."
2. THE MIR Recommendation System Card SHALL display the tags: MIR, Recommendation System, Clustering, MATLAB, Music Data.
3. THE MIR with TDA Card SHALL display the description: "A project exploring how Topological Data Analysis can be applied to music data and how it compares with traditional DSP-based music feature analysis."
4. THE MIR with TDA Card SHALL display the tags: TDA, Music Structure, Topology, MIR, S-Curt.
5. THE Bone Suppression Card SHALL display the description: "A study on anisotropic diffusion, EED/CED, and non-deep-learning image processing approaches for structure-preserving medical image preprocessing."
6. THE Bone Suppression Card SHALL display the tags: Image Processing, Diffusion, EED, CED, CXR.
7. THE Diffusion Education Card SHALL display the description: "An educational project explaining AI and diffusion models through functional thinking, visualization, and simple mathematical intuition."
8. THE Diffusion Education Card SHALL display the tags: AI Education, Diffusion, Visualization, Function.

---

### Requirement 6: Foundations Section

**User Story:** As a visitor, I want to browse the academic foundations behind the research, so that I can understand the theoretical background.

#### Acceptance Criteria

1. THE Foundations Section SHALL display four Cards: Mathematics, Computer Science & AI, Paper Reading, and LaTeX Notes.
2. THE Mathematics Card SHALL list: Real Analysis, Topology I, Algebra I, Numerical Analysis, Linear Algebra, Differential Equations.
3. THE Computer Science & AI Card SHALL list: Data Science, Artificial Intelligence, Neural Network from Scratch, MATLAB / Python Notes.
4. THE Paper Reading Card SHALL list: Anisotropic Diffusion in ITK, MIR papers, TDA papers, Music and Audio Computing papers.
5. THE LaTeX Notes Card SHALL list: Overleaf notes, Research summaries, Mathematical derivations, Presentation notes.
6. WHEN a Foundations item has an associated status, THE Site SHALL render a Status_Badge on that item with one of the values: In Progress, LaTeX Note, Code, Presentation, Paper Reading.

---

### Requirement 7: Works Section

**User Story:** As a visitor, I want to explore creative works and music records, so that I can see the non-research side of the archive.

#### Acceptance Criteria

1. THE Works Section SHALL display four Cards: Music, Writing, Concerts, and MuFasho Mag.
2. THE Music Card SHALL list the topics: Beat making, Lyrics, Songwriting, Guitar, Drum pad practice, AI-assisted music experiments.
3. THE Writing Card SHALL list the topics: Music reviews, Essays, Modern music presentation, Music & Artist presentation.
4. THE Concerts Card SHALL list the topics: Concert photos, Videos, Short reflections.
5. THE MuFasho Mag Card SHALL list the topics: Music, Fashion, Editorial ideas.

---

### Requirement 8: Footer

**User Story:** As a visitor, I want a footer with contact and identity information, so that I can find the author's links without scrolling back to the top.

#### Acceptance Criteria

1. THE Footer SHALL display the site name "Woochive".
2. THE Footer SHALL display Placeholder links for Email and GitHub.
3. THE Footer SHALL display the tagline: "Music, mathematics, research, and creative records."

---

### Requirement 9: Responsive Design

**User Story:** As a visitor on a mobile device, I want the layout to adapt to my screen size, so that the site is readable and usable without horizontal scrolling.

#### Acceptance Criteria

1. WHEN the Viewport width is less than 768px, THE Site SHALL render all Card grids as single-column layouts.
2. WHEN the Viewport width is 768px or greater, THE Site SHALL render Card grids with two or more columns.
3. THE Site SHALL use relative or fluid units (%, rem, vw) for layout widths so that no horizontal overflow occurs at any Viewport width from 320px to 1920px.

---

### Requirement 10: Visual Design and Accessibility

**User Story:** As a visitor, I want a clean, readable, and accessible interface, so that I can focus on the content without distraction.

#### Acceptance Criteria

1. THE Site SHALL use a minimal color palette with soft spacing and clear typographic hierarchy.
2. THE Site SHALL NOT use animations that cause layout shifts or distract from content reading.
3. THE Site SHALL apply sufficient color contrast between text and background to meet WCAG 2.1 AA contrast ratio requirements (minimum 4.5:1 for normal text).
4. THE Site SHALL use semantic HTML elements (nav, main, section, footer, h1–h3, article) to support screen reader navigation.
5. THE Site SHALL render all interactive elements (links, buttons) with visible focus indicators.

---

### Requirement 11: Expandability

**User Story:** As the site owner, I want the codebase to be organized so that I can add new cards or sections later without restructuring the project.

#### Acceptance Criteria

1. THE Site SHALL store section content in dedicated data files or typed constants separate from rendering components, so that adding a new Card requires only a data change.
2. THE Site SHALL define TypeScript interfaces for Card data shapes so that new entries are type-checked at compile time.
