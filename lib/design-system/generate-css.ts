import { styleGuide } from './style-guide';

/**
 * Generates CSS custom properties from design tokens
 *
 * NOTE: This utility demonstrates how CSS can be generated from design tokens.
 * Currently, the CSS in app/globals.css is manually maintained and validated
 * against design tokens using scripts/validate-css-tokens.ts
 *
 * Future enhancement: Integrate this into build process to auto-generate CSS
 */
export function generateColorCSS(): string {
  let css = '';

  // Generate light mode variables
  css += '  /* Light mode color tokens from design system */\n';
  styleGuide.colors.forEach(category => {
    category.colors.forEach(color => {
      if (color.cssVar) {
        css += `  ${color.cssVar}-light: ${color.value};\n`;
      }
    });
  });

  css += '\n';

  // Generate dark mode variables
  css += '  /* Dark mode color tokens from design system */\n';
  styleGuide.colors.forEach(category => {
    category.colors.forEach(color => {
      if (color.cssVar && color.darkValue) {
        css += `  ${color.cssVar}-dark: ${color.darkValue};\n`;
      }
    });
  });

  css += '\n';

  // Generate default references (point to light mode by default)
  css += '  /* Default color variables (light mode) */\n';
  styleGuide.colors.forEach(category => {
    category.colors.forEach(color => {
      if (color.cssVar) {
        css += `  ${color.cssVar}: var(${color.cssVar}-light);\n`;
      }
    });
  });

  return css;
}

/**
 * Generates dark mode CSS overrides
 */
export function generateDarkModeCSS(): string {
  let css = '';

  styleGuide.colors.forEach(category => {
    category.colors.forEach(color => {
      if (color.cssVar && color.darkValue) {
        css += `  ${color.cssVar}: var(${color.cssVar}-dark);\n`;
      }
    });
  });

  return css;
}
