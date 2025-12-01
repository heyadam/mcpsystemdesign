/**
 * Web Components documentation for MCP server integration.
 * Documents the @mcpsystem/ui package components for AI assistants.
 */

export interface WebComponentProp {
  name: string;
  type: string;
  default?: string;
  description: string;
  attribute?: string; // HTML attribute name if different from prop
}

export interface WebComponentSlot {
  name: string;
  description: string;
}

export interface WebComponentCssPart {
  name: string;
  description: string;
}

export interface WebComponentCssProp {
  name: string;
  default?: string;
  description: string;
}

export interface WebComponentEvent {
  name: string;
  detail?: string;
  description: string;
}

export interface WebComponentDoc {
  name: string;
  tagName: string;
  description: string;
  category: string;
  props: WebComponentProp[];
  slots: WebComponentSlot[];
  cssParts: WebComponentCssPart[];
  cssProps: WebComponentCssProp[];
  events: WebComponentEvent[];
  examples: { title: string; code: string }[];
}

export const webComponents: WebComponentDoc[] = [
  {
    name: 'Chat Message',
    tagName: 'mcp-chat-message',
    description: 'Displays user and assistant messages with customizable styling, avatars, and timestamps.',
    category: 'AI',
    props: [
      { name: 'role', type: "'user' | 'assistant' | 'system'", default: "'assistant'", description: 'Message role determines styling and layout direction' },
      { name: 'timestamp', type: 'string', description: 'Optional timestamp to display below the message' },
      { name: 'name', type: 'string', description: 'Optional display name (e.g., "Claude", "You")' },
      { name: 'animated', type: 'boolean', default: 'false', description: 'Whether to animate message entry' },
    ],
    slots: [
      { name: 'default', description: 'Message content (supports HTML/markdown)' },
      { name: 'avatar', description: 'Custom avatar element to replace default' },
      { name: 'actions', description: 'Action buttons (copy, regenerate, etc.)' },
    ],
    cssParts: [
      { name: 'container', description: 'The message container' },
      { name: 'avatar', description: 'The avatar wrapper' },
      { name: 'content', description: 'The message content wrapper' },
      { name: 'timestamp', description: 'The timestamp element' },
      { name: 'name', description: 'The display name element' },
      { name: 'actions', description: 'The actions container' },
    ],
    cssProps: [
      { name: '--mcp-message-user-bg', description: 'User message background color' },
      { name: '--mcp-message-user-fg', description: 'User message text color' },
      { name: '--mcp-message-assistant-bg', description: 'Assistant message background color' },
      { name: '--mcp-message-assistant-fg', description: 'Assistant message text color' },
      { name: '--mcp-message-system-bg', description: 'System message background color' },
      { name: '--mcp-message-system-fg', description: 'System message text color' },
      { name: '--mcp-message-radius', description: 'Border radius' },
      { name: '--mcp-message-max-width', default: '80%', description: 'Maximum content width' },
    ],
    events: [],
    examples: [
      {
        title: 'Basic Usage',
        code: `<mcp-chat-message role="user">
  How do I center a div?
</mcp-chat-message>

<mcp-chat-message role="assistant" name="Claude">
  Use flexbox with justify-content and align-items set to center.
</mcp-chat-message>`,
      },
      {
        title: 'With Timestamp',
        code: `<mcp-chat-message role="assistant" timestamp="2:34 PM">
  Here's your answer...
</mcp-chat-message>`,
      },
    ],
  },
  {
    name: 'Typing Indicator',
    tagName: 'mcp-typing-indicator',
    description: 'Animated indicator showing the AI assistant is processing or generating a response.',
    category: 'AI',
    props: [
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size variant' },
      { name: 'variant', type: "'bubble' | 'minimal'", default: "'bubble'", description: 'Visual variant - bubble has background, minimal is dots only' },
      { name: 'label', type: 'string', default: "'AI is typing'", description: 'Accessible label for screen readers' },
    ],
    slots: [],
    cssParts: [
      { name: 'container', description: 'The indicator container' },
      { name: 'dot', description: 'Individual animated dots' },
    ],
    cssProps: [
      { name: '--mcp-typing-dot-color', description: 'Dot color' },
      { name: '--mcp-typing-dot-size', default: '8px', description: 'Dot size' },
      { name: '--mcp-typing-gap', default: '4px', description: 'Gap between dots' },
      { name: '--mcp-typing-bg', description: 'Background color for bubble variant' },
    ],
    events: [],
    examples: [
      {
        title: 'Basic Usage',
        code: `<mcp-typing-indicator></mcp-typing-indicator>`,
      },
      {
        title: 'Minimal Variant',
        code: `<mcp-typing-indicator variant="minimal" size="sm"></mcp-typing-indicator>`,
      },
    ],
  },
  {
    name: 'Code Block',
    tagName: 'mcp-code-block',
    description: 'Code block component with copy button and optional line numbers. Optimized for AI chat interfaces.',
    category: 'AI',
    props: [
      { name: 'language', type: 'string', description: 'Programming language for header display' },
      { name: 'filename', type: 'string', description: 'Optional filename to display in header' },
      { name: 'showLineNumbers', type: 'boolean', default: 'false', attribute: 'show-line-numbers', description: 'Whether to show line numbers' },
      { name: 'code', type: 'string', description: 'Code content (alternative to slot)' },
    ],
    slots: [
      { name: 'default', description: 'Code content (plain text)' },
    ],
    cssParts: [
      { name: 'container', description: 'The outer container' },
      { name: 'header', description: 'The header with language/filename' },
      { name: 'code', description: 'The code element' },
      { name: 'copy-button', description: 'The copy button' },
      { name: 'line-numbers', description: 'The line numbers gutter' },
    ],
    cssProps: [
      { name: '--mcp-code-bg', default: '#1e1e1e', description: 'Code block background' },
      { name: '--mcp-code-fg', default: '#d4d4d4', description: 'Code text color' },
      { name: '--mcp-code-header-bg', description: 'Header background' },
      { name: '--mcp-code-font', description: 'Code font family' },
      { name: '--mcp-code-font-size', default: '0.875rem', description: 'Code font size' },
      { name: '--mcp-code-radius', description: 'Border radius' },
    ],
    events: [
      { name: 'mcp-copy', detail: '{ code: string }', description: 'Fired when code is copied to clipboard' },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `<mcp-code-block language="javascript">
const greeting = "Hello, World!";
</mcp-code-block>`,
      },
      {
        title: 'With Line Numbers',
        code: `<mcp-code-block language="python" show-line-numbers>
    return "Hello, World!"
</mcp-code-block>`,
      },
    ],
  },
  {
    name: 'Message Input',
    tagName: 'mcp-message-input',
    description: 'Message input with auto-resizing textarea, send button, and keyboard shortcuts.',
    category: 'AI',
    props: [
      { name: 'placeholder', type: 'string', default: "'Type a message...'", description: 'Placeholder text' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the input is disabled' },
      { name: 'maxLength', type: 'number', default: '0', attribute: 'max-length', description: 'Maximum character length (0 = unlimited)' },
      { name: 'maxRows', type: 'number', default: '6', attribute: 'max-rows', description: 'Maximum rows before scrolling' },
      { name: 'value', type: 'string', default: "''", description: 'Current input value' },
      { name: 'showCount', type: 'boolean', default: 'false', attribute: 'show-count', description: 'Whether to show character count' },
    ],
    slots: [
      { name: 'prefix', description: 'Content before the textarea (e.g., attachment button)' },
      { name: 'suffix', description: 'Content after the textarea (e.g., voice input button)' },
      { name: 'send-icon', description: 'Custom icon for send button' },
    ],
    cssParts: [
      { name: 'container', description: 'The outer container' },
      { name: 'textarea', description: 'The textarea element' },
      { name: 'send-button', description: 'The send button' },
      { name: 'character-count', description: 'The character count display' },
    ],
    cssProps: [
      { name: '--mcp-input-bg', description: 'Input background color' },
      { name: '--mcp-input-border', description: 'Input border color' },
      { name: '--mcp-input-radius', description: 'Input border radius' },
      { name: '--mcp-input-min-height', default: '44px', description: 'Minimum input height' },
      { name: '--mcp-input-max-height', default: '200px', description: 'Maximum input height before scroll' },
    ],
    events: [
      { name: 'mcp-submit', detail: '{ value: string }', description: 'Fired when message is submitted (Enter or button click)' },
      { name: 'mcp-input', detail: '{ value: string }', description: 'Fired on input change' },
      { name: 'mcp-focus', description: 'Fired when input gains focus' },
      { name: 'mcp-blur', description: 'Fired when input loses focus' },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `<mcp-message-input placeholder="Ask Claude anything..."></mcp-message-input>`,
      },
      {
        title: 'With Character Limit',
        code: `<mcp-message-input max-length="500" show-count></mcp-message-input>`,
      },
      {
        title: 'Handle Submit',
        code: `<mcp-message-input id="input"></mcp-message-input>
<script>
  document.getElementById('input').addEventListener('mcp-submit', (e) => {
    console.log('Submitted:', e.detail.value);
  });
</script>`,
      },
    ],
  },
  {
    name: 'Streaming Text',
    tagName: 'mcp-streaming-text',
    description: 'Typewriter effect for AI responses with configurable speed and cursor.',
    category: 'AI',
    props: [
      { name: 'text', type: 'string', description: 'The full text to stream' },
      { name: 'speed', type: 'number', default: '50', description: 'Characters per second' },
      { name: 'cursor', type: 'boolean', default: 'true', description: 'Whether to show blinking cursor' },
      { name: 'autoStart', type: 'boolean', default: 'true', attribute: 'auto-start', description: 'Whether to start streaming automatically' },
    ],
    slots: [],
    cssParts: [
      { name: 'container', description: 'The text container' },
      { name: 'cursor', description: 'The blinking cursor' },
    ],
    cssProps: [
      { name: '--mcp-streaming-cursor-color', description: 'Cursor color' },
      { name: '--mcp-streaming-cursor-width', default: '2px', description: 'Cursor width' },
    ],
    events: [
      { name: 'mcp-stream-start', detail: '{ text: string }', description: 'Fired when streaming begins' },
      { name: 'mcp-stream-progress', detail: '{ text, progress, total, current }', description: 'Fired during streaming' },
      { name: 'mcp-stream-complete', detail: '{ text: string }', description: 'Fired when streaming completes' },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `<mcp-streaming-text text="Hello, I'm an AI assistant!"></mcp-streaming-text>`,
      },
      {
        title: 'Slower Speed',
        code: `<mcp-streaming-text text="Thinking carefully..." speed="20"></mcp-streaming-text>`,
      },
      {
        title: 'Programmatic Control',
        code: `<mcp-streaming-text id="stream" auto-start="false"></mcp-streaming-text>
<script>
  const stream = document.getElementById('stream');
  stream.stream('Here is my response...');
  // Later: stream.append(' more text');
  // Or: stream.complete();
</script>`,
      },
    ],
  },
  {
    name: 'Token Counter',
    tagName: 'mcp-token-counter',
    description: 'Token usage counter with visual progress indicator and warning states.',
    category: 'AI',
    props: [
      { name: 'used', type: 'number', default: '0', description: 'Number of tokens used' },
      { name: 'limit', type: 'number', default: '4096', description: 'Maximum token limit' },
      { name: 'showLabel', type: 'boolean', default: 'false', attribute: 'show-label', description: 'Whether to show the label text' },
      { name: 'variant', type: "'default' | 'compact'", default: "'default'", description: 'Display variant' },
      { name: 'warningThreshold', type: 'number', default: '80', attribute: 'warning-threshold', description: 'Percentage threshold for warning state (0-100)' },
    ],
    slots: [],
    cssParts: [
      { name: 'container', description: 'The outer container' },
      { name: 'bar', description: 'The progress bar track' },
      { name: 'bar-fill', description: 'The progress bar fill' },
      { name: 'label', description: 'The text label' },
    ],
    cssProps: [
      { name: '--mcp-token-bar-bg', description: 'Progress bar background' },
      { name: '--mcp-token-bar-fill', description: 'Progress bar fill color' },
      { name: '--mcp-token-bar-height', default: '6px', description: 'Progress bar height' },
      { name: '--mcp-token-warning', description: 'Warning state color' },
      { name: '--mcp-token-error', description: 'Error/exceeded state color' },
    ],
    events: [
      { name: 'mcp-limit-warning', detail: '{ used, limit, percentage }', description: 'Fired when usage exceeds warning threshold' },
      { name: 'mcp-limit-exceeded', detail: '{ used, limit, percentage }', description: 'Fired when usage exceeds 100%' },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `<mcp-token-counter used="3500" limit="4096"></mcp-token-counter>`,
      },
      {
        title: 'With Label',
        code: `<mcp-token-counter used="100000" limit="128000" show-label></mcp-token-counter>`,
      },
      {
        title: 'Handle Warning',
        code: `<mcp-token-counter id="counter" used="0" limit="4096"></mcp-token-counter>
<script>
  document.getElementById('counter').addEventListener('mcp-limit-warning', (e) => {
    console.log('Warning:', e.detail.percentage + '% used');
  });
</script>`,
      },
    ],
  },
];

/**
 * Get all web components
 */
export function getAllWebComponents(): WebComponentDoc[] {
  return webComponents;
}

/**
 * Get a web component by tag name
 */
export function getWebComponentByTag(tagName: string): WebComponentDoc | undefined {
  return webComponents.find((c) => c.tagName === tagName);
}

/**
 * Search web components by name or description
 */
export function searchWebComponents(query: string): WebComponentDoc[] {
  const lowerQuery = query.toLowerCase();
  return webComponents.filter(
    (c) =>
      c.name.toLowerCase().includes(lowerQuery) ||
      c.description.toLowerCase().includes(lowerQuery) ||
      c.tagName.toLowerCase().includes(lowerQuery)
  );
}
