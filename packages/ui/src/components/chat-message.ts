import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { McpBaseElement } from './base.js';

/**
 * Chat message component for AI conversations.
 *
 * @element mcp-chat-message
 *
 * @prop {string} role - Message role: 'user' | 'assistant' | 'system'
 * @prop {string} timestamp - Optional timestamp to display
 *
 * @slot - Message content (supports HTML/markdown)
 * @slot avatar - Custom avatar element
 *
 * @csspart container - The message container
 * @csspart avatar - The avatar wrapper
 * @csspart content - The message content wrapper
 * @csspart timestamp - The timestamp element
 *
 * @cssprop --mcp-message-user-bg - User message background
 * @cssprop --mcp-message-assistant-bg - Assistant message background
 * @cssprop --mcp-message-radius - Border radius
 */
@customElement('mcp-chat-message')
export class McpChatMessage extends McpBaseElement {
  static styles = [
    McpBaseElement.baseStyles,
    css`
      :host {
        --_user-bg: var(--mcp-message-user-bg, #000);
        --_user-fg: var(--mcp-message-user-fg, #fff);
        --_assistant-bg: var(--mcp-message-assistant-bg, #f4f4f5);
        --_assistant-fg: var(--mcp-message-assistant-fg, #18181b);
        --_radius: var(--mcp-message-radius, 1rem);
      }

      .container {
        display: flex;
        gap: 0.75rem;
        max-width: 100%;
      }

      :host([role='user']) .container {
        flex-direction: row-reverse;
      }

      .avatar {
        flex-shrink: 0;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 0.75rem;
        font-weight: 500;
      }

      :host([role='user']) .avatar {
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      }

      .content {
        max-width: 80%;
        padding: 0.75rem 1rem;
        border-radius: var(--_radius);
        font-size: 0.875rem;
        line-height: 1.5;
      }

      :host([role='user']) .content {
        background: var(--_user-bg);
        color: var(--_user-fg);
        border-bottom-right-radius: 0.25rem;
      }

      :host([role='assistant']) .content {
        background: var(--_assistant-bg);
        color: var(--_assistant-fg);
        border-bottom-left-radius: 0.25rem;
      }

      .timestamp {
        font-size: 0.75rem;
        color: #71717a;
        margin-top: 0.25rem;
      }

      :host([role='user']) .timestamp {
        text-align: right;
      }
    `,
  ];

  @property({ reflect: true })
  role: 'user' | 'assistant' | 'system' = 'assistant';

  @property()
  timestamp?: string;

  render() {
    return html`
      <div class="container" part="container">
        <div class="avatar" part="avatar">
          <slot name="avatar">
            ${this.role === 'user' ? 'U' : 'AI'}
          </slot>
        </div>
        <div>
          <div class="content" part="content">
            <slot></slot>
          </div>
          ${this.timestamp
            ? html`<div class="timestamp" part="timestamp">${this.timestamp}</div>`
            : null}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-chat-message': McpChatMessage;
  }
}
