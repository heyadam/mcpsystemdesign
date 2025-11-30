import { html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { McpBaseElement } from './base.js';

/**
 * Message input component for AI chat interfaces.
 * Features auto-resizing textarea, send button, and keyboard shortcuts.
 *
 * @element mcp-message-input
 *
 * @prop {string} placeholder - Placeholder text
 * @prop {boolean} disabled - Whether the input is disabled
 * @prop {number} maxLength - Maximum character length
 * @prop {number} maxRows - Maximum rows before scrolling
 * @prop {string} value - Current input value
 *
 * @slot prefix - Content before the textarea (e.g., attachment button)
 * @slot suffix - Content after the textarea (e.g., voice input button)
 * @slot send-icon - Custom icon for send button
 *
 * @csspart container - The outer container
 * @csspart textarea - The textarea element
 * @csspart send-button - The send button
 * @csspart character-count - The character count display
 *
 * @cssprop --mcp-input-bg - Input background color
 * @cssprop --mcp-input-border - Input border color
 * @cssprop --mcp-input-radius - Input border radius
 * @cssprop --mcp-input-min-height - Minimum input height
 * @cssprop --mcp-input-max-height - Maximum input height before scroll
 *
 * @fires mcp-submit - Fired when message is submitted (Enter or button click)
 * @fires mcp-input - Fired on input change
 * @fires mcp-focus - Fired when input gains focus
 * @fires mcp-blur - Fired when input loses focus
 *
 * @example
 * <mcp-message-input placeholder="Type a message..."></mcp-message-input>
 * <mcp-message-input @mcp-submit="${(e) => handleSubmit(e.detail.value)}"></mcp-message-input>
 */
@customElement('mcp-message-input')
export class McpMessageInput extends McpBaseElement {
  static styles = [
    ...McpBaseElement.baseStyles,
    css`
      :host {
        display: block;
        --_bg: var(--mcp-input-bg, var(--mcp-color-surface));
        --_border: var(--mcp-input-border, var(--mcp-color-border));
        --_radius: var(--mcp-input-radius, var(--mcp-radius-xl));
        --_min-height: var(--mcp-input-min-height, 44px);
        --_max-height: var(--mcp-input-max-height, 200px);
      }

      .container {
        display: flex;
        align-items: flex-end;
        gap: var(--mcp-space-2);
        padding: var(--mcp-space-2) var(--mcp-space-3);
        background: var(--_bg);
        border: 1px solid var(--_border);
        border-radius: var(--_radius);
        transition: border-color var(--mcp-transition-fast), box-shadow var(--mcp-transition-fast);
      }

      .container:focus-within {
        border-color: var(--mcp-color-primary);
        box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
      }

      :host([disabled]) .container {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .input-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 0;
      }

      textarea {
        width: 100%;
        min-height: var(--_min-height);
        max-height: var(--_max-height);
        padding: var(--mcp-space-2) 0;
        border: none;
        background: transparent;
        color: var(--mcp-color-text);
        font-family: inherit;
        font-size: var(--mcp-font-size-base);
        line-height: var(--mcp-line-height);
        resize: none;
        overflow-y: auto;
      }

      textarea:focus {
        outline: none;
      }

      textarea::placeholder {
        color: var(--mcp-color-text-subtle);
      }

      textarea:disabled {
        cursor: not-allowed;
      }

      .send-button {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        padding: 0;
        border: none;
        background: var(--mcp-color-primary);
        color: var(--mcp-color-primary-foreground);
        border-radius: var(--mcp-radius-lg);
        cursor: pointer;
        transition: background var(--mcp-transition-fast), transform var(--mcp-transition-fast);
      }

      .send-button:hover:not(:disabled) {
        background: var(--mcp-color-primary-hover);
      }

      .send-button:active:not(:disabled) {
        transform: scale(0.95);
      }

      .send-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .send-icon {
        width: 18px;
        height: 18px;
      }

      .character-count {
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-text-subtle);
        text-align: right;
        padding-top: var(--mcp-space-1);
      }

      .character-count.warning {
        color: var(--mcp-color-warning);
      }

      .character-count.error {
        color: var(--mcp-color-error);
      }

      .prefix,
      .suffix {
        display: flex;
        align-items: center;
      }
    `,
  ];

  /**
   * Placeholder text for the textarea.
   */
  @property()
  placeholder = 'Type a message...';

  /**
   * Whether the input is disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Maximum character length (0 = unlimited).
   */
  @property({ type: Number, attribute: 'max-length' })
  maxLength = 0;

  /**
   * Maximum rows before scrolling.
   */
  @property({ type: Number, attribute: 'max-rows' })
  maxRows = 6;

  /**
   * Current input value.
   */
  @property()
  value = '';

  /**
   * Whether to show character count.
   */
  @property({ type: Boolean, attribute: 'show-count' })
  showCount = false;

  @query('textarea')
  private _textarea!: HTMLTextAreaElement;

  /**
   * Focus the textarea programmatically.
   */
  focus() {
    this._textarea?.focus();
  }

  /**
   * Clear the input value.
   */
  clear() {
    this.value = '';
    this._resize();
  }

  private _handleInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;
    this._resize();
    this.emit('input', { value: this.value });
  }

  private _handleKeyDown(e: KeyboardEvent) {
    // Submit on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this._submit();
    }
  }

  private _handleFocus() {
    this.emit('focus');
  }

  private _handleBlur() {
    this.emit('blur');
  }

  private _submit() {
    const trimmedValue = this.value.trim();
    if (!trimmedValue || this.disabled) return;

    if (this.emit('submit', { value: trimmedValue })) {
      this.clear();
    }
  }

  private _resize() {
    if (!this._textarea) return;

    // Reset height to calculate new scrollHeight
    this._textarea.style.height = 'auto';

    // Calculate line height
    const computedStyle = getComputedStyle(this._textarea);
    const lineHeight = parseFloat(computedStyle.lineHeight) || 24;
    const maxHeight = lineHeight * this.maxRows;

    // Set new height
    const newHeight = Math.min(this._textarea.scrollHeight, maxHeight);
    this._textarea.style.height = `${newHeight}px`;
  }

  private get _isOverLimit(): boolean {
    return this.maxLength > 0 && this.value.length > this.maxLength;
  }

  private get _isNearLimit(): boolean {
    return this.maxLength > 0 && this.value.length >= this.maxLength * 0.9;
  }

  private get _canSubmit(): boolean {
    return this.value.trim().length > 0 && !this.disabled && !this._isOverLimit;
  }

  render() {
    return html`
      <div class="container" part="container">
        <div class="prefix">
          <slot name="prefix"></slot>
        </div>

        <div class="input-wrapper">
          <textarea
            part="textarea"
            .value="${this.value}"
            placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            maxlength="${this.maxLength > 0 ? this.maxLength : nothing}"
            rows="1"
            aria-label="${this.placeholder}"
            @input="${this._handleInput}"
            @keydown="${this._handleKeyDown}"
            @focus="${this._handleFocus}"
            @blur="${this._handleBlur}"
          ></textarea>

          ${this.showCount && this.maxLength > 0
            ? html`
                <div
                  class="character-count ${this._isOverLimit ? 'error' : this._isNearLimit ? 'warning' : ''}"
                  part="character-count"
                >
                  ${this.value.length} / ${this.maxLength}
                </div>
              `
            : nothing}
        </div>

        <div class="suffix">
          <slot name="suffix"></slot>
        </div>

        <button
          class="send-button"
          part="send-button"
          ?disabled="${!this._canSubmit}"
          @click="${this._submit}"
          aria-label="Send message"
        >
          <slot name="send-icon">
            <svg class="send-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </slot>
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-message-input': McpMessageInput;
  }
}
