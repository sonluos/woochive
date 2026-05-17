# Implementation Plan: Woochive Personal Archive

## Overview

Build out the Woochive personal archive site on top of the existing React + TypeScript + Vite scaffold. Work proceeds in layers: types → data → shared components → page components → tests → wiring.

## Tasks

- [x] 1. Define TypeScript interfaces in `src/types/archive.ts`
  - Create all interfaces and types: `ContactLinkKind`, `ContactLink`, `IntroData`, `StatusBadgeValue`, `PublicationEntry`, `ResearchProject`, `ResearchData`, `FoundationItem`, `FoundationCard`, `FoundationsData`, `WorkTopic`, `WorkCard`, `WorksData`, `FooterData`
  - _Requirements: 11.2_

- [x] 2. Populate data files
  - [x] 2.1 Create `src/data/intro.ts` with `IntroData` constant
    - Title "Woochive", subtitle, bio, five keywords, four contact links (all `href` undefined initially)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_
  - [x] 2.2 Create `src/data/research.ts` with `ResearchData` constant
    - IPIU 2026 publication entry; four project entries with descriptions and tags per requirements
    - _Requirements: 4.1, 4.2, 4.3, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8_
  - [x] 2.3 Create `src/data/foundations.ts` with `FoundationsData` constant
    - Four cards: Mathematics, Computer Science & AI, Paper Reading, LaTeX Notes with items and statuses
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_
  - [x] 2.4 Create `src/data/works.ts` with `WorksData` constant
    - Four cards: Music, Writing, Concerts, MuFasho Mag with topics
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 3. Build shared UI components
  - [x] 3.1 Create `src/components/StatusBadge.tsx`
    - Accepts `StatusBadgeValue` prop; renders a styled `<span>` using `--accent` / `--accent-bg` tokens
    - _Requirements: 6.6, 4.3_
  - [x] 3.2 Create `src/components/Placeholder.tsx`
    - Accepts `label` and optional `kind` prop; renders a `<span>` (never `<a>`) with `--ink-muted` styling
    - _Requirements: 2.6, 4.4_
  - [x] 3.3 Create `src/components/TagList.tsx`
    - Accepts `tags: string[]`; renders pill `<span>` elements using `--accent-bg` and `--accent` tokens
    - _Requirements: 2.4, 5.2, 5.4, 5.6, 5.8_
  - [x] 3.4 Write property test for `Placeholder` (Property 3)
    - **Property 3: Placeholder for missing links**
    - **Validates: Requirements 2.6, 4.4**
    - File: `src/components/Placeholder.property.test.tsx`
    - Use `fast-check` with `numRuns: 100`; assert no `<a>` element is rendered when `href` is undefined

- [x] 4. Install fast-check dev dependency
  - Run `npm install --save-dev fast-check` before writing any property tests
  - _Requirements: (testing infrastructure)_

- [x] 5. Build card components
  - [x] 5.1 Create `src/components/ResearchCard.tsx`
    - Renders `ResearchProject` or `PublicationEntry`; uses `TagList`, `StatusBadge`, `Placeholder` as needed
    - _Requirements: 3.2, 4.1, 4.2, 4.3, 4.4, 5.1–5.8_
  - [x] 5.2 Create `src/components/FoundationCard.tsx`
    - Renders a `FoundationCard` data object; lists items with optional `StatusBadge` per item
    - _Requirements: 6.1–6.6_
  - [x] 5.3 Create `src/components/WorkCard.tsx`
    - Renders a `WorkCard` data object; lists topics
    - _Requirements: 7.1–7.5_

