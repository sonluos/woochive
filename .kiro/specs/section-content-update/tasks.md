# Implementation Plan: Section Content Update

## Overview

Refactor the Woochive Intro page to use a new content structure with gradient-styled title, highlighted subtitle/bio phrases, an InfoCard component, and removal of the keyword tags section. Implementation uses React + TypeScript with Vitest for testing.

## Tasks

- [x] 1. Update type definitions and data model
  - [x] 1.1 Add new type definitions to `src/types/archive.ts`
    - Add `HighlightColor` type (`'gray' | 'purple' | 'gradient'`)
    - Add `TextHighlight` interface (`{ phrase: string; color: HighlightColor }`)
    - Add `BioLine` interface (`{ text: string; highlights: TextHighlight[] }`)
    - Add `InfoCardData` interface (`{ affiliation: string; email: string; links: Array<{ label: string; href: string }> }`)
    - Update `IntroData` interface: change `bio` from `string` to `BioLine[]`, replace `keywords` and `contact` with `infoCard: InfoCardData`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 4.1, 4.3, 4.4, 4.5_

  - [x] 1.2 Update intro data file `src/data/intro.ts`
    - Restructure `introData` to match new `IntroData` interface
    - Add `bio` array with 3 `BioLine` entries and their highlight annotations
    - Add `infoCard` object with affiliation, email, and links (GitHub, LinkedIn)
    - Remove `keywords` array and `contact` array
    - _Requirements: 3.2, 3.3, 3.4, 4.3, 4.4, 4.5, 4.7, 4.8_

- [x] 2. Implement CSS utilities and variables
  - [x] 2.1 Add CSS variable and highlight utility classes
    - Add `--gradient-title: linear-gradient(90deg, #717E87 0%, #D57FF4 100%)` to `src/styles/variables.css`
    - Add `.highlight--gray`, `.highlight--purple`, `.highlight--gradient` utility classes to `src/pages/Home.css`
    - Update `.intro__title` to use `--gradient-title` (90deg, 5:5 ratio) instead of `--gradient-brand` (135deg)
    - _Requirements: 1.1, 1.2, 1.3, 2.3, 2.4, 3.2, 3.3, 3.4_

  - [x] 2.2 Add InfoCard styles to `src/pages/Home.css`
    - Add `.info-card` styles with `paper-2` background, `border-soft` border, and appropriate padding
    - Add `.info-card__affiliation`, `.info-card__email`, `.info-card__links` styles
    - Add `.info-card__link` styles for external links
    - _Requirements: 4.1, 4.2_

- [x] 3. Implement renderHighlightedText utility
  - [x] 3.1 Create `src/utils/renderHighlightedText.tsx`
    - Implement `renderHighlightedText(text: string, highlights: TextHighlight[]): React.ReactNode`
    - Sort highlights by position in text
    - Split text at highlight boundaries, wrap matched phrases in `<span>` with appropriate CSS class
    - Handle edge cases: no highlights returns plain text, phrase not found is skipped
    - _Requirements: 2.2, 2.3, 2.4, 2.5, 3.2, 3.3, 3.4, 3.5_

  - [ ]* 3.2 Write property test for renderHighlightedText
    - **Property 1: Highlighted text rendering preserves full content**
    - **Validates: Requirements 2.1, 3.1, 3.2, 3.3, 3.4**
    - For any text and any set of highlight annotations, the rendered output contains all characters from the original text in their original order

- [x] 4. Create InfoCard component
  - [x] 4.1 Create `src/components/InfoCard.tsx`
    - Accept `InfoCardData` props (affiliation, email, links)
    - Render affiliation as first line
    - Render email as plain text on second line
    - Render links as clickable anchors with `target="_blank"` and `rel="noopener noreferrer"`
    - _Requirements: 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9_

- [x] 5. Refactor Home.tsx page
  - [x] 5.1 Update `src/pages/Home.tsx` with new layout
    - Import `renderHighlightedText` utility and `InfoCard` component
    - Update title section to use `--gradient-title` class
    - Render subtitle with highlighted phrases using `renderHighlightedText`
    - Render bio block as 3 lines with highlights using `renderHighlightedText`
    - Add `InfoCard` section below bio block
    - Remove `TagList` import and "Research Keywords" section
    - Remove old contact section
    - Ensure vertical order: title → subtitle → bio → info card
    - _Requirements: 1.1, 1.3, 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 5.1, 5.2, 5.3, 6.1, 6.2_

  - [x] 5.2 Update `src/pages/Home.css` for responsive layout
    - Add bio block styles (`.intro__bio` with line breaks, font-family sans-serif)
    - Add responsive breakpoint at 768px for spacing and font size adjustments
    - Clean up unused CSS rules (`.intro__keywords`, old `.intro__contact-row`, `.intro__contact-link`)
    - _Requirements: 6.3, 6.4, 3.6_

- [x] 6. Checkpoint - Ensure build passes
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Write unit tests
  - [ ]* 7.1 Write unit tests for renderHighlightedText utility
    - Test correct splitting and class application for gray, purple, gradient highlights
    - Test no highlights returns plain text
    - Test phrase not found is skipped gracefully
    - Test multiple highlights in one string
    - _Requirements: 2.2, 2.3, 2.4, 3.2, 3.3, 3.4_

  - [ ]* 7.2 Write unit tests for InfoCard component
    - Test affiliation text is rendered
    - Test email is rendered as plain text (not a link)
    - Test GitHub link has correct href, target="_blank", rel="noopener noreferrer"
    - Test LinkedIn link has correct href, target="_blank", rel="noopener noreferrer"
    - _Requirements: 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9_

  - [ ]* 7.3 Write unit tests for Home page integration
    - Test title "Woochive" is rendered with gradient class
    - Test subtitle contains full expected text
    - Test highlighted phrases have correct CSS classes
    - Test bio block renders 3 lines with correct highlights
    - Test no "Research Keywords" heading in DOM
    - Test no TagList component rendered
    - Test DOM order: title → subtitle → bio → info card
    - _Requirements: 1.1, 1.3, 2.1, 5.1, 5.2, 5.3, 6.1_

- [x] 8. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property test validates the universal correctness property from the design document
- Unit tests validate specific examples and edge cases
- The project uses Vitest + @testing-library/react + fast-check (all already configured)
- CSS variables and utility classes follow existing project conventions in `src/styles/variables.css`

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "2.1"] },
    { "id": 2, "tasks": ["2.2", "3.1"] },
    { "id": 3, "tasks": ["3.2", "4.1"] },
    { "id": 4, "tasks": ["5.1"] },
    { "id": 5, "tasks": ["5.2"] },
    { "id": 6, "tasks": ["7.1", "7.2", "7.3"] }
  ]
}
```
