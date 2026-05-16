// Feature: woochive-personal-archive, Property 6: Color contrast meets WCAG AA
import { describe, test, expect } from 'vitest';
import * as fc from 'fast-check';

/**
 * WCAG 2.1 relative luminance calculation.
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
function hexToRgb(hex: string): [number, number, number] {
  const cleaned = hex.replace('#', '');
  const r = parseInt(cleaned.slice(0, 2), 16) / 255;
  const g = parseInt(cleaned.slice(2, 4), 16) / 255;
  const b = parseInt(cleaned.slice(4, 6), 16) / 255;
  return [r, g, b];
}

function linearize(channel: number): number {
  return channel <= 0.03928
    ? channel / 12.92
    : Math.pow((channel + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

function contrastRatio(fg: string, bg: string): number {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Light mode color tokens from src/styles/variables.css
const lightTokens = {
  '--ink': '#1a1a1a',
  '--ink-soft': '#4a4a4a',
  '--paper': '#fafaf8',
  '--paper-2': '#f3f2ef',
  '--paper-3': '#eceae5',
};

// Dark mode color tokens from src/styles/variables.css
const darkTokens = {
  '--ink': '#f0ede8',
  '--ink-soft': '#c8c4bc',
  '--paper': '#141412',
  '--paper-2': '#1e1d1a',
  '--paper-3': '#272520',
};

// Token pairs that must meet WCAG AA contrast (4.5:1)
const tokenPairs: Array<{ fg: string; bg: string; label: string }> = [
  // Light mode pairs
  { fg: lightTokens['--ink'], bg: lightTokens['--paper'], label: 'light: --ink / --paper' },
  { fg: lightTokens['--ink-soft'], bg: lightTokens['--paper'], label: 'light: --ink-soft / --paper' },
  { fg: lightTokens['--ink'], bg: lightTokens['--paper-2'], label: 'light: --ink / --paper-2' },
  { fg: lightTokens['--ink'], bg: lightTokens['--paper-3'], label: 'light: --ink / --paper-3' },
  // Dark mode pairs
  { fg: darkTokens['--ink'], bg: darkTokens['--paper'], label: 'dark: --ink / --paper' },
  { fg: darkTokens['--ink-soft'], bg: darkTokens['--paper'], label: 'dark: --ink-soft / --paper' },
  { fg: darkTokens['--ink'], bg: darkTokens['--paper-2'], label: 'dark: --ink / --paper-2' },
  { fg: darkTokens['--ink'], bg: darkTokens['--paper-3'], label: 'dark: --ink / --paper-3' },
];

const WCAG_AA_MIN_CONTRAST = 4.5;

describe('Property 6: Color contrast meets WCAG AA', () => {
  test('all foreground/background token pairs have contrast ratio ≥ 4.5:1', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...tokenPairs),
        (pair) => {
          const ratio = contrastRatio(pair.fg, pair.bg);
          expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_MIN_CONTRAST);
        }
      ),
      { numRuns: 100 }
    );
  });
});
