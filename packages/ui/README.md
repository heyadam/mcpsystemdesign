# @mcpsystem/ui

AI-first Web Components for chat interfaces and AI interactions.

## Features

- **Framework agnostic** - Works with React, Vue, Svelte, or plain HTML
- **Lightweight** - Built with Lit (~5KB per component)
- **Accessible** - ARIA attributes built-in
- **Themeable** - CSS custom properties for customization

## Installation

```bash
npm install @mcpsystem/ui
```

```js
import '@mcpsystem/ui';
```

## Usage

```html
<!-- User message -->
<mcp-chat-message role="user">
  How do I center a div?
</mcp-chat-message>

<!-- Assistant message -->
<mcp-chat-message role="assistant">
  You can use flexbox with justify-content and align-items.
</mcp-chat-message>
```

## Available Components

| Component | Element | Status |
|-----------|---------|--------|
| Chat Message | `<mcp-chat-message>` | Available |
| Typing Indicator | `<mcp-typing-indicator>` | Planned |
| Code Block | `<mcp-code-block>` | Planned |
| Message Input | `<mcp-message-input>` | Planned |
| Streaming Text | `<mcp-streaming-text>` | Planned |
| Token Counter | `<mcp-token-counter>` | Planned |

## Theming

All components use CSS custom properties:

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
npm install
npm run build
npm run build:watch  # Watch mode
```

## License

MIT
