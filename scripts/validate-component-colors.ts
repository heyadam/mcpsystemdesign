#!/usr/bin/env tsx

/**
 * Validates that component examples in components.ts use semantic color tokens
 * instead of raw Tailwind color classes like bg-gray-500, text-red-600, etc.
 * This ensures design system consistency across all component documentation.
 */

import { components } from '../lib/design-system/components.js';

interface Violation {
  component: string;
  example: string;
  className: string;
  suggestion: string;
}

// Raw Tailwind colors that should NOT be used in component examples
const DISALLOWED_PATTERNS = [
  // Gray scale (should use surface/text/border tokens)
  /\b(bg|text|border|ring|shadow|divide)-(gray|slate|zinc|neutral|stone)-\d+/,

  // State colors (should use semantic tokens)
  /\b(bg|text|border|ring)-(red|rose|pink)-\d+/,
  /\b(bg|text|border|ring)-(green|emerald|teal)-\d+/,
  /\b(bg|text|border|ring)-(amber|yellow|orange)-\d+/,
  /\b(bg|text|border|ring)-(blue|sky|cyan|indigo)-\d+/,

  // Opacity variants
  /\b(bg|text|border|ring)-(gray|red|green|blue|emerald|amber|slate|zinc)-\d+\/\d+/,
];

// Patterns that are intentionally allowed (exceptions)
const EXCEPTION_PATTERNS = [
  // Avatar gradient backgrounds (design feature)
  /\bfrom-(purple|pink|blue|cyan|teal|indigo|violet)-\d+/,
  /\bto-(purple|pink|blue|cyan|teal|indigo|violet)-\d+/,
  /\bvia-(purple|pink|blue|cyan|teal|indigo|violet)-\d+/,

  // Purple for code/type highlighting
  /\b(text|bg)-purple-\d+/,

  // Focus rings (accessibility)
  /\bfocus:ring-(blue|primary)-\d+/,
  /\bfocus-visible:ring-(blue|primary)-\d+/,

  // Code block styling (intentionally dark/specific theme)
  /\bbg-gray-950\b/,
  /\bborder-gray-800\b/,
  /\btext-gray-(300|500)\b/,

  // Dark mode shadows
  /\bdark:hover:shadow-gray-900\/\d+/,

  // Neutral indicator dots (no semantic equivalent for neutral/inactive state)
  /\bbg-gray-400\b/,
];

// Map raw color patterns to semantic token suggestions
const SUGGESTIONS: Record<string, string> = {
  'bg-gray-': 'bg-surface, bg-surface-raised, bg-surface-sunken, or bg-surface-hover',
  'bg-slate-': 'bg-surface, bg-surface-raised, bg-surface-sunken, or bg-surface-hover',
  'bg-zinc-': 'bg-surface, bg-surface-raised, bg-surface-sunken, or bg-surface-hover',
  'text-gray-': 'text-default, text-muted, or text-subtle',
  'text-slate-': 'text-default, text-muted, or text-subtle',
  'text-zinc-': 'text-default, text-muted, or text-subtle',
  'border-gray-': 'border-default, border-muted, or border-emphasis',
  'border-slate-': 'border-default, border-muted, or border-emphasis',
  'border-zinc-': 'border-default, border-muted, or border-emphasis',
  'divide-gray-': 'divide-default',
  'ring-gray-': 'ring-default or ring-primary',
  'bg-red-': 'bg-error or bg-error-emphasis',
  'bg-rose-': 'bg-error or bg-error-emphasis',
  'text-red-': 'text-error-foreground or text-error-emphasis',
  'text-rose-': 'text-error-foreground or text-error-emphasis',
  'border-red-': 'border-error-border',
  'border-rose-': 'border-error-border',
  'bg-green-': 'bg-success or bg-success-emphasis',
  'bg-emerald-': 'bg-success or bg-success-emphasis',
  'bg-teal-': 'bg-success or bg-success-emphasis',
  'text-green-': 'text-success-foreground or text-success-emphasis',
  'text-emerald-': 'text-success-foreground or text-success-emphasis',
  'text-teal-': 'text-success-foreground or text-success-emphasis',
  'border-green-': 'border-success-border',
  'border-emerald-': 'border-success-border',
  'bg-amber-': 'bg-warning or bg-warning-emphasis',
  'bg-yellow-': 'bg-warning or bg-warning-emphasis',
  'bg-orange-': 'bg-warning or bg-warning-emphasis',
  'text-amber-': 'text-warning-foreground or text-warning-emphasis',
  'text-yellow-': 'text-warning-foreground or text-warning-emphasis',
  'text-orange-': 'text-warning-foreground or text-warning-emphasis',
  'border-amber-': 'border-warning-border',
  'border-yellow-': 'border-warning-border',
  'bg-blue-': 'bg-info, bg-info-emphasis, or bg-primary',
  'bg-sky-': 'bg-info or bg-info-emphasis',
  'bg-cyan-': 'bg-info or bg-info-emphasis',
  'bg-indigo-': 'bg-primary or bg-info',
  'text-blue-': 'text-info-foreground, text-info-emphasis, or text-primary',
  'text-sky-': 'text-info-foreground or text-info-emphasis',
  'text-cyan-': 'text-info-foreground or text-info-emphasis',
  'text-indigo-': 'text-primary or text-info-foreground',
  'border-blue-': 'border-info-border or border-primary',
  'border-sky-': 'border-info-border',
  'border-indigo-': 'border-primary or border-info-border',
};

