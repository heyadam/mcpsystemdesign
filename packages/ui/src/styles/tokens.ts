/**
 * CSS Custom Property tokens for theming MCP UI components.
 * These provide sensible defaults that can be overridden at the application level.
 *
 * Usage:
 *   :root {
 *     --mcp-color-surface: #ffffff;
 *     --mcp-color-text: #18181b;
 *   }
 */
import { css } from 'lit';

/**
 * Default theme tokens applied to all components.
 * Components use CSS custom properties that fall back to these values.
 */
export const themeTokens = css`
  :host {
    /* ===================================
     * SURFACE COLORS
     * =================================== */
    --mcp-color-surface: var(--color-surface, #ffffff);
    --mcp-color-surface-raised: var(--color-surface-raised, #ffffff);
    --mcp-color-surface-sunken: var(--color-surface-sunken, #f9fafb);
    --mcp-color-surface-hover: var(--color-surface-hover, #f4f4f5);

    /* ===================================
     * TEXT COLORS
     * =================================== */
    --mcp-color-text: var(--color-text, #18181b);
    --mcp-color-text-muted: var(--color-text-muted, #71717a);
    --mcp-color-text-subtle: var(--color-text-subtle, #a1a1aa);

    /* ===================================
     * BORDER COLORS
     * =================================== */
    --mcp-color-border: var(--color-border, #e4e4e7);
    --mcp-color-border-muted: var(--color-border-muted, #f4f4f5);
    --mcp-color-border-emphasis: var(--color-border-emphasis, #d4d4d8);

    /* ===================================
     * PRIMARY / BRAND
     * =================================== */
    --mcp-color-primary: var(--color-primary, #000000);
    --mcp-color-primary-hover: var(--color-primary-hover, #27272a);
    --mcp-color-primary-foreground: var(--color-primary-foreground, #ffffff);

    /* ===================================
     * STATE COLORS
     * =================================== */
    --mcp-color-success: var(--color-success-emphasis, #10b981);
    --mcp-color-error: var(--color-error-emphasis, #ef4444);
    --mcp-color-warning: var(--color-warning-emphasis, #f59e0b);
    --mcp-color-info: var(--color-info-emphasis, #3b82f6);

    /* ===================================
     * CHAT SPECIFIC
     * =================================== */
    --mcp-message-user-bg: var(--mcp-color-primary);
    --mcp-message-user-fg: var(--mcp-color-primary-foreground);
    --mcp-message-assistant-bg: var(--mcp-color-surface-sunken);
    --mcp-message-assistant-fg: var(--mcp-color-text);
    --mcp-message-radius: 1rem;

    /* ===================================
     * TYPOGRAPHY
     * =================================== */
    --mcp-font-family: var(--font-sans, Inter, system-ui, -apple-system, sans-serif);
    --mcp-font-mono: var(--font-mono, 'JetBrains Mono', Menlo, Monaco, monospace);
    --mcp-font-size-xs: 0.75rem;
    --mcp-font-size-sm: 0.875rem;
    --mcp-font-size-base: 1rem;
    --mcp-font-size-lg: 1.125rem;
    --mcp-line-height: 1.5;

    /* ===================================
     * SPACING
     * =================================== */
    --mcp-space-1: 0.25rem;
    --mcp-space-2: 0.5rem;
    --mcp-space-3: 0.75rem;
    --mcp-space-4: 1rem;
    --mcp-space-6: 1.5rem;
    --mcp-space-8: 2rem;

    /* ===================================
     * RADII
     * =================================== */
    --mcp-radius-sm: 0.25rem;
    --mcp-radius-md: 0.5rem;
    --mcp-radius-lg: 0.75rem;
    --mcp-radius-xl: 1rem;
    --mcp-radius-full: 9999px;

    /* ===================================
     * TRANSITIONS
     * =================================== */
    --mcp-transition-fast: 150ms ease;
    --mcp-transition-base: 200ms ease;
    --mcp-transition-slow: 300ms ease;

    /* ===================================
     * SHADOWS
     * =================================== */
    --mcp-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --mcp-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --mcp-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  /* Dark mode adjustments via prefers-color-scheme */
  @media (prefers-color-scheme: dark) {
    :host {
      --mcp-color-surface: var(--color-surface, #09090b);
      --mcp-color-surface-raised: var(--color-surface-raised, #18181b);
      --mcp-color-surface-sunken: var(--color-surface-sunken, #09090b);
      --mcp-color-surface-hover: var(--color-surface-hover, #27272a);

      --mcp-color-text: var(--color-text, #fafafa);
      --mcp-color-text-muted: var(--color-text-muted, #a1a1aa);
      --mcp-color-text-subtle: var(--color-text-subtle, #71717a);

      --mcp-color-border: var(--color-border, #27272a);
      --mcp-color-border-muted: var(--color-border-muted, #18181b);
      --mcp-color-border-emphasis: var(--color-border-emphasis, #3f3f46);

      --mcp-color-primary: var(--color-primary, #ffffff);
      --mcp-color-primary-hover: var(--color-primary-hover, #e4e4e7);
      --mcp-color-primary-foreground: var(--color-primary-foreground, #09090b);

      --mcp-message-assistant-bg: var(--mcp-color-surface-raised);
    }
  }
`;

/**
 * Dark mode class-based override (for manual dark mode toggle)
 * Apply .dark class to a parent element to enable dark mode.
 */
export const darkModeOverride = css`
  :host-context(.dark) {
    --mcp-color-surface: var(--color-surface, #09090b);
    --mcp-color-surface-raised: var(--color-surface-raised, #18181b);
    --mcp-color-surface-sunken: var(--color-surface-sunken, #09090b);
    --mcp-color-surface-hover: var(--color-surface-hover, #27272a);

    --mcp-color-text: var(--color-text, #fafafa);
    --mcp-color-text-muted: var(--color-text-muted, #a1a1aa);
    --mcp-color-text-subtle: var(--color-text-subtle, #71717a);

    --mcp-color-border: var(--color-border, #27272a);
    --mcp-color-border-muted: var(--color-border-muted, #18181b);
    --mcp-color-border-emphasis: var(--color-border-emphasis, #3f3f46);

    --mcp-color-primary: var(--color-primary, #ffffff);
    --mcp-color-primary-hover: var(--color-primary-hover, #e4e4e7);
    --mcp-color-primary-foreground: var(--color-primary-foreground, #09090b);

    --mcp-message-assistant-bg: var(--mcp-color-surface-raised);
  }
`;
