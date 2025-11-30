/**
 * @mcpsystem/ui - AI-first Web Components
 *
 * Lightweight, framework-agnostic components for AI chat interfaces.
 * Built with Lit for minimal bundle size and maximum compatibility.
 *
 * Usage:
 *   npm install @mcpsystem/ui
 *   import '@mcpsystem/ui';
 *   <mcp-chat-message role="assistant">Hello!</mcp-chat-message>
 */

export const VERSION = '0.0.1';

// Components
export { McpChatMessage } from './components/chat-message.js';

// Base class for extending
export { McpBaseElement } from './components/base.js';

// Future components (uncomment as built)
// export { McpTypingIndicator } from './components/typing-indicator.js';
// export { McpCodeBlock } from './components/code-block.js';
// export { McpMessageInput } from './components/message-input.js';
// export { McpStreamingText } from './components/streaming-text.js';
// export { McpTokenCounter } from './components/token-counter.js';
