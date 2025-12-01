/**
 * @mcpsystem/ui - AI-first Web Components
 *
 * Lightweight, framework-agnostic components for AI chat interfaces.
 * Built with Lit for minimal bundle size and maximum compatibility.
 *
 * @packageDocumentation
 *
 * @example Basic usage
 * ```html
 * <script type="module">
 *   import '@mcpsystem/ui';
 * </script>
 *
 * <mcp-chat-message role="user">Hello!</mcp-chat-message>
 * <mcp-chat-message role="assistant">Hi there!</mcp-chat-message>
 * <mcp-typing-indicator></mcp-typing-indicator>
 * ```
 *
 * @example With npm
 * ```bash
 * npm install @mcpsystem/ui
 * ```
 * ```ts
 * import '@mcpsystem/ui';
 * // or import specific components:
 * import { McpChatMessage, McpCodeBlock } from '@mcpsystem/ui';
 * ```
 */

export const VERSION = '0.1.0';

// =============================================================================
// COMPONENTS
// =============================================================================

/**
 * Chat message component for AI conversations.
 * @see {@link McpChatMessage}
 */
export { McpChatMessage } from './components/chat-message.js';

/**
 * Animated typing indicator.
 * @see {@link McpTypingIndicator}
 */
export { McpTypingIndicator } from './components/typing-indicator.js';

/**
 * Code block with copy button.
 * @see {@link McpCodeBlock}
 */
export { McpCodeBlock } from './components/code-block.js';

/**
 * Message input with auto-resize.
 * @see {@link McpMessageInput}
 */
export { McpMessageInput } from './components/message-input.js';

/**
 * Streaming text with typewriter effect.
 * @see {@link McpStreamingText}
 */
export { McpStreamingText } from './components/streaming-text.js';

/**
 * Token usage counter.
 * @see {@link McpTokenCounter}
 */
export { McpTokenCounter } from './components/token-counter.js';

// =============================================================================
// BASE CLASS & UTILITIES
// =============================================================================

/**
 * Base class for extending MCP components.
 * Provides shared styles, theming, and utility methods.
 */
export { McpBaseElement } from './components/base.js';

/**
 * Theme tokens (CSS custom properties).
 */
export { themeTokens, darkModeOverride } from './styles/tokens.js';

/**
 * Utility functions.
 */
export {
  debounce,
  throttle,
  uniqueId,
  clamp,
  formatNumber,
  copyToClipboard,
  escapeHtml,
  prefersReducedMotion,
  prefersDarkMode,
  cx,
} from './utils/index.js';
