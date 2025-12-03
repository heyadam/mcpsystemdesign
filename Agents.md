# mcpsystem.design — Agent Guide

> Codex policy: Whenever you make a change to this repo, also refresh this Agents.md with any new behavior, tools, or endpoints you touched.

How to use this MCP server effectively from an AI agent. The server is a Next.js 14 app that serves design-system data over Model Context Protocol with SSE transport.

## Endpoints
- SSE: `GET /sse` (or `/api/sse`) streams a one-time `endpoint` event and 30s ping comments.
- JSON-RPC: `POST /sse` (or `/api/sse`) accepts MCP JSON-RPC 2.0 requests.
- Host validation whitelists production and localhost; invalid hosts are rewritten to `https://www.mcpsystem.design/sse`.
- Rate limiting: 100 requests/min/IP (returns 429 with `Retry-After`).

## Tool Catalog
- Pattern tools (Tailwind CSS HTML): `list_patterns`, `get_pattern`, `search_patterns`, `get_pattern_examples`.
- Style guide tools (tokens): `get_style_guide`, `get_colors`, `get_typography`, `get_spacing`, `get_breakpoints`, `get_design_system_info`.
- Web component tools (@mcpsystem/ui Lit elements): `list_components`, `get_component`, `search_components`.

## JSON-RPC Flow (MCP)
1) `initialize` → returns `protocolVersion`, `capabilities`.
2) `tools/list` → enumerates the 13 tools above.
3) `tools/call` → execute a tool. Arguments are JSON objects; errors are returned as `isError: true` payloads.

Example request to fetch a pattern:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "get_pattern",
    "arguments": { "patternName": "Button" }
  }
}
```
Success responses wrap data in `result.content[0].text` (often stringified JSON or Markdown).

## Return Shapes to Expect
- `list_patterns` → JSON string with `patternsByCategory`.
- `get_pattern` → JSON string describing a pattern (name, slug, description, category, `specs`, `examples`). `patternName` is case-insensitive.
- `get_pattern_examples` → Markdown string with usage note, class variations, and fenced HTML examples.
- `get_style_guide`/`get_colors`/`get_typography`/`get_spacing`/`get_breakpoints` → JSON string of the requested token section(s).
- `list_components` → JSON string with package metadata and `{ name, tagName, description, category }` items.
- `get_component` → Markdown doc for a Lit web component (installation, usage, props, slots, CSS parts/props, events, examples). `tagName` required (e.g., `"mcp-chat-message"`).
- `search_*` tools → JSON string with `results` array matching the query.

## Usage Patterns for Agents
- Building HTML with Tailwind: prefer `get_pattern_examples` for copy-paste snippets and `get_pattern` for class variations (variants/sizes/states). Do not invent class tokens—swap the documented classes.
- Styling guidance: use `get_style_guide`/`get_colors` before choosing tokens. Semantic tokens are preferred over raw Tailwind colors.
- Web components: `list_components` to discover available AI chat elements; `get_component` for slot/prop details and ready-to-use HTML. Import syntax: `import '@mcpsystem/ui';`.
- Navigation awareness: categories and counts come from `get_design_system_info` and `list_patterns`; helpful for summarizing options to users.

## Local vs Remote
- Production: `https://www.mcpsystem.design/sse`.
- Local dev: `http://localhost:3000/sse` after `npm run dev` (host header must be whitelisted; localhost is allowed).

## Operational Notes
- Batch calls supported (array body) up to 100 items; invalid items return JSON-RPC errors.
- Structured logging and request IDs are added automatically (`X-Request-Id` header).
- If a tool name/args are missing, the server returns JSON-RPC errors rather than throwing.
- Global base styles hide horizontal overflow on `html`/`body` to prevent iPhone horizontal scrolling on the landing page.
- Landing page full-bleed sections only use negative horizontal margins at `md`+ breakpoints; mobile uses normal padding to avoid clipped content on iPhone.
- Landing page MCP config code block now wraps (`whitespace-pre-wrap break-words`) to avoid clipping long URLs on small screens.
