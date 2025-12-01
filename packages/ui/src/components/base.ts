import { LitElement, css } from 'lit';
import { themeTokens, darkModeOverride } from '../styles/tokens.js';
import { prefersDarkMode, prefersReducedMotion } from '../utils/index.js';

/**
 * Base class for all MCP UI components.
 * Provides shared styles, theming, and utilities.
 */
export class McpBaseElement extends LitElement {
  /**
   * Base styles inherited by all components.
   * Includes reset styles, theme tokens, and dark mode support.
   */
  static baseStyles = [
    themeTokens,
    darkModeOverride,
    css`
      :host {
        display: block;
        box-sizing: border-box;
        font-family: var(--mcp-font-family);
        font-size: var(--mcp-font-size-base);
        line-height: var(--mcp-line-height);
        color: var(--mcp-color-text);
      }

      :host([hidden]) {
        display: none !important;
      }

      *,
      *::before,
      *::after {
        box-sizing: inherit;
      }

      /* Focus visible styles for accessibility */
      :focus-visible {
        outline: 2px solid var(--mcp-color-primary);
        outline-offset: 2px;
      }

      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `,
  ];

  /**
   * Whether the user prefers dark mode (via system preference).
   */
  protected get isDarkMode(): boolean {
    return prefersDarkMode();
  }

  /**
   * Whether the user prefers reduced motion.
   */
  protected get prefersReducedMotion(): boolean {
    return prefersReducedMotion();
  }

  /**
   * Dispatch a custom event with the mcp- prefix.
   * Events bubble and are composed (cross shadow DOM boundary).
   *
   * @param name - Event name (without mcp- prefix)
   * @param detail - Optional event detail payload
   * @returns Whether the event was not cancelled
   */
  protected emit<T>(name: string, detail?: T): boolean {
    const event = new CustomEvent(`mcp-${name}`, {
      detail,
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    return this.dispatchEvent(event);
  }

  /**
   * Generate a unique ID for internal element references.
   */
  protected generateId(suffix: string): string {
    return `mcp-${this.tagName.toLowerCase()}-${suffix}-${Math.random().toString(36).slice(2, 7)}`;
  }

  /**
   * Announce a message to screen readers via live region.
   *
   * @param message - Message to announce
   * @param priority - 'polite' or 'assertive'
   */
  protected announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const el = document.createElement('div');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', priority);
    el.setAttribute('aria-atomic', 'true');
    el.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);';
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }
}
