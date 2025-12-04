# Testing @mcpsystem/ui Locally (Before Publishing)

This guide shows how to test the `@mcpsystem/ui` package in a separate repository before it's published to npm.

## Prerequisites

First, build the package:

```bash
cd packages/ui
npm install
npm run build
```

Verify the `dist/` folder exists with compiled JavaScript and TypeScript definitions.

---

## Method 1: npm link (Best for Active Development)

Creates a symlink so changes reflect immediately (after rebuild).

**In the package directory:**
```bash
cd /path/to/aids-mcp/packages/ui
npm link
```

**In your test repo:**
```bash
npm link @mcpsystem/ui
```

**Use in code:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Test @mcpsystem/ui</title>
</head>
<body>
  <h1>Testing Web Components</h1>

  <mcp-chat-message role="user">Hello!</mcp-chat-message>
  <mcp-chat-message role="assistant">Hi there!</mcp-chat-message>
  <mcp-typing-indicator></mcp-typing-indicator>

  <script type="module">
    import '@mcpsystem/ui';
  </script>
</body>
</html>
```

**Workflow:**
1. Make changes in `packages/ui/src/`
2. Run `npm run build` in package directory
3. Refresh browser in test repo (changes appear automatically)

**When done:**
```bash
# In test repo
npm unlink @mcpsystem/ui

# In package directory
npm unlink
```

**Common issues:**
- If module not found: Verify `npm link` succeeded (check `npm ls -g --depth=0`)
- If changes don't appear: Make sure you rebuilt (`npm run build`)

---

## Method 2: npm pack (Most Realistic)

Creates a `.tgz` tarball that mimics what npm publishes.

**In the package directory:**
```bash
cd /path/to/aids-mcp/packages/ui
npm pack
# Creates: mcpsystem-ui-0.1.0.tgz
```

**In your test repo:**
```bash
npm install /path/to/aids-mcp/packages/ui/mcpsystem-ui-0.1.0.tgz
```

**Use in code:** (same as Method 1)

**Workflow for updates:**
1. Make changes in `packages/ui/src/`
2. Run `npm run build`
3. Run `npm pack` (creates new tarball)
4. In test repo: `npm install /path/to/tarball` (reinstall)

**Common issues:**
- Tarball doesn't include files: Check `"files"` field in `package.json`
- Old version cached: Delete `node_modules/@mcpsystem/ui` before reinstall

---

## Method 3: file: Protocol (Simplest)

Reference the local directory directly.

**In your test repo's `package.json`:**
```json
{
  "dependencies": {
    "@mcpsystem/ui": "file:../aids-mcp/packages/ui"
  }
}
```

**Install:**
```bash
npm install
```

**Use in code:** (same as Method 1)

**Common issues:**
- Path must be relative to your test repo's `package.json`
- Some bundlers may not watch files outside project directory

---

## Minimal Test Repo Structure

```
my-test-repo/
├── package.json
├── index.html
└── node_modules/
```

**package.json:**
```json
{
  "name": "test-mcpsystem-ui",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "@mcpsystem/ui": "file:../aids-mcp/packages/ui"
  }
}
```

**index.html:** (see examples above)

**Run with a local server:**
```bash
npx serve .
# or
python3 -m http.server 8000
```

---

## Verification

**Check the browser console for:**
- No errors about missing modules
- Custom elements registered: `customElements.get('mcp-chat-message')`

**Test in console:**
```javascript
// Verify component is registered
console.log(customElements.get('mcp-chat-message')); // Should return class

// Create element programmatically
const msg = document.createElement('mcp-chat-message');
msg.role = 'user';
msg.textContent = 'Test message';
document.body.appendChild(msg);
```

---

## Troubleshooting

**"Failed to resolve module specifier" error:**
- Make sure you're serving files with a web server (not opening `file://` directly)
- Use `npx serve .` or similar

**TypeScript can't find types:**
```typescript
// Add to tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@mcpsystem/ui": ["./node_modules/@mcpsystem/ui/dist/index.d.ts"]
    }
  }
}
```

**Components don't appear:**
- Open browser DevTools → Check if custom elements are registered
- Verify Shadow DOM in Elements panel
- Check console for JavaScript errors

**Dark mode not working:**
- Components respect `prefers-color-scheme: dark` automatically
- Or add `class="dark"` to a parent element
