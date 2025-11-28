#!/usr/bin/env tsx

/**
 * Validates that CSS tokens in globals.css match design tokens in style-guide.ts
 * This ensures the documented design tokens remain the single source of truth
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { styleGuide } from '../lib/design-system/style-guide.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CSS_PATH = join(__dirname, '../app/globals.css');

interface ValidationError {
  tokenName: string;
  expected: string;
  actual: string | null;
  type: 'missing' | 'mismatch' | 'extra';
}

function extractCSSTokens(css: string): Map<string, string> {
  const tokens = new Map<string, string>();

  // Find @theme block by matching balanced braces
  const themeStart = css.indexOf('@theme {');
  if (themeStart === -1) {
    throw new Error('Could not find @theme block in globals.css');
  }

  // Find matching closing brace
  let braceCount = 0;
  let themeEnd = -1;
  for (let i = themeStart; i < css.length; i++) {
    if (css[i] === '{') braceCount++;
    if (css[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        themeEnd = i;
        break;
      }
    }
  }

  if (themeEnd === -1) {
    throw new Error('Could not find end of @theme block');
  }

  const themeContent = css.substring(themeStart, themeEnd + 1);

  // Match CSS custom properties like: --color-surface-light: #ffffff;
  const tokenRegex = /(--color-[a-z-]+):\s*([^;]+);/g;
  let match;

  while ((match = tokenRegex.exec(themeContent)) !== null) {
    tokens.set(match[1], match[2].trim());
  }

  return tokens;
}

function validateTokens(): ValidationError[] {
  const errors: ValidationError[] = [];
  const cssContent = readFileSync(CSS_PATH, 'utf-8');
  const cssTokens = extractCSSTokens(cssContent);

  // Build expected tokens from design system
  const expectedTokens = new Map<string, string>();

  styleGuide.colors.forEach(category => {
    category.colors.forEach(color => {
      if (color.cssVar) {
        // Light mode token
        expectedTokens.set(`${color.cssVar}-light`, color.value);

        // Dark mode token (if exists)
        if (color.darkValue) {
          expectedTokens.set(`${color.cssVar}-dark`, color.darkValue);
        }

        // Default token (points to light version)
        expectedTokens.set(color.cssVar, `var(${color.cssVar}-light)`);
      }
    });
  });

  // Check for missing or mismatched tokens
  expectedTokens.forEach((expectedValue, tokenName) => {
    const actualValue = cssTokens.get(tokenName);

    if (!actualValue) {
      errors.push({
        tokenName,
        expected: expectedValue,
        actual: null,
        type: 'missing'
      });
    } else if (actualValue !== expectedValue) {
      errors.push({
        tokenName,
        expected: expectedValue,
        actual: actualValue,
        type: 'mismatch'
      });
    }
  });

  // Check for extra tokens in CSS that aren't in design system
  cssTokens.forEach((value, tokenName) => {
    if (!expectedTokens.has(tokenName) && tokenName.startsWith('--color-')) {
      errors.push({
        tokenName,
        expected: '',
        actual: value,
        type: 'extra'
      });
    }
  });

  return errors;
}

function main() {
  console.log('🔍 Validating CSS tokens against design system...\n');

  const errors = validateTokens();

  if (errors.length === 0) {
    console.log('✅ All CSS tokens match design system tokens!');
    console.log('   Single source of truth is maintained.\n');
    process.exit(0);
  }

  console.log(`❌ Found ${errors.length} token mismatch(es):\n`);

  errors.forEach(error => {
    switch (error.type) {
      case 'missing':
        console.log(`  Missing: ${error.tokenName}`);
        console.log(`    Expected: ${error.expected}`);
        break;
      case 'mismatch':
        console.log(`  Mismatch: ${error.tokenName}`);
        console.log(`    Expected: ${error.expected}`);
        console.log(`    Actual:   ${error.actual}`);
        break;
      case 'extra':
        console.log(`  Extra: ${error.tokenName}`);
        console.log(`    Value: ${error.actual}`);
        console.log(`    (Not found in design system)`);
        break;
    }
    console.log('');
  });

  console.log('💡 To fix: Update app/globals.css to match lib/design-system/style-guide.ts');
  console.log('   Design tokens should be the single source of truth.\n');

  process.exit(1);
}

main();