function extractClasses(code: string): string[] {
  // Extract all className values from JSX code
  const classNameRegex = /className="([^"]+)"/g;
  const classes: string[] = [];
  let match;

  while ((match = classNameRegex.exec(code)) !== null) {
    classes.push(...match[1].split(/\s+/));
  }

  return classes;
}

function isDisallowed(className: string): boolean {
  return DISALLOWED_PATTERNS.some(pattern => pattern.test(className));
}

function isException(className: string): boolean {
  return EXCEPTION_PATTERNS.some(pattern => pattern.test(className));
}

function getSuggestion(className: string): string {
  for (const [pattern, suggestion] of Object.entries(SUGGESTIONS)) {
    if (className.includes(pattern)) {
      return suggestion;
    }
  }
  return 'Use a semantic color token from the design system';
}

function validateComponents(): Violation[] {
  const violations: Violation[] = [];

  for (const component of components) {
    for (const example of component.examples) {
      const classes = extractClasses(example.code);

      for (const cls of classes) {
        if (isDisallowed(cls) && !isException(cls)) {
          violations.push({
            component: component.name,
            example: example.title,
            className: cls,
            suggestion: getSuggestion(cls),
          });
        }
      }
    }
  }

  return violations;
}

function main() {
  console.log('🔍 Validating component colors against design system tokens...\n');

  const violations = validateComponents();

  if (violations.length === 0) {
    console.log('✅ All component examples use semantic color tokens!');
    console.log('   Design system consistency is maintained.\n');
    process.exit(0);
  }

  console.log(`❌ Found ${violations.length} color token violation(s):\n`);

  // Group violations by component for cleaner output
  const byComponent = new Map<string, Violation[]>();
  for (const v of violations) {
    const key = v.component;
    if (!byComponent.has(key)) {
      byComponent.set(key, []);
    }
    byComponent.get(key)!.push(v);
  }

  for (const [component, componentViolations] of byComponent) {
    console.log(`  ${component}:`);
    for (const v of componentViolations) {
      console.log(`    Example: "${v.example}"`);
      console.log(`      Class: ${v.className}`);
      console.log(`      Use: ${v.suggestion}`);
    }
    console.log('');
  }

  console.log('💡 To fix: Update lib/design-system/components.ts to use semantic tokens');
  console.log('   Reference lib/design-system/style-guide.ts for available tokens.\n');

  process.exit(1);
}

main();
