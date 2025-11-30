# mcpsystem.design Roadmap

## Vision

Build an AI-first component system with two layers:
1. **Pattern Reference** - Static Tailwind CSS patterns served via MCP (current)
2. **Web Components** - Plug-and-play components designed for AI interfaces (future)

The patterns are documentation. The Web Components are the product.

---

## Phase 1: Tailwind Pattern Reference (Current)

Static HTML/CSS patterns that show the styling, not the behavior.

### What We Provide
- Tailwind CSS class combinations for common UI patterns
- Class variations (variants, sizes, states) showing which classes to swap
- Copy-paste examples for rapid prototyping

### What We Don't Provide
- Interactive behavior (users add their own JS)
- Framework-specific code
- Build dependencies

### Status
- 50+ component patterns documented
- Class variations added to Button, Input, Badge, Card, Alert
- MCP server exposing patterns to AI assistants

---

## Phase 2: Web Components Infrastructure

Set up the tooling for shipping real components.

### Directory Structure

```
packages/
└── ui/
    ├── package.json          # @mcpsystem/ui
    ├── tsconfig.json
    ├── src/
    │   ├── index.ts          # Main exports
    │   └── components/
    │       ├── base.ts       # Shared base class
    │       └── chat-message.ts
    └── dist/                 # Built output (ESM)
```

### Tech Stack
- **Lit** - Web Component library (~5KB)
- **TypeScript** - Type safety and build (`tsc`)
- **CSS Custom Properties** - Theming

### Deliverables
- [x] Initialize packages/ui with Lit
- [x] Create base component class
- [x] Set up build pipeline (TypeScript → ESM)
- [x] Configure npm publishing workflow
- [ ] Add unit tests

---

## Phase 3: AI-First Web Components

Build components specifically designed for AI interfaces.

### Priority Components

| Component | Element Name | Purpose |
|-----------|-------------|---------|
| Chat Message | `<mcp-chat-message>` | User/assistant message bubbles |
| Typing Indicator | `<mcp-typing-indicator>` | "AI is thinking" animation |
| Code Block | `<mcp-code-block>` | Syntax highlighting + copy |
| Message Input | `<mcp-message-input>` | Auto-resize textarea + send |
| Streaming Text | `<mcp-streaming-text>` | Typewriter effect for responses |
| Token Counter | `<mcp-token-counter>` | Usage visualization |

### Design Principles

1. **Semantic element names** - AI can understand `<mcp-chat-message role="assistant">` better than div soup
2. **Zero config** - Works out of the box with sensible defaults
3. **Themeable** - CSS custom properties for customization
4. **Accessible** - ARIA attributes built-in
5. **Framework-agnostic** - Works in React, Vue, Svelte, plain HTML

### Usage Example

```html
<script type="module">
  import '@mcpsystem/ui';
</script>

<!-- Use the components -->
<mcp-chat-message role="user">
  How do I center a div?
</mcp-chat-message>

<mcp-chat-message role="assistant">
  <mcp-code-block language="css">
    display: flex;
    justify-content: center;
    align-items: center;
  </mcp-code-block>
</mcp-chat-message>

<mcp-typing-indicator></mcp-typing-indicator>
```

### Deliverables
- [ ] Implement 6 core AI components
- [ ] Add component documentation to MCP server
- [ ] Publish to npm as @mcpsystem/ui

---

## Phase 4: AI Guidance Integration

Enhance MCP server with opinionated guidance.

### New MCP Tools

| Tool | Purpose |
|------|---------|
| `get_accessibility_guide` | ARIA patterns, keyboard nav requirements |
| `get_anti_patterns` | Common mistakes to avoid |
| `get_composition_rules` | How components work together |

---

## Timeline

| Phase | Status | Priority |
|-------|--------|----------|
| Phase 1: Patterns | Complete | - |
| Phase 2: Infrastructure | In Progress | High |
| Phase 3: Web Components | Not Started | High |
| Phase 4: AI Guidance | Not Started | Medium |

---

## Open Questions

1. ~~**Package naming** - `@mcpsystem/ui` or `@mcp-design/ui`?~~ → Resolved: `@mcpsystem/ui`
2. **Theming** - CSS custom properties vs Tailwind integration?
3. ~~**Bundle strategy** - Single bundle vs per-component bundles?~~ → Resolved: ESM-only via TypeScript
4. **SSR** - Declarative Shadow DOM for server rendering?

---

## References

- [Lit Documentation](https://lit.dev/)
- [Web Components Best Practices](https://web.dev/custom-elements-best-practices/)
- [Open UI Component Standards](https://open-ui.org/)
