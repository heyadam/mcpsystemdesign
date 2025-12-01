import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { McpBaseElement } from './base.js';

/**
 * Streaming text component with typewriter effect for AI responses.
 * Simulates real-time text generation with configurable speed.
 *
 * @element mcp-streaming-text
 *
 * @prop {string} text - The full text to stream
 * @prop {number} speed - Characters per second (default: 50)
 * @prop {boolean} cursor - Whether to show blinking cursor
 * @prop {boolean} autoStart - Whether to start streaming automatically
 *
 * @csspart container - The text container
 * @csspart cursor - The blinking cursor
 *
 * @cssprop --mcp-streaming-cursor-color - Cursor color
 * @cssprop --mcp-streaming-cursor-width - Cursor width
 *
 * @fires mcp-stream-start - Fired when streaming begins
 * @fires mcp-stream-progress - Fired during streaming with progress info
 * @fires mcp-stream-complete - Fired when streaming completes
 *
 * @example
 * <mcp-streaming-text text="Hello, I'm an AI assistant!" speed="30"></mcp-streaming-text>
 */
@customElement('mcp-streaming-text')
export class McpStreamingText extends McpBaseElement {
  static styles = [
    ...McpBaseElement.baseStyles,
    css`
      :host {
        display: block;
        --_cursor-color: var(--mcp-streaming-cursor-color, var(--mcp-color-primary));
        --_cursor-width: var(--mcp-streaming-cursor-width, 2px);
      }

      .container {
        white-space: pre-wrap;
        word-wrap: break-word;
      }

      .cursor {
        display: inline-block;
        width: var(--_cursor-width);
        height: 1.2em;
        background: var(--_cursor-color);
        margin-left: 1px;
        vertical-align: text-bottom;
        animation: blink 1s step-end infinite;
      }

      .cursor.hidden {
        visibility: hidden;
      }

      @keyframes blink {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0;
        }
      }

      /* No animation when reduced motion preferred */
      @media (prefers-reduced-motion: reduce) {
        .cursor {
          animation: none;
          opacity: 1;
        }
      }
    `,
  ];

  /**
   * The full text to stream.
   */
  @property()
  text = '';

  /**
   * Characters per second.
   */
  @property({ type: Number })
  speed = 50;

  /**
   * Whether to show blinking cursor.
   */
  @property({ type: Boolean })
  cursor = true;

  /**
   * Whether to start streaming automatically when text changes.
   */
  @property({ type: Boolean, attribute: 'auto-start' })
  autoStart = true;

  @state()
  private _displayedText = '';

  @state()
  private _isStreaming = false;

  @state()
  private _isComplete = false;

  private _animationFrame: number | null = null;
  private _startTime: number | null = null;
  private _lastText = '';

  connectedCallback() {
    super.connectedCallback();
    if (this.autoStart && this.text) {
      this.stream(this.text);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cancelAnimation();
  }

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('text') && this.autoStart && this.text !== this._lastText) {
      this._lastText = this.text;
      this.stream(this.text);
    }
  }

  /**
   * Start streaming the given text (or current text prop).
   */
  stream(text?: string): void {
    if (text !== undefined) {
      this.text = text;
    }

    this._cancelAnimation();
    this._displayedText = '';
    this._isStreaming = true;
    this._isComplete = false;
    this._startTime = null;

    this.emit('stream-start', { text: this.text });
    this._animate();
  }

  /**
   * Append additional text to the stream.
   */
  append(text: string): void {
    this.text += text;
    if (!this._isStreaming) {
      this._isStreaming = true;
      this._isComplete = false;
      this._animate();
    }
  }

  /**
   * Complete the stream immediately, showing all text.
   */
  complete(): void {
    this._cancelAnimation();
    this._displayedText = this.text;
    this._isStreaming = false;
    this._isComplete = true;
    this.emit('stream-complete', { text: this.text });
  }

  /**
   * Pause the streaming animation.
   */
  pause(): void {
    this._cancelAnimation();
    this._isStreaming = false;
  }

  /**
   * Resume the streaming animation.
   */
  resume(): void {
    if (this._displayedText.length < this.text.length) {
      this._isStreaming = true;
      this._startTime = null;
      this._animate();
    }
  }

  /**
   * Reset the component to initial state.
   */
  reset(): void {
    this._cancelAnimation();
    this._displayedText = '';
    this._isStreaming = false;
    this._isComplete = false;
    this._startTime = null;
  }

  private _cancelAnimation(): void {
    if (this._animationFrame !== null) {
      cancelAnimationFrame(this._animationFrame);
      this._animationFrame = null;
    }
  }

  private _animate = (): void => {
    if (!this._isStreaming) return;

    const now = performance.now();
    if (this._startTime === null) {
      this._startTime = now;
    }

    const elapsed = now - this._startTime;
    const charsToShow = Math.floor((elapsed / 1000) * this.speed);
    const targetLength = Math.min(charsToShow, this.text.length);

    if (this._displayedText.length < targetLength) {
      this._displayedText = this.text.slice(0, targetLength);

      this.emit('stream-progress', {
        text: this._displayedText,
        progress: this._displayedText.length / this.text.length,
        total: this.text.length,
        current: this._displayedText.length,
      });
    }

    if (this._displayedText.length >= this.text.length) {
      this._isStreaming = false;
      this._isComplete = true;
      this.emit('stream-complete', { text: this.text });
    } else {
      this._animationFrame = requestAnimationFrame(this._animate);
    }
  };

  /**
   * Get current progress as a percentage (0-100).
   */
  get progress(): number {
    if (!this.text) return 0;
    return (this._displayedText.length / this.text.length) * 100;
  }

  /**
   * Whether streaming is currently active.
   */
  get isStreaming(): boolean {
    return this._isStreaming;
  }

  /**
   * Whether streaming has completed.
   */
  get isComplete(): boolean {
    return this._isComplete;
  }

  render() {
    const showCursor = this.cursor && !this._isComplete;

    return html`
      <div
        class="container"
        part="container"
        role="status"
        aria-live="polite"
        aria-busy="${this._isStreaming}"
      >
        ${this._displayedText}<span
          class="cursor ${showCursor ? '' : 'hidden'}"
          part="cursor"
          aria-hidden="true"
        ></span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-streaming-text': McpStreamingText;
  }
}
