import { html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { McpBaseElement } from './base.js';
import { copyToClipboard, escapeHtml } from '../utils/index.js';

/**
 * Code block component with syntax highlighting support and copy button.
 * Optimized for AI chat interfaces showing code snippets.
 *
 * @element mcp-code-block
 *
 * @prop {string} language - Programming language for syntax highlighting
 * @prop {string} filename - Optional filename to display in header
 * @prop {boolean} showLineNumbers - Whether to show line numbers
 * @prop {string} code - Code content (alternative to slot)
 *
 * @slot - Code content (plain text)
 *
 * @csspart container - The outer container
 * @csspart header - The header with language/filename
 * @csspart code - The code element
 * @csspart copy-button - The copy button
 * @csspart line-numbers - The line numbers gutter
 *
 * @cssprop --mcp-code-bg - Code block background
 * @cssprop --mcp-code-fg - Code text color
 * @cssprop --mcp-code-header-bg - Header background
 * @cssprop --mcp-code-font - Code font family
 * @cssprop --mcp-code-font-size - Code font size
 * @cssprop --mcp-code-radius - Border radius
 *
 * @fires mcp-copy - Fired when code is copied to clipboard
 *
 * @example
 * <mcp-code-block language="javascript">
 *   const greeting = "Hello, World!";
 *   console.log(greeting);
 * </mcp-code-block>
 */
@customElement('mcp-code-block')
export class McpCodeBlock extends McpBaseElement {
  static styles = [
    ...McpBaseElement.baseStyles,
    css`
      :host {
        display: block;
        --_bg: var(--mcp-code-bg, #1e1e1e);
        --_fg: var(--mcp-code-fg, #d4d4d4);
        --_header-bg: var(--mcp-code-header-bg, #2d2d2d);
        --_font: var(--mcp-code-font, var(--mcp-font-mono));
        --_font-size: var(--mcp-code-font-size, 0.875rem);
        --_radius: var(--mcp-code-radius, var(--mcp-radius-lg));
        --_line-number-color: var(--mcp-code-line-number, #6e7681);
      }

      .container {
        background: var(--_bg);
        border-radius: var(--_radius);
        overflow: hidden;
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--mcp-space-2) var(--mcp-space-3);
        background: var(--_header-bg);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .header-info {
        display: flex;
        align-items: center;
        gap: var(--mcp-space-2);
        font-size: var(--mcp-font-size-xs);
        color: var(--_fg);
        opacity: 0.7;
      }

      .language-badge {
        text-transform: uppercase;
        font-weight: 500;
        letter-spacing: 0.05em;
      }

      .filename {
        opacity: 0.6;
      }

      .copy-button {
        display: flex;
        align-items: center;
        gap: var(--mcp-space-1);
        padding: var(--mcp-space-1) var(--mcp-space-2);
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: var(--mcp-radius-sm);
        color: var(--_fg);
        font-size: var(--mcp-font-size-xs);
        cursor: pointer;
        transition: background var(--mcp-transition-fast), border-color var(--mcp-transition-fast);
      }

      .copy-button:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.3);
      }

      .copy-button.copied {
        color: var(--mcp-color-success);
        border-color: var(--mcp-color-success);
      }

      .copy-icon {
        width: 14px;
        height: 14px;
      }

      .code-wrapper {
        display: flex;
        overflow-x: auto;
      }

      .line-numbers {
        flex-shrink: 0;
        padding: var(--mcp-space-3);
        padding-right: var(--mcp-space-2);
        text-align: right;
        user-select: none;
        color: var(--_line-number-color);
        font-family: var(--_font);
        font-size: var(--_font-size);
        line-height: 1.6;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
      }

      .line-number {
        display: block;
      }

      pre {
        flex: 1;
        margin: 0;
        padding: var(--mcp-space-3);
        overflow-x: auto;
        font-family: var(--_font);
        font-size: var(--_font-size);
        line-height: 1.6;
        color: var(--_fg);
        white-space: pre;
        tab-size: 2;
      }

      code {
        font-family: inherit;
        font-size: inherit;
      }

      /* Basic syntax highlighting tokens */
      .token.comment { color: #6a9955; }
      .token.string { color: #ce9178; }
      .token.number { color: #b5cea8; }
      .token.keyword { color: #569cd6; }
      .token.function { color: #dcdcaa; }
      .token.operator { color: #d4d4d4; }
      .token.punctuation { color: #d4d4d4; }
      .token.class-name { color: #4ec9b0; }
      .token.constant { color: #4fc1ff; }
      .token.property { color: #9cdcfe; }

      /* Scrollbar styling */
      pre::-webkit-scrollbar {
        height: 8px;
      }

      pre::-webkit-scrollbar-track {
        background: transparent;
      }

      pre::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
      }

      pre::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    `,
  ];

  /**
   * Programming language for syntax highlighting.
   */
  @property()
  language = '';

  /**
   * Optional filename to display in header.
   */
  @property()
  filename = '';

  /**
   * Whether to show line numbers.
   */
  @property({ type: Boolean, attribute: 'show-line-numbers' })
  showLineNumbers = false;

  /**
   * Code content (alternative to slot).
   */
  @property()
  code = '';

  @state()
  private _copied = false;

  @state()
  private _slotContent = '';

  private async _handleCopy() {
    const codeContent = this._getCodeContent();
    const success = await copyToClipboard(codeContent);

    if (success) {
      this._copied = true;
      this.emit('copy', { code: codeContent });
      this.announce('Code copied to clipboard');

      setTimeout(() => {
        this._copied = false;
      }, 2000);
    }
  }

  private _getCodeContent(): string {
    return this.code || this._slotContent;
  }

  private _handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const nodes = slot.assignedNodes({ flatten: true });
    this._slotContent = nodes
      .map((node) => node.textContent || '')
      .join('')
      .trim();
  }

  private _getLines(): string[] {
    const content = this._getCodeContent();
    return content.split('\n');
  }

  private _renderLineNumbers() {
    if (!this.showLineNumbers) return nothing;

    const lines = this._getLines();
    return html`
      <div class="line-numbers" part="line-numbers" aria-hidden="true">
        ${lines.map((_, i) => html`<span class="line-number">${i + 1}</span>`)}
      </div>
    `;
  }

  render() {
    const showHeader = this.language || this.filename;
    const codeContent = this._getCodeContent();

    return html`
      <div class="container" part="container">
        ${showHeader
          ? html`
              <div class="header" part="header">
                <div class="header-info">
                  ${this.language
                    ? html`<span class="language-badge">${this.language}</span>`
                    : nothing}
                  ${this.filename
                    ? html`<span class="filename">${this.filename}</span>`
                    : nothing}
                </div>
                <button
                  class="copy-button ${this._copied ? 'copied' : ''}"
                  part="copy-button"
                  @click="${this._handleCopy}"
                  aria-label="${this._copied ? 'Copied!' : 'Copy code'}"
                >
                  ${this._copied
                    ? html`
                        <svg class="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Copied!
                      `
                    : html`
                        <svg class="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        Copy
                      `}
                </button>
              </div>
            `
          : nothing}

        <div class="code-wrapper">
          ${this._renderLineNumbers()}
          <pre part="code"><code>${codeContent ? escapeHtml(codeContent) : html`<slot @slotchange="${this._handleSlotChange}"></slot>`}</code></pre>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-code-block': McpCodeBlock;
  }
}
