import type { TextHighlight } from '../types/archive';

/**
 * Renders text with highlighted phrases wrapped in styled <span> elements.
 *
 * Splits the input text at highlight boundaries and wraps matched phrases
 * in <span> elements with the appropriate CSS class (highlight--gray,
 * highlight--purple, or highlight--gradient).
 *
 * Edge cases:
 * - No highlights → returns plain text string
 * - Phrase not found in text → that highlight is skipped
 */
export function renderHighlightedText(
  text: string,
  highlights: TextHighlight[]
): React.ReactNode {
  if (highlights.length === 0) return text;

  // Sort highlights by their position in the text
  const sorted = [...highlights].sort(
    (a, b) => text.indexOf(a.phrase) - text.indexOf(b.phrase)
  );

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  sorted.forEach((h, i) => {
    const start = text.indexOf(h.phrase, lastIndex);
    if (start === -1) return; // phrase not found — skip

    if (start > lastIndex) {
      parts.push(text.slice(lastIndex, start));
    }

    parts.push(
      <span key={i} className={`highlight--${h.color}`}>
        {h.phrase}
      </span>
    );

    lastIndex = start + h.phrase.length;
  });

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}
