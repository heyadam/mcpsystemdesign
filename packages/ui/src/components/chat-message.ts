import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { McpBaseElement } from './base.js';

/**
 * Chat message component for AI conversations.
 * Displays user and assistant messages with customizable styling.
 *
 * @element mcp-chat-message
 *
 * @prop {'user' | 'assistant' | 'system'} role - Message role
 * @prop {string} timestamp - Optional timestamp to display
 * @prop {string} name - Optional display name
 * @prop {boolean} animated - Whether to animate message entry
 *
 * @slot - Message content (supports HTML/markdown)
 * @slot avatar - Custom avatar element
 * @slot actions - Action buttons (copy, regenerate, etc.)
 *
 * @csspart container - The message container
 * @csspart avatar - The avatar wrapper
 * @csspart content - The message content wrapper
 * @csspart timestamp - The timestamp element
 * @csspart name - The display name element
 * @csspart actions - The actions container
 *
 * @cssprop --mcp-message-user-bg - User message background
 * @cssprop --mcp-message-user-fg - User message text color
 * @cssprop --mcp-message-assistant-bg - Assistant message background
 * @cssprop --mcp-message-assistant-fg - Assistant message text color
 * @cssprop --mcp-message-system-bg - System message background
 * @cssprop --mcp-message-system-fg - System message text color
 * @cssprop --mcp-message-radius - Border radius
 * @cssprop --mcp-message-max-width - Maximum content width
 *
 * @example
 * <mcp-chat-message role="user">How do I center a div?</mcp-chat-message>
 * <mcp-chat-message role="assistant" name="Claude">
 *   Use flexbox with justify-content and align-items set to center.
 * </mcp-chat-message>
 */
