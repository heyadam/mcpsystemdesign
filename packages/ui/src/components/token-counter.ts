import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { McpBaseElement } from './base.js';
import { formatNumber, clamp } from '../utils/index.js';

/**
 * Token usage counter with visual progress indicator.
 * Displays used tokens vs limit with warning states.
 *
 * @element mcp-token-counter
 *
 * @prop {number} used - Number of tokens used
 * @prop {number} limit - Maximum token limit
 * @prop {boolean} showLabel - Whether to show the label text
 * @prop {number} warningThreshold - Percentage threshold for warning state (0-100)
 *
 * @csspart container - The outer container
 * @csspart bar - The progress bar track
 * @csspart bar-fill - The progress bar fill
 * @csspart label - The text label
 *
 * @cssprop --mcp-token-bar-bg - Progress bar background
 * @cssprop --mcp-token-bar-fill - Progress bar fill color
 * @cssprop --mcp-token-bar-height - Progress bar height
 * @cssprop --mcp-token-warning - Warning state color
 * @cssprop --mcp-token-error - Error/exceeded state color
 *
 * @fires mcp-limit-warning - Fired when usage exceeds warning threshold
 * @fires mcp-limit-exceeded - Fired when usage exceeds 100%
 *
 * @example
 * <mcp-token-counter used="3500" limit="4096"></mcp-token-counter>
 * <mcp-token-counter used="100000" limit="128000" show-label></mcp-token-counter>
 */
@customElement('mcp-token-counter')
export class McpTokenCounter extends McpBaseElement {
  static styles = [
    ...McpBaseElement.baseStyles,
    css`
      :host {
        display: block;
        --_bar-bg: var(--mcp-token-bar-bg, var(--mcp-color-surface-sunken));
        --_bar-fill: var(--mcp-token-bar-fill, var(--mcp-color-primary));
        --_bar-height: var(--mcp-token-bar-height, 6px);
        --_warning: var(--mcp-token-warning, var(--mcp-color-warning));
        --_error: var(--mcp-token-error, var(--mcp-color-error));
      }

      .container {
        display: flex;
        flex-direction: column;
        gap: var(--mcp-space-2);
      }

      .bar {
        position: relative;
        width: 100%;
        height: var(--_bar-height);
        background: var(--_bar-bg);
        border-radius: var(--mcp-radius-full);
        overflow: hidden;
      }

      .bar-fill {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background: var(--_bar-fill);
        border-radius: var(--mcp-radius-full);
        transition: width var(--mcp-transition-base), background var(--mcp-transition-base);
      }

      :host([state='warning']) .bar-fill {
        background: var(--_warning);
      }

      :host([state='error']) .bar-fill {
        background: var(--_error);
      }

      .label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-text-muted);
      }

      :host([state='warning']) .label {
        color: var(--_warning);
      }

      :host([state='error']) .label {
        color: var(--_error);
      }

      .count {
        font-variant-numeric: tabular-nums;
      }

      .percentage {
        font-weight: 500;
      }

      /* Compact variant */
      :host([variant='compact']) .container {
        flex-direction: row;
        align-items: center;
        gap: var(--mcp-space-3);
      }

      :host([variant='compact']) .bar {
        flex: 1;
      }

      :host([variant='compact']) .label {
        flex-shrink: 0;
        width: auto;
      }
    `,
  ];

  /**
   * Number of tokens used.
   */
  @property({ type: Number })
  used = 0;

  /**
   * Maximum token limit.
   */
  @property({ type: Number })
  limit = 4096;

  /**
   * Whether to show the label text.
   */
  @property({ type: Boolean, attribute: 'show-label' })
  showLabel = false;

  /**
   * Display variant.
   */
  @property({ reflect: true })
  variant: 'default' | 'compact' = 'default';

  /**
   * Warning threshold percentage (0-100).
   */
  @property({ type: Number, attribute: 'warning-threshold' })
  warningThreshold = 80;

  private _lastEmittedState: string | null = null;

  willUpdate(changedProps: Map<string, unknown>) {
    if (changedProps.has('used') || changedProps.has('limit') || changedProps.has('warningThreshold')) {
      this._updateState();
    }
  }

  private _updateState() {
    const percentage = this._percentage;
    let newState: 'normal' | 'warning' | 'error' = 'normal';

    if (percentage >= 100) {
      newState = 'error';
    } else if (percentage >= this.warningThreshold) {
      newState = 'warning';
    }

    // Emit events only on state change
    if (newState !== this._lastEmittedState) {
      if (newState === 'warning') {
        this.emit('limit-warning', { used: this.used, limit: this.limit, percentage });
      } else if (newState === 'error') {
        this.emit('limit-exceeded', { used: this.used, limit: this.limit, percentage });
      }
      this._lastEmittedState = newState;
    }

    // Update reflected state attribute for CSS
    this.setAttribute('state', newState);
  }

  private get _percentage(): number {
    if (this.limit <= 0) return 0;
    return (this.used / this.limit) * 100;
  }

  private get _clampedPercentage(): number {
    return clamp(this._percentage, 0, 100);
  }

  render() {
    const percentage = this._clampedPercentage;

    return html`
      <div class="container" part="container" role="progressbar" aria-valuenow="${this.used}" aria-valuemin="0" aria-valuemax="${this.limit}" aria-label="Token usage: ${formatNumber(this.used)} of ${formatNumber(this.limit)}">
        ${this.showLabel
          ? html`
              <div class="label" part="label">
                <span class="count">${formatNumber(this.used)} / ${formatNumber(this.limit)} tokens</span>
                <span class="percentage">${Math.round(this._percentage)}%</span>
              </div>
            `
          : nothing}
        <div class="bar" part="bar">
          <div class="bar-fill" part="bar-fill" style="width: ${percentage}%"></div>
        </div>
        ${!this.showLabel
          ? html`
              <div class="label" part="label">
                <span class="count">${formatNumber(this.used)} / ${formatNumber(this.limit)}</span>
              </div>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-token-counter': McpTokenCounter;
  }
}
