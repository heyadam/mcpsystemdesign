# @mcpsystem/ui

AI-first Web Components for chat interfaces and AI interactions.

## Features

- **Framework agnostic** - Works with React, Vue, Svelte, or plain HTML
- **Zero config** - Just add a script tag and use
- **Lightweight** - Built with Lit (~5KB per component)
- **Accessible** - ARIA attributes built-in
- **Themeable** - CSS custom properties for customization

## Installation

### Via npm

```bash
npm install @mcpsystem/ui
```

```js
import '@mcpsystem/ui';
```

### Via CDN

```html
<script type="module" src="https://unpkg.com/@mcpsystem/ui"></script>
```

## Usage

```html
<!-- User message -->
<mcp-chat-message role="user">
  How do I center a div?
</mcp-chat-message>

<!-- Assistant message -->
<mcp-chat-message role="assistant">
  You can use flexbox:
  <mcp-code-block language="css">
    display: flex;
    justify-content: center;
    align-items: center;
  </mcp-code-block>
</mcp-chat-message>

<!-- Typing indicator -->
<mcp-typing-indicator></mcp-typing-indicator>
```

## Components

| Component | Element | Description |
|-----------|---------|-------------|
| Chat Message | `<mcp-chat-message>` | User/assistant message bubbles |
| Typing Indicator | `<mcp-typing-indicator>` | "AI is thinking" animation |
| Code Block | `<mcp-code-block>` | Syntax highlighting + copy |
| Message Input | `<mcp-message-input>` | Auto-resize textarea + send |
| Streaming Text | `<mcp-streaming-text>` | Typewriter effect |
| Token Counter | `<mcp-token-counter>` | Usage visualization |

## Theming

All components use CSS custom properties for theming:

```css
:root {
  --mcp-message-user-bg: #000;
  --mcp-message-user-fg: #fff;
  --mcp-message-assistant-bg: #f4f4f5;
  --mcp-message-assistant-fg: #18181b;
  --mcp-message-radius: 1rem;
}
```

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## License

MIT
