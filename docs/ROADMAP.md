# mcpsystem.design Roadmap

## Vision

Build an AI-first component system that serves two purposes:
1. **Pattern Reference** - Tailwind CSS patterns with Alpine.js for interactivity, served via MCP
2. **Web Components** - Lightweight, framework-agnostic components designed for AI consumption

---

## Phase 1: Alpine.js Interactive Patterns (Current)

Add Alpine.js examples alongside static HTML for components that need interactivity.

### Components to Enhance

| Component | Interactivity Needed |
|-----------|---------------------|
| Dropdown | Open/close, keyboard navigation |
| Modal | Open/close, focus trap, escape key |
| Tabs | Tab switching, keyboard nav |
| Toggle | On/off state |
| Accordion | Expand/collapse sections |
| Toast | Show/hide, auto-dismiss |
| Tooltip | Show on hover/focus |
| Select | Custom dropdown behavior |

### Example Structure

```html
<!-- Static HTML (works without JS) -->
<div class="relative">
  <button class="...">Options</button>
  <div class="hidden absolute ...">Menu items</div>
</div>

<!-- With Alpine.js -->
<div x-data="{ open: false }" class="relative">
  <button @click="open = !open" class="...">Options</button>
  <div x-show="open" @click.away="open = false" class="absolute ...">
    Menu items
  </div>
</div>
```

### Deliverables
- [ ] Add `alpine` field to ComponentExample type
- [ ] Add Alpine.js examples to 8+ interactive components
- [ ] Document Alpine.js setup in getting-started docs

---

## Phase 2: Web Components Scaffolding

Set up the infrastructure for shipping real components as a package.

### Directory Structure

```
packages/
└── ui/
    ├── package.json          # @mcpsystem/ui
    ├── tsconfig.json
    ├── src/
    │   ├── index.ts          # Main exports
    │   ├── components/
    │   │   ├── chat-message.ts
    │   │   ├── typing-indicator.ts
    │   │   ├── code-block.ts
    │   │   └── ...
    │   └── styles/
    │       └── base.css      # Shared styles
    ├── dist/                 # Built output
    └── README.md
```

### Tech Stack
- **Lit** - Web Component library (~5KB, great DX)
- **TypeScript** - Type safety
- **Vite** - Build tooling
- **CSS Custom Properties** - Theming

### Deliverables
- [ ] Initialize packages/ui with Lit + Vite
- [ ] Create base component class with shared functionality
- [ ] Set up build pipeline for ESM + IIFE bundles
- [ ] Configure npm publishing workflow

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

1. **Semantic element names** - AI assistants can understand `<mcp-chat-message role="assistant">` better than div soup
2. **Sensible defaults** - Works out of the box with zero config
3. **Themeable** - CSS custom properties for customization
4. **Accessible** - ARIA attributes built-in
5. **Framework-agnostic** - Works in React, Vue, Svelte, plain HTML

### Usage Example

```html
<!-- Just include the script -->
<script src="https://unpkg.com/@mcpsystem/ui"></script>

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
- [ ] Create CDN bundle for script tag usage

---

## Phase 4: AI Guidance Integration

Enhance MCP server to return opinionated guidance alongside patterns.

### New MCP Tools

| Tool | Purpose |
|------|---------|
| `get_accessibility_guide` | ARIA patterns, keyboard nav requirements |
| `get_anti_patterns` | Common mistakes to avoid |
| `get_composition_rules` | How components work together |
| `validate_component_usage` | Check if usage follows best practices |

### Guidance Structure

```typescript
interface ComponentGuidance {
  accessibility: {
    required: string[];      // Must-have ARIA attributes
    recommended: string[];   // Should-have attributes
    keyboardNav: string[];   // Keyboard interaction requirements
  };
  antiPatterns: {
    pattern: string;
    why: string;
    instead: string;
  }[];
  compositionRules: {
    canContain: string[];    // Valid child components
    mustBeIn: string[];      // Required parent components
    incompatibleWith: string[];
  };
}
```

---

## Timeline

| Phase | Status | Priority |
|-------|--------|----------|
| Phase 1: Alpine.js | In Progress | High |
| Phase 2: Scaffolding | Not Started | High |
| Phase 3: Web Components | Not Started | Medium |
| Phase 4: AI Guidance | Not Started | Medium |

---

## Open Questions

1. **Naming convention** - `@mcpsystem/ui` or `@mcp-design/ui`?
2. **Theming approach** - CSS custom properties vs Tailwind integration?
3. **Bundle strategy** - Single bundle vs per-component bundles?
4. **SSR support** - Declarative Shadow DOM for server rendering?

---

## References

- [Lit Documentation](https://lit.dev/)
- [Alpine.js Documentation](https://alpinejs.dev/)
- [Web Components Best Practices](https://web.dev/custom-elements-best-practices/)
- [Open UI Component Standards](https://open-ui.org/)
