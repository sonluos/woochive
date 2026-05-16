// Feature: woochive-personal-archive, Property 4: Every research item renders a card
/**
 * Validates: Requirements 3.2
 *
 * Property: For any ResearchData value, every entry in publications and projects
 * must produce a rendered card element. The count of rendered cards must equal
 * the total number of entries in the data.
 */
import * as fc from 'fast-check';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { ResearchData, ResearchProject, PublicationEntry } from '../types/archive';
import { ResearchCard } from '../components/ResearchCard';

const arbStatusBadge = fc.constantFrom(
  'In Progress' as const,
  'LaTeX Note' as const,
  'Code' as const,
  'Presentation' as const,
  'Paper Reading' as const,
  'Presented / In Preparation' as const
);

const arbResearchProject: fc.Arbitrary<ResearchProject> = fc.record({
  id: fc.uuid(),
  title: fc.string({ minLength: 1, maxLength: 60 }),
  description: fc.string({ minLength: 1, maxLength: 200 }),
  tags: fc.array(fc.string({ minLength: 1, maxLength: 20 }), { maxLength: 6 }),
  status: fc.option(arbStatusBadge, { nil: undefined }),
});

const arbPublicationEntry: fc.Arbitrary<PublicationEntry> = fc.record({
  id: fc.uuid(),
  venue: fc.string({ minLength: 1, maxLength: 40 }),
  type: fc.constantFrom('Poster Presentation' as const, 'Paper' as const, 'Talk' as const),
  status: arbStatusBadge,
  title: fc.option(fc.string({ minLength: 1 }), { nil: undefined }),
  authors: fc.option(fc.array(fc.string({ minLength: 1 }), { maxLength: 5 }), { nil: undefined }),
  abstract: fc.option(fc.string({ minLength: 1 }), { nil: undefined }),
  posterPdf: fc.option(fc.constant('https://example.com/poster.pdf'), { nil: undefined }),
  relatedProject: fc.option(fc.string({ minLength: 1 }), { nil: undefined }),
});

const arbResearchData: fc.Arbitrary<ResearchData> = fc.record({
  publications: fc.array(arbPublicationEntry, { maxLength: 5 }),
  projects: fc.array(arbResearchProject, { maxLength: 6 }),
});

test('rendered card count equals total entries in ResearchData', () => {
  fc.assert(
    fc.property(arbResearchData, (data) => {
      const totalEntries = data.publications.length + data.projects.length;
      const allItems = [...data.publications, ...data.projects];

      const { container, unmount } = render(
        <MemoryRouter>
          <div>
            {allItems.map((item) => (
              <ResearchCard key={item.id} item={item} />
            ))}
          </div>
        </MemoryRouter>
      );

      const cards = container.querySelectorAll('article.research-card');
      expect(cards).toHaveLength(totalEntries);
      unmount();
    }),
    { numRuns: 25 }
  );
});