@customElement('mcp-chat-message')
export class McpChatMessage extends McpBaseElement {
  static styles = [
    ...McpBaseElement.baseStyles,
    css`
      :host {
        --_user-bg: var(--mcp-message-user-bg, var(--mcp-color-primary));
        --_user-fg: var(--mcp-message-user-fg, var(--mcp-color-primary-foreground));
        --_assistant-bg: var(--mcp-message-assistant-bg, var(--mcp-color-surface-sunken));
        --_assistant-fg: var(--mcp-message-assistant-fg, var(--mcp-color-text));
        --_system-bg: var(--mcp-message-system-bg, var(--mcp-color-surface-hover));
        --_system-fg: var(--mcp-message-system-fg, var(--mcp-color-text-muted));
        --_radius: var(--mcp-message-radius, var(--mcp-radius-xl));
        --_max-width: var(--mcp-message-max-width, 80%);
      }

      .container {
        display: flex;
        gap: var(--mcp-space-3);
        max-width: 100%;
      }

      :host([role='user']) .container {
        flex-direction: row-reverse;
      }

      .avatar-wrapper {
        flex-shrink: 0;
        width: 32px;
        height: 32px;
      }

      .avatar {
        width: 100%;
        height: 100%;
        border-radius: var(--mcp-radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--mcp-font-size-xs);
        font-weight: 600;
        color: white;
      }

      :host([role='assistant']) .avatar {
        background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
      }

      :host([role='user']) .avatar {
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      }

      :host([role='system']) .avatar {
        background: var(--mcp-color-border-emphasis);
        color: var(--mcp-color-text-muted);
      }

      .message-wrapper {
        max-width: var(--_max-width);
        min-width: 0;
      }

      .name {
        font-size: var(--mcp-font-size-xs);
        font-weight: 500;
        color: var(--mcp-color-text-muted);
        margin-bottom: var(--mcp-space-1);
      }

      :host([role='user']) .name {
        text-align: right;
      }

      .content {
        padding: var(--mcp-space-3) var(--mcp-space-4);
        border-radius: var(--_radius);
        font-size: var(--mcp-font-size-sm);
        line-height: var(--mcp-line-height);
        word-wrap: break-word;
        overflow-wrap: break-word;
      }

      :host([role='user']) .content {
        background: var(--_user-bg);
        color: var(--_user-fg);
        border-bottom-right-radius: var(--mcp-radius-sm);
      }

      :host([role='assistant']) .content {
        background: var(--_assistant-bg);
        color: var(--_assistant-fg);
        border-bottom-left-radius: var(--mcp-radius-sm);
      }

      :host([role='system']) .content {
        background: var(--_system-bg);
        color: var(--_system-fg);
        font-style: italic;
        border-radius: var(--mcp-radius-md);
      }

      .meta {
        display: flex;
        align-items: center;
        gap: var(--mcp-space-2);
        margin-top: var(--mcp-space-1);
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-text-subtle);
      }

      :host([role='user']) .meta {
        justify-content: flex-end;
      }

      .timestamp {
        opacity: 0.8;
      }

      .actions {
        display: flex;
        gap: var(--mcp-space-1);
        opacity: 0;
        transition: opacity var(--mcp-transition-fast);
      }

      .container:hover .actions,
      .container:focus-within .actions {
        opacity: 1;
      }

      /* Animation for message entry */
      :host([animated]) {
        animation: messageIn 0.3s ease-out;
      }

      @keyframes messageIn {
        from {
          opacity: 0;
          transform: translateY(8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Nested content styling */
      .content ::slotted(p) {
        margin: 0 0 var(--mcp-space-2) 0;
      }

      .content ::slotted(p:last-child) {
        margin-bottom: 0;
      }

      .content ::slotted(code) {
        font-family: var(--mcp-font-mono);
        font-size: 0.9em;
        padding: 0.125em 0.375em;
        background: rgba(0, 0, 0, 0.1);
        border-radius: var(--mcp-radius-sm);
      }

      :host([role='user']) .content ::slotted(code) {
        background: rgba(255, 255, 255, 0.2);
      }

      /* Screen reader announcement */
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
   * Message role: user, assistant, or system.
   */
  @property({ reflect: true })
  role: 'user' | 'assistant' | 'system' = 'assistant';

  /**
   * Optional timestamp to display.
   */
  @property()
  timestamp?: string;

  /**
   * Optional display name (e.g., "Claude", "You").
   */
  @property()
  name?: string;

  /**
   * Whether to animate message entry.
   */
  @property({ type: Boolean, reflect: true })
  animated = false;

  private get _defaultAvatar(): string {
    switch (this.role) {
      case 'user':
        return 'U';
      case 'assistant':
        return 'AI';
      case 'system':
        return '⚙';
      default:
        return '?';
    }
  }

  private get _roleLabel(): string {
    switch (this.role) {
      case 'user':
        return 'User message';
      case 'assistant':
        return 'Assistant message';
      case 'system':
        return 'System message';
      default:
        return 'Message';
    }
  }

  render() {
    return html`
      <article
        class="container"
        part="container"
        role="article"
        aria-label="${this._roleLabel}"
      >
        <div class="avatar-wrapper" part="avatar">
          <div class="avatar" aria-hidden="true">
            <slot name="avatar">${this._defaultAvatar}</slot>
          </div>
        </div>

        <div class="message-wrapper">
          ${this.name
            ? html`<div class="name" part="name">${this.name}</div>`
            : nothing}

          <div class="content" part="content">
            <slot></slot>
          </div>

          ${this.timestamp
            ? html`
                <div class="meta">
                  <span class="timestamp" part="timestamp">${this.timestamp}</span>
                  <div class="actions" part="actions">
                    <slot name="actions"></slot>
                  </div>
                </div>
              `
            : html`
                <div class="meta">
                  <div class="actions" part="actions">
                    <slot name="actions"></slot>
                  </div>
                </div>
              `}
        </div>

        <span class="sr-only">${this._roleLabel}</span>
      </article>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-chat-message': McpChatMessage;
  }
}
