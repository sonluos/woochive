# Design Document — Woochive Personal Archive

## Overview

Woochive is a static, single-page personal archive website for an undergraduate mathematics student. It presents four sections — Intro, Research, Foundations, and Works — in a minimal, academic aesthetic with a subtle music-inspired mood.

The site is already scaffolded as a React + TypeScript + Vite project with React Router, CSS custom properties, and an existing component library. The design builds on this foundation rather than replacing it. The primary goals are:

1. Align the four section pages with the exact content specified in requirements
2. Introduce a data-driven architecture so content lives in typed data files, not JSX
3. Make the Research section visually more prominent than Foundations and Works
4. Support placeholder rendering for unavailable links and PDFs
5. Ensure responsive layout and WCAG 2.1 AA accessibility

The site requires no backend. All data is static TypeScript constants.

---

## Architecture

The site uses a single-page application architecture with React Router for client-side routing between sections. Each section is a full-page route rendered under the shared `Navigation` header and `Footer`.

```
App
├── Navigation (persistent header, all viewports)
├── Routes
│   ├── /          → Home (Intro section)
│   ├── /research  → Research section
│   ├── /foundations → Foundations section
│   └── /works     → Works section
└── Footer
```

### Data Flow

Content is stored in typed data files under `src/data/`. Page components import data constants and render them — no prop drilling, no context, no API calls.

```
src/data/
  intro.ts          ← bio, keywords, contact links
  research.ts       ← publications, project cards
  foundations.ts    ← four foundation category cards
  works.ts          ← four works category cards

src/types/
  archive.ts        ← TypeScript interfaces for all data shapes
```

Page components are thin renderers: they import data and map over it. Adding a new card or item requires only a data file change.

### Routing Strategy

The existing multi-route setup (`/`, `/research`, `/foundations`, `/works`) is retained. The Nav links navigate between routes. Smooth scroll is not needed for cross-section navigation since each section is a full page; smooth scroll applies only to in-page anchor links if used within a section.

The requirements specify smooth scroll for Nav links. Since the site uses separate routes (not a single scrollable page), the Nav links will use React Router `<Link>` with the existing active-state highlighting. If the owner later wants a single-scroll layout, the data architecture supports it without changes.

---

## Visual Design System

The Woochive site inherits the existing color palette and typography system defined in `src/styles/variables.css`. No new color tokens are introduced — all components use the tokens already in place.

### Color Palette (light mode)

| Token | Value | Usage |
|---|---|---|
| `--paper` | `#fafaf8` | Page background |
| `--paper-2` | `#f3f2ef` | Section backgrounds, card fills |
| `--paper-3` | `#eceae5` | Subtle dividers, hover states |
| `--ink` | `#1a1a1a` | Headings, primary text |
| `--ink-soft` | `#4a4a4a` | Body text, descriptions |
| `--ink-muted` | `#8a8a8a` | Captions, metadata, placeholders |
| `--ink-faint` | `#c4c4c4` | Borders, disabled states |
| `--accent` | `#7c6fcd` | Links, active nav, tags, badges (muted violet) |
| `--accent-dim` | `#a99de0` | Hover states on accent elements |
| `--accent-bg` | `rgba(124,111,205,0.07)` | Tag pill backgrounds, card accent fills |
| `--border` | `#e2e0da` | Card borders, section dividers |

Dark mode equivalents are already defined in `variables.css` under `@media (prefers-color-scheme: dark)` and apply automatically.

### Typography

| Token | Value | Usage |
|---|---|---|
| `--font-sans` | Inter | UI text, nav, tags, badges |
| `--font-serif` | EB Garamond | Section headings, card titles |
| `--font-mono` | JetBrains Mono | Code snippets, status values |

### Research Section Visual Prominence

The Research section uses `--paper-2` as its background (vs `--paper` for other sections), a larger `--text-3xl` heading in `--font-serif`, and `--sp-20` vertical padding. Other sections use `--text-2xl` headings and `--sp-16` padding. This creates clear visual hierarchy without introducing new colors.

---

## Components and Interfaces

### Shared Components (existing, reused)

| Component | Role |
|---|---|
| `Navigation` | Persistent top nav, mobile burger menu, active link highlighting |
| `Footer` | Site name, contact placeholders, tagline |

### New / Revised Components

#### `StatusBadge`
Renders a colored label for a status value. Used in Research cards and Foundations items.

```
Props: { status: StatusBadgeValue }
StatusBadgeValue = 'In Progress' | 'LaTeX Note' | 'Code' | 'Presentation' | 'Paper Reading' | 'Presented / In Preparation'
```

