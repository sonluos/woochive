// Feature: woochive-personal-archive, Property 2: Keywords render as tags
/**
 * Validates: Requirements 2.4
 *
 * Property: For any IntroData value, every string in the keywords array must
 * appear as a rendered tag element in the Home page output.
 */
import * as fc from 'fast-check';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { IntroData } from '../types/archive';

// We test the TagList component directly with arbitrary keyword arrays,
// since Home is wired to static introData. This validates the rendering
// contract: every keyword passed to TagList appears in the DOM.
import { TagList } from '../components/TagList';

test('every keyword in an arbitrary keywords array appears as a rendered tag', () => {
  fc.assert(
    fc.property(
      fc.array(
        fc.string({ minLength: 1, maxLength: 40 }).filter((s) => s.trim().length > 0),
        { minLength: 1, maxLength: 10 }
      ),
      (keywords) => {
        const { unmount } = render(
          <MemoryRouter>
            <TagList tags={keywords} />
          </MemoryRouter>
        );
        keywords.forEach((keyword) => {
          const matches = screen.getAllByText(keyword.trim());
          expect(matches.length).toBeGreaterThan(0);
        });
        unmount();
      }
    ),
    { numRuns: 25 }
  );
});
