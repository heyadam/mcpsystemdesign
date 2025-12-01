import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { McpBaseElement } from './base.js';

/**
 * Animated typing indicator for AI chat interfaces.
 * Shows that the AI assistant is processing or generating a response.
 *
 * @element mcp-typing-indicator
 *
 * @prop {'sm' | 'md' | 'lg'} size - Size variant
 * @prop {string} label - Accessible label for screen readers
 *
 * @csspart container - The indicator container
 * @csspart dot - Individual animated dots
 *
 * @cssprop --mcp-typing-dot-color - Dot color (default: text-muted)
 * @cssprop --mcp-typing-dot-size - Dot size (default: 8px for md)
 * @cssprop --mcp-typing-gap - Gap between dots (default: 4px)
 * @cssprop --mcp-typing-bg - Background color for bubble variant
 *
 * @example
 * <mcp-typing-indicator></mcp-typing-indicator>
 * <mcp-typing-indicator size="sm" label="Claude is thinking"></mcp-typing-indicator>
 */
@customElement('mcp-typing-indicator')
export class McpTypingIndicator extends McpBaseElement {
  static styles = [
    ...McpBaseElement.baseStyles,
    css`
      :host {
        display: inline-flex;
        --_dot-color: var(--mcp-typing-dot-color, var(--mcp-color-text-muted));
        --_dot-size: var(--mcp-typing-dot-size, 8px);
        --_gap: var(--mcp-typing-gap, 4px);
        --_bg: var(--mcp-typing-bg, var(--mcp-color-surface-sunken));
      }

      :host([size='sm']) {
        --_dot-size: 6px;
        --_gap: 3px;
      }

      :host([size='lg']) {
        --_dot-size: 10px;
        --_gap: 5px;
      }

      .container {
        display: inline-flex;
        align-items: center;
        gap: var(--_gap);
        padding: var(--mcp-space-3) var(--mcp-space-4);
        background: var(--_bg);
        border-radius: var(--mcp-radius-lg);
      }

      :host([variant='minimal']) .container {
        padding: 0;
        background: transparent;
      }

      .dot {
        width: var(--_dot-size);
        height: var(--_dot-size);
        background: var(--_dot-color);
        border-radius: var(--mcp-radius-full);
        animation: bounce 1.4s infinite ease-in-out both;
      }

      .dot:nth-child(1) {
        animation-delay: -0.32s;
      }

      .dot:nth-child(2) {
        animation-delay: -0.16s;
      }

      .dot:nth-child(3) {
        animation-delay: 0s;
      }

      @keyframes bounce {
        0%,
        80%,
        100% {
          transform: scale(0.6);
          opacity: 0.5;
        }
        40% {
          transform: scale(1);
          opacity: 1;
        }
      }

      /* Screen reader only text */
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `,
  ];

  /**
   * Size variant of the indicator.
   */
  @property({ reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Visual variant.
   */
  @property({ reflect: true })
  variant: 'bubble' | 'minimal' = 'bubble';

  /**
   * Accessible label for screen readers.
   */
  @property()
  label = 'AI is typing';

  render() {
    return html`
      <div
        class="container"
        part="container"
        role="status"
        aria-live="polite"
        aria-label="${this.label}"
      >
        <span class="dot" part="dot"></span>
        <span class="dot" part="dot"></span>
        <span class="dot" part="dot"></span>
        <span class="sr-only">${this.label}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-typing-indicator': McpTypingIndicator;
  }
}