#### `Placeholder`
Renders a visually distinct, non-navigating element for unavailable links. Prevents broken URLs.

```
Props: { label: string; kind?: 'link' | 'pdf' | 'email' }
```

Renders as a `<span>` with muted styling and a dash or lock icon. Never renders as `<a>` with an empty or `#` href.

#### `TagList`
Renders an array of string tags as pill spans. Used across Research, Foundations, and Intro.

```
Props: { tags: string[] }
```

#### `ResearchCard`
Renders a single research project or publication card. Accepts a `ResearchItem` and renders title, description, tags, status badge, and any links or placeholders.

#### `FoundationCard`
Renders one of the four foundation category cards (Mathematics, CS & AI, Paper Reading, LaTeX Notes). Lists items with optional status badges.

#### `WorkCard`
Renders one of the four works category cards (Music, Writing, Concerts, MuFasho Mag). Lists topics.

### Page Components

| Page | Route | Primary data source |
|---|---|---|
| `Home` | `/` | `src/data/intro.ts` |
| `Research` | `/research` | `src/data/research.ts` |
| `Foundations` | `/foundations` | `src/data/foundations.ts` |
| `Works` | `/works` | `src/data/works.ts` |

---

## Data Models

All interfaces live in `src/types/archive.ts`. The existing `src/types/portfolio.ts` is retained for backward compatibility but new archive content uses the types below.

### Contact Link

```typescript
export type ContactLinkKind = 'email' | 'github' | 'website' | 'cv';

export interface ContactLink {
  kind: ContactLinkKind;
  label: string;
  /** undefined = placeholder (not yet available) */
  href?: string;
}
```

### Intro Data

```typescript
export interface IntroData {
  title: string;
  subtitle: string;
  bio: string;
  keywords: string[];
  contact: ContactLink[];
}
```

### Status Badge

```typescript
export type StatusBadgeValue =
  | 'In Progress'
  | 'LaTeX Note'
  | 'Code'
  | 'Presentation'
  | 'Paper Reading'
  | 'Presented / In Preparation';
```

### Research

```typescript
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
  status?: StatusBadgeValue;
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
```

### Foundations

```typescript
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
```

### Works

```typescript
export interface WorkTopic {
  label: string;
}

export interface WorkCard {
  id: string;
  title: string;
  topics: WorkTopic[];
}

export type WorksData = WorkCard[];
```

### Footer