- [x] 6. Rewrite page components
  - [x] 6.1 Rewrite `src/pages/Home.tsx`
    - Import `introData`; render title, subtitle, bio, `TagList` for keywords, contact area using `Placeholder` for undefined hrefs
    - Use semantic `<main>` and `<section>` elements
    - _Requirements: 2.1–2.6, 10.4_
  - [x] 6.2 Write unit tests for Home page
    - File: `src/pages/Home.test.tsx`
    - Verify title "Woochive", subtitle text, bio text, all five keyword tags, four contact kinds present
    - _Requirements: 2.1–2.5_
  - [x] 6.3 Write property test for Home page (Property 2)
    - **Property 2: Keywords render as tags**
    - **Validates: Requirements 2.4**
    - File: `src/pages/Home.property.test.tsx`
    - Use `fast-check` with `numRuns: 100`; assert every keyword in arbitrary `IntroData` appears as a rendered tag
  - [x] 6.4 Rewrite `src/pages/Research.tsx`
    - Import `researchData`; render Publications & Presentations subsection and four project cards using `ResearchCard`
    - Apply visual prominence: `--paper-2` background, `--text-3xl` heading, `--sp-20` padding
    - Use semantic `<main>` and `<section>` elements
    - _Requirements: 3.1, 3.2, 3.3, 4.1–4.4, 5.1–5.8, 10.4_
  - [x] 6.5 Write unit tests for Research page
    - File: `src/pages/Research.test.tsx`
    - Verify five subsection headings, IPIU 2026 entry, "Presented / In Preparation" badge, all four project descriptions and tag sets
    - _Requirements: 3.3, 4.2, 4.3, 5.1–5.8_
  - [x] 6.6 Write property test for Research page (Property 4)
    - **Property 4: Every research item renders a card**
    - **Validates: Requirements 3.2**
    - File: `src/pages/Research.property.test.tsx`
    - Use `fast-check` with `numRuns: 100`; assert rendered card count equals total entries in arbitrary `ResearchData`
  - [x] 6.7 Rewrite `src/pages/Foundations.tsx`
    - Import `foundationsData`; render four `FoundationCard` components
    - Use semantic `<main>` and `<section>` elements
    - _Requirements: 6.1–6.6, 10.4_
  - [x] 6.8 Write unit tests for Foundations page
    - File: `src/pages/Foundations.test.tsx`
    - Verify four cards present and each card's item list matches requirements
    - _Requirements: 6.1–6.5_
  - [x] 6.9 Write property test for Foundations page (Property 5)
    - **Property 5: Status badge rendered when status is defined**
    - **Validates: Requirements 6.6**
    - File: `src/pages/Foundations.property.test.tsx`
    - Use `fast-check` with `numRuns: 100`; assert badge present iff `status` is defined on each `FoundationItem`
  - [x] 6.10 Rewrite `src/pages/Works.tsx`
    - Import `worksData`; render four `WorkCard` components
    - Use semantic `<main>` and `<section>` elements
    - _Requirements: 7.1–7.5, 10.4_
  - [x] 6.11 Write unit tests for Works page
    - File: `src/pages/Works.test.tsx`
    - Verify four cards (Music, Writing, Concerts, MuFasho Mag) and their topic lists
    - _Requirements: 7.1–7.5_

- [x] 7. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Update Navigation and Footer
  - [x] 8.1 Update `src/components/Navigation.tsx`
    - Ensure nav links are exactly: Intro (`/`), Research (`/research`), Foundations (`/foundations`), Works (`/works`)
    - Retain mobile burger menu and active-link highlighting
    - _Requirements: 1.1, 1.3, 1.4_
  - [x] 8.2 Write property test for Navigation (Property 1)
    - **Property 1: All nav links are present**
    - **Validates: Requirements 1.1**
    - File: `src/components/Navigation.property.test.tsx`
    - Use `fast-check` with `numRuns: 100`; assert exactly four links with correct labels on every render
  - [x] 8.3 Update `src/components/Footer.tsx`
    - Display site name "Woochive", tagline "Music, mathematics, research, and creative records.", `Placeholder` elements for Email and GitHub
    - _Requirements: 8.1, 8.2, 8.3_
  - [x] 8.4 Write unit tests for Footer
    - File: `src/components/Footer.test.tsx`
    - Verify "Woochive" site name, tagline text, Email and GitHub placeholders present
    - _Requirements: 8.1–8.3_

- [x] 9. Responsive layout styles
  - Add or update CSS so card grids are single-column below 768px and two-or-more columns at 768px and above
  - Use `%`, `rem`, or `vw` units; no fixed-width containers that cause horizontal overflow
  - _Requirements: 9.1, 9.2, 9.3_

- [x] 10. Accessibility and semantic HTML audit
  - Verify every page route renders `<nav>`, `<main>`, at least one `<section>`, and `<footer>`
  - Verify all interactive elements have visible focus indicators
  - Verify no layout-shifting animations are present
  - _Requirements: 10.2, 10.4, 10.5_
  - [x] 10.1 Write property test for semantic HTML structure (Property 7)
    - **Property 7: Semantic HTML structure on every page**
    - **Validates: Requirements 10.4**
    - File: `src/pages/semanticHtml.property.test.tsx`
    - Use `fast-check` with `numRuns: 100`; assert `<nav>`, `<main>`, `<section>`, `<footer>` present on each route render
  - [x] 10.2 Write property test for color contrast (Property 6)
    - **Property 6: Color contrast meets WCAG AA**
    - **Validates: Requirements 10.3**
    - File: `src/styles/contrast.property.test.ts`
    - Assert contrast ratio ≥ 4.5:1 for all token pairs: `--ink`/`--paper`, `--ink-soft`/`--paper`, `--ink`/`--paper-2`, `--ink`/`--paper-3` and dark-mode equivalents

- [x] 11. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use `fast-check` with `numRuns: 100` and must include the comment tag `// Feature: woochive-personal-archive, Property N: <text>`
- All components use existing CSS custom property tokens from `src/styles/variables.css` — no new tokens
- `src/types/portfolio.ts` is retained as-is; new content uses `src/types/archive.ts`
