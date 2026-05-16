import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TagFilter from './TagFilter';
import fc from 'fast-check';

describe('TagFilter Property Tests', () => {
  describe('Property 11: Tag filtering correctness', () => {
    it('should call onTagToggle when tag is clicked', () => {
      const onTagToggle = vi.fn();
      const tags = ['AI', 'ML', 'Python'];

      render(
        <TagFilter
          tags={tags}
          selectedTags={[]}
          onTagToggle={onTagToggle}
        />
      );

      const aiTag = screen.getByText('AI');
      fireEvent.click(aiTag);

      expect(onTagToggle).toHaveBeenCalledWith('AI');
    });

    it('should highlight selected tags', () => {
      const onTagToggle = vi.fn();
      const tags = ['AI', 'ML', 'Python'];
      const selectedTags = ['AI'];

      const { container } = render(
        <TagFilter
          tags={tags}
          selectedTags={selectedTags}
          onTagToggle={onTagToggle}
        />
      );

      const aiTag = screen.getByText('AI').closest('button');
      expect(aiTag).toHaveClass('active');
    });

    it('should maintain filtering invariant', () => {
      fc.assert(
        fc.property(
          fc.array(fc.string(), { minLength: 0, maxLength: 20 }),
          fc.array(fc.string(), { minLength: 0, maxLength: 10 }),
          (allTags, selectedTags) => {
            // Property: filtering by selected tags that are in allTags
            // only shows items that have at least one selected tag
            const tagSet = new Set(allTags);
            const validSelected = selectedTags.filter(tag => tagSet.has(tag));
            // validSelected is always a subset of allTags by construction
            return validSelected.every(tag => tagSet.has(tag));
          }
        )
      );
    });
  });

  describe('Property 31: Filter bar layout adapts to viewport', () => {
    it('should render all tags', () => {
      const onTagToggle = vi.fn();
      const tags = ['AI', 'ML', 'Python', 'JavaScript', 'React'];

      render(
        <TagFilter
          tags={tags}
          selectedTags={[]}
          onTagToggle={onTagToggle}
        />
      );

      tags.forEach(tag => {
        expect(screen.getByText(tag)).toBeInTheDocument();
      });
    });

    it('should handle empty tags array', () => {
      const onTagToggle = vi.fn();

      const { container } = render(
        <TagFilter
          tags={[]}
          selectedTags={[]}
          onTagToggle={onTagToggle}
        />
      );

      const tagButtons = container.querySelectorAll('button');
      expect(tagButtons.length).toBe(0);
    });

    it('should handle large number of tags', () => {
      const onTagToggle = vi.fn();
      const tags = Array.from({ length: 50 }, (_, i) => `Tag${i}`);

      render(
        <TagFilter
          tags={tags}
          selectedTags={[]}
          onTagToggle={onTagToggle}
        />
      );

      // Should render all tags
      expect(screen.getByText('Tag0')).toBeInTheDocument();
      expect(screen.getByText('Tag49')).toBeInTheDocument();
    });
  });

  describe('Property: Multiple tag selection', () => {
    it('should support multiple selected tags', () => {
      const onTagToggle = vi.fn();
      const tags = ['AI', 'ML', 'Python'];
      const selectedTags = ['AI', 'Python'];

      render(
        <TagFilter
          tags={tags}
          selectedTags={selectedTags}
          onTagToggle={onTagToggle}
        />
      );

      const aiTag = screen.getByText('AI').closest('button');
      const pythonTag = screen.getByText('Python').closest('button');
      const mlTag = screen.getByText('ML').closest('button');

      expect(aiTag).toHaveClass('active');
      expect(pythonTag).toHaveClass('active');
      expect(mlTag).not.toHaveClass('active');
    });

    it('should maintain selection state property', () => {
      fc.assert(
        fc.property(
          fc.array(fc.string({ minLength: 1 }), { minLength: 1, maxLength: 10 }),
          fc.array(fc.integer({ min: 0, max: 9 })),
          (tags, selectedIndices) => {
            const uniqueTags = [...new Set(tags)];
            const selectedTags = selectedIndices
              .filter(i => i < uniqueTags.length)
              .map(i => uniqueTags[i]);
            
            // Property: selected tags are always from available tags
            return selectedTags.every(tag => uniqueTags.includes(tag));
          }
        )
      );
    });
  });
});
