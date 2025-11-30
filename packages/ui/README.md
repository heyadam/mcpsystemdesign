# @mcpsystem/ui

AI-first Web Components for chat interfaces and AI interactions.

## Features

- **Framework agnostic** - Works with React, Vue, Svelte, or plain HTML
- **Lightweight** - Built with Lit (~5KB per component)
- **Accessible** - ARIA attributes and screen reader support built-in
- **Themeable** - CSS custom properties for easy customization
- **Dark mode ready** - Automatic support for prefers-color-scheme

## Installation

```bash
npm install @mcpsystem/ui
```

```js
// Import all components (auto-registers custom elements)
import '@mcpsystem/ui';

// Or import specific components
import { McpChatMessage, McpCodeBlock } from '@mcpsystem/ui';
```

## Components

### `<mcp-chat-message>`

Display chat messages with user/assistant styling.

```html
<mcp-chat-message role="user">
  How do I center a div?
</mcp-chat-message>

<mcp-chat-message role="assistant" name="Claude" timestamp="2:34 PM">
  Use flexbox with justify-content and align-items set to center.
</mcp-chat-message>
```

**Props:** `role`, `name`, `timestamp`, `animated`

---

### `<mcp-typing-indicator>`

Animated indicator showing AI is processing.

```html
<mcp-typing-indicator></mcp-typing-indicator>
<mcp-typing-indicator variant="minimal" size="sm"></mcp-typing-indicator>
```

**Props:** `size` (sm/md/lg), `variant` (bubble/minimal), `label`

---

### `<mcp-code-block>`

Code display with copy button and optional line numbers.

```html
<mcp-code-block language="javascript" show-line-numbers>
const greeting = "Hello, World!";
console.log(greeting);
</mcp-code-block>
```

**Props:** `language`, `filename`, `show-line-numbers`, `code`
**Events:** `mcp-copy`

---

### `<mcp-message-input>`

Auto-resizing textarea with send button.

```html
<mcp-message-input
  placeholder="Ask Claude anything..."
  @mcp-submit="${(e) => handleSubmit(e.detail.value)}"
></mcp-message-input>
```

**Props:** `placeholder`, `disabled`, `max-length`, `max-rows`, `value`, `show-count`
**Events:** `mcp-submit`, `mcp-input`, `mcp-focus`, `mcp-blur`
**Methods:** `focus()`, `clear()`

---

### `<mcp-streaming-text>`

Typewriter effect for AI responses.

```html
<mcp-streaming-text
  text="Hello, I'm an AI assistant!"
  speed="50"
></mcp-streaming-text>
```

**Props:** `text`, `speed`, `cursor`, `auto-start`
**Events:** `mcp-stream-start`, `mcp-stream-progress`, `mcp-stream-complete`
**Methods:** `stream(text)`, `append(text)`, `complete()`, `pause()`, `resume()`, `reset()`

---

### `<mcp-token-counter>`

Visual token usage indicator with warning states.

```html
<mcp-token-counter used="3500" limit="4096" show-label></mcp-token-counter>
```

**Props:** `used`, `limit`, `show-label`, `variant`, `warning-threshold`
**Events:** `mcp-limit-warning`, `mcp-limit-exceeded`

---

## Theming

All components use CSS custom properties that can be overridden:

```css
:root {
  /* Surface colors */
  --mcp-color-surface: #ffffff;
  --mcp-color-surface-raised: #ffffff;
  --mcp-color-surface-sunken: #f9fafb;

  /* Text colors */
  --mcp-color-text: #18181b;
  --mcp-color-text-muted: #71717a;

  /* Chat message specific */
  --mcp-message-user-bg: #000;
  --mcp-message-user-fg: #fff;
  --mcp-message-assistant-bg: #f4f4f5;
  --mcp-message-assistant-fg: #18181b;
  --mcp-message-radius: 1rem;

  /* Typography */
  --mcp-font-family: Inter, system-ui, sans-serif;
  --mcp-font-mono: 'JetBrains Mono', Menlo, monospace;
}
```

### Dark Mode

Components automatically adapt to `prefers-color-scheme: dark`. You can also use a `.dark` class on a parent element for manual control.

## CSS Parts

Style component internals using `::part()`:

```css
mcp-chat-message::part(content) {
  font-size: 1rem;
  max-width: 600px;
}

mcp-code-block::part(header) {
  background: #1a1a1a;
}
```

## Slots

Customize component content with slots:

```html
<mcp-chat-message role="assistant">
  <img slot="avatar" src="/claude-avatar.png" />
  Here's my response...
  <button slot="actions">Copy</button>
</mcp-chat-message>

<mcp-message-input>
  <button slot="prefix">📎</button>
  <button slot="suffix">🎤</button>
</mcp-message-input>
```

## TypeScript

Full TypeScript support with type definitions included:

```ts
import { McpChatMessage, McpMessageInput } from '@mcpsystem/ui';

// Custom element types are registered globally
const message = document.querySelector('mcp-chat-message');
message.role = 'assistant';

// Event types
input.addEventListener('mcp-submit', (e: CustomEvent<{ value: string }>) => {
  console.log(e.detail.value);
});
```

## Framework Integration

### React

```tsx
import '@mcpsystem/ui';

function Chat() {
  return (
    <>
      <mcp-chat-message role="user">Hello!</mcp-chat-message>
      <mcp-typing-indicator></mcp-typing-indicator>
    </>
  );
}
```

### Vue

```vue
<script setup>
import '@mcpsystem/ui';
</script>

<template>
  <mcp-chat-message role="user">Hello!</mcp-chat-message>
  <mcp-typing-indicator></mcp-typing-indicator>
</template>
```

## Development

```bash
npm install
npm run build
npm run build:watch  # Watch mode
```

### Demo Page

A demo page is included for manual testing and visual verification of components:

```bash
npm run build
# Then open demo/index.html in a browser
```

The demo page allows you to:
- Test all components interactively
- Toggle dark mode
- Verify accessibility features
- Test component composition (components nested within each other)

### Testing Strategy

We use **manual testing via the demo page** rather than automated unit tests during active development. This is intentional:

**Why not automated tests yet?**
1. **Rapid iteration** - Component APIs are still evolving; tests would require constant updates
2. **Visual verification** - Many component behaviors (animations, styling, dark mode) are best verified visually
3. **Real browser testing** - Web Components require real browser APIs; simulated DOMs (jsdom/happy-dom) have quirks with Shadow DOM and custom element registration
4. **Cost vs. value** - For an unpublished package with 6 components, manual testing is faster and catches more issues

**When we'll add automated tests:**
- Before publishing to npm
- When the component API stabilizes
- Using Web Test Runner + @open-wc/testing (Lit's recommended approach)

This follows the principle of deferring infrastructure until it provides clear value.

## Browser Support

Works in all modern browsers with native Web Component support:
- Chrome 67+
- Firefox 63+
- Safari 10.1+
- Edge 79+

## License

MIT
