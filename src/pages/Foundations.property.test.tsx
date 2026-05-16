// Feature: woochive-personal-archive, Property 5: Status badge rendered when status is defined
/**
 * Validates: Requirements 6.6
 *
 * Property: For any FoundationItem where status is defined, the rendered output
 * must contain a StatusBadge element for that item. For any FoundationItem where
 * status is undefined, no badge should be rendered for that item.
 */
import * as fc from 'fast-check';
import { render } from '@testing-library/react';
import type { FoundationCard as FoundationCardData, FoundationItem } from '../types/archive';
import { FoundationCard } from '../components/FoundationCard';

const arbStatusBadge = fc.constantFrom(
  'In Progress' as const,
  'LaTeX Note' as const,
  'Code' as const,
  'Presentation' as const,
  'Paper Reading' as const,
  'Presented / In Preparation' as const
);

const arbFoundationItem: fc.Arbitrary<FoundationItem> = fc.record({
  label: fc.string({ minLength: 1, maxLength: 50 }),
  status: fc.option(arbStatusBadge, { nil: undefined }),
});

const arbFoundationCard: fc.Arbitrary<FoundationCardData> = fc.record({
  id: fc.uuid(),
  title: fc.string({ minLength: 1, maxLength: 40 }),
  items: fc.array(arbFoundationItem, { minLength: 1, maxLength: 8 }),
});

test('status badge is present iff status is defined on each FoundationItem', () => {
  fc.assert(
    fc.property(arbFoundationCard, (card) => {
      const { container, unmount } = render(<FoundationCard card={card} />);

      const listItems = container.querySelectorAll('.foundation-card__item');
      expect(listItems).toHaveLength(card.items.length);

      card.items.forEach((item, index) => {
        const li = listItems[index];
        const badge = li.querySelector('.status-badge');
        if (item.status !== undefined) {
          expect(badge).not.toBeNull();
          expect(badge!.textContent).toBe(item.status);
        } else {
          expect(badge).toBeNull();
        }
      });

      unmount();
    }),
    { numRuns: 25 }
  );
});
