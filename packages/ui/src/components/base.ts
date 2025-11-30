import { LitElement, css } from 'lit';

/**
 * Base class for all MCP UI components.
 * Provides shared styles and utilities.
 */
export class McpBaseElement extends LitElement {
  // Shared styles that all components inherit
  static baseStyles = css`
    :host {
      display: block;
      box-sizing: border-box;
    }

    :host([hidden]) {
      display: none;
    }

    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }
  `;

  /**
   * Dispatch a custom event with the mcp- prefix
   */
  protected emit<T>(name: string, detail?: T) {
    this.dispatchEvent(
      new CustomEvent(`mcp-${name}`, {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  }
}