```typescript
export interface FooterData {
  siteName: string;
  tagline: string;
  contact: ContactLink[];
}
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: All nav links are present

*For any* render of the Navigation component, the output must contain exactly four links with the labels "Intro", "Research", "Foundations", and "Works" — no more, no fewer.

**Validates: Requirements 1.1**

---

### Property 2: Keywords render as tags

*For any* `IntroData` value, every string in the `keywords` array must appear as a rendered tag element in the Home page output.

**Validates: Requirements 2.4**

---

### Property 3: Placeholder for missing links

*For any* `ContactLink` or `PublicationEntry` link field where `href` is `undefined`, the rendered output must not contain an `<a>` element for that item — it must render as a non-navigating placeholder element instead.

**Validates: Requirements 2.6, 4.4**

---

### Property 4: Every research item renders a card

*For any* `ResearchData` value, every entry in `publications` and `projects` must produce a rendered card element in the Research page output. The count of rendered cards must equal the total number of entries in the data.

**Validates: Requirements 3.2**

---

### Property 5: Status badge rendered when status is defined

*For any* `FoundationItem` where `status` is defined, the rendered Foundations page must contain a `StatusBadge` element for that item. For any `FoundationItem` where `status` is `undefined`, no badge should be rendered for that item.

**Validates: Requirements 6.6**

---

### Property 6: Color contrast meets WCAG AA

*For any* foreground/background color token pair used for text rendering in the design system (`--ink` on `--paper`, `--ink-soft` on `--paper`, `--ink` on `--paper-2`, `--ink` on `--paper-3`, and their dark-mode equivalents), the computed contrast ratio must be at least 4.5:1.

**Validates: Requirements 10.3**

---

### Property 7: Semantic HTML structure on every page

*For any* rendered page route (`/`, `/research`, `/foundations`, `/works`), the output must contain a `<nav>` element, a `<main>` element, at least one `<section>` element, and a `<footer>` element.

**Validates: Requirements 10.4**

---

## Error Handling

Since the site is fully static with no network calls or user input, the error surface is narrow:

**Placeholder rendering** — The primary error-adjacent concern is rendering broken links. The `Placeholder` component is the single point of control: any `ContactLink` or publication link field with `href === undefined` must route through `Placeholder`, never through `<a href="">` or `<a href="#">`. This is enforced by the TypeScript type system (optional `href`) and validated by Property 3.

**Missing data fields** — TypeScript optional fields (`title?`, `authors?`, etc. on `PublicationEntry`) signal placeholder intent at compile time. Components must check for `undefined` before rendering content, falling back to `<Placeholder>`.

**React ErrorBoundary** — The existing `ErrorBoundary` component wraps the app. Any unexpected render error will be caught and displayed gracefully rather than crashing the page.

**404 route** — The existing `NotFound` page handles unknown routes.

No async data loading, no authentication, and no form submission means there are no network error states, loading states, or validation error states to handle.

---

## Testing Strategy

### Dual Testing Approach

Both unit/example tests and property-based tests are used. They are complementary:

- **Example tests** verify that specific required strings, elements, and structures appear in rendered output (the content requirements in sections 2–8).
- **Property tests** verify universal rules that must hold across all valid data inputs (Properties 1–7 above).

### Property-Based Testing

The project uses **Vitest** as the test runner (already configured). For property-based testing, use **fast-check** (`npm install --save-dev fast-check`), which integrates cleanly with Vitest and React Testing Library.

Each property test must run a minimum of **100 iterations** (fast-check default is 100; set `numRuns: 100` explicitly).

Each property test must include a comment tag in this format:
```
// Feature: woochive-personal-archive, Property N: <property text>
```

**Property test file locations:**

| Property | File |
|---|---|
| 1 — Nav links | `src/components/Navigation.property.test.tsx` |
| 2 — Keywords as tags | `src/pages/Home.property.test.tsx` |
| 3 — Placeholder for missing links | `src/components/Placeholder.property.test.tsx` |
| 4 — Every research item renders a card | `src/pages/Research.property.test.tsx` |
| 5 — Status badge when status defined | `src/pages/Foundations.property.test.tsx` |
| 6 — Color contrast | `src/styles/contrast.property.test.ts` |
| 7 — Semantic HTML on every page | `src/pages/semanticHtml.property.test.tsx` |

**Example of a property test (Property 3):**

```typescript
// Feature: woochive-personal-archive, Property 3: Placeholder for missing links
import * as fc from 'fast-check';
import { render, screen } from '@testing-library/react';
import { ContactLink } from '../types/archive';
import ContactArea from './ContactArea';

test('contact links with no href render as placeholders, not anchors', () => {
  fc.assert(
    fc.property(
      fc.array(
        fc.record({
          kind: fc.constantFrom('email', 'github', 'website', 'cv'),
          label: fc.string({ minLength: 1 }),
          href: fc.option(fc.webUrl(), { nil: undefined }),
        }) as fc.Arbitrary<ContactLink>,
        { minLength: 1, maxLength: 8 }
      ),
      (links) => {
        const { container } = render(<ContactArea links={links} />);
        links.forEach(link => {
          if (link.href === undefined) {
            // Must not render as a navigable anchor
            const anchors = Array.from(container.querySelectorAll('a'));
            const hasAnchor = anchors.some(a => a.textContent?.includes(link.label));
            expect(hasAnchor).toBe(false);
          }
        });
      }
    ),
    { numRuns: 100 }
  );
});
```

### Unit / Example Tests

Example tests verify the specific content requirements. They use Vitest + React Testing Library.

**Key example test areas:**

- `Home.test.tsx` — verifies title "Woochive", subtitle, bio text, all five keyword tags, four contact kinds present
- `Research.test.tsx` — verifies five subsection headings, IPIU 2026 entry, "Presented / In Preparation" badge, all four project descriptions and tag sets
- `Foundations.test.tsx` — verifies four cards present, each card's item list matches requirements
- `Works.test.tsx` — verifies four cards (Music, Writing, Concerts, MuFasho Mag) and their topic lists
- `Footer.test.tsx` — verifies "Woochive" site name, tagline, Email and GitHub placeholders

**Unit testing balance:** Example tests cover specific content. Avoid duplicating coverage already handled by property tests (e.g., do not write a separate unit test for "every keyword renders as a tag" — that is Property 2's job).

### Accessibility Testing

WCAG AA color contrast is covered by Property 6. Manual testing with a screen reader is required to fully validate semantic HTML navigation and focus management — automated tests cover structure but not assistive technology behavior.
