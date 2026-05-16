// Feature: woochive-personal-archive, Property 3: Placeholder for missing links
/**
 * Validates: Requirements 2.6, 4.4
 *
 * Property: For any label string and optional kind value, the Placeholder
 * component must never render an <a> element — it always renders as a
 * non-navigating <span>, ensuring no broken URLs are produced for missing links.
 */
import * as fc from 'fast-check';
import { render } from '@testing-library/react';
import { Placeholder } from './Placeholder';

test('Placeholder never renders an <a> element for any label or kind', () => {
  fc.assert(
    fc.property(
      fc.string({ minLength: 1, maxLength: 100 }),
      fc.option(fc.constantFrom('link' as const, 'pdf' as const, 'email' as const), { nil: undefined }),
      (label, kind) => {
        const { container } = render(<Placeholder label={label} kind={kind} />);
        const anchors = container.querySelectorAll('a');
        expect(anchors).toHaveLength(0);
      }
    ),
    { numRuns: 20 }
  );
});
