# Design System MCP Server

A production-ready MCP (Model Context Protocol) server that exposes design system components and style guides for AI assistants. Deployed on Vercel with SSE transport for remote access.

**Live Server:** https://aids-server.vercel.app/

## Features

- **Component Specifications**: Access detailed props, types, and descriptions for UI components
- **Code Examples**: Get ready-to-use code snippets for each component
- **Style Guide**: Retrieve colors, typography, spacing scales, and breakpoints
- **Search**: Find components by name, description, or category
- **SSE Transport**: Remote access via Server-Sent Events for web deployment

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Local Development

Run the MCP server locally via stdio:

```bash
npm run dev
```

### 3. Deploy to Vercel

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Deploy
vercel
```

## Project Structure

```
├── api/
│   ├── index.ts      # Landing page with server info
│   ├── health.ts     # Health check endpoint
│   └── mcp.ts        # MCP SSE transport endpoint
├── src/
│   ├── data/
│   │   ├── types.ts           # TypeScript type definitions
│   │   └── design-system.ts   # Design system data
│   └── server/
│       └── index.ts           # MCP server implementation
├── package.json
├── tsconfig.json
├── vercel.json
└── README.md
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `https://aids-server.vercel.app/api/mcp` | GET | Establish SSE connection |
| `https://aids-server.vercel.app/api/mcp?sessionId=...` | POST | Send MCP messages |
| `https://aids-server.vercel.app/api/health` | GET | Health check |
| `https://aids-server.vercel.app/` | GET | Server info page |

## Available MCP Tools

### Component Tools

| Tool | Description |
|------|-------------|
| `list_components` | List all components with their categories |
| `get_component` | Get detailed specification for a component |
| `search_components` | Search components by name/description/category |
| `get_component_examples` | Get code examples for a component |

### Style Guide Tools

| Tool | Description |
|------|-------------|
| `get_style_guide` | Get entire style guide or specific section |
| `get_colors` | Get color tokens (optionally by category) |
| `get_typography` | Get typography styles |
| `get_spacing` | Get spacing scale tokens |
| `get_breakpoints` | Get responsive breakpoint definitions |
| `get_design_system_info` | Get design system overview and stats |

## Connecting to AI Assistants

### Cursor

1. Open Cursor Settings (`Cmd+,` on macOS or `Ctrl+,` on Windows/Linux)
2. Search for "MCP" or navigate to **Features → MCP Servers**
3. Click **"Add new MCP server"**
4. Configure with:
   - **Name:** `design-system`
   - **Type:** `sse`
   - **URL:** `https://aids-server.vercel.app/api/mcp`

Alternatively, add to your `.cursor/mcp.json` file:

```json
{
  "mcpServers": {
    "design-system": {
      "url": "https://aids-server.vercel.app/api/mcp"
    }
  }
}
```

### Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "design-system": {
      "url": "https://aids-server.vercel.app/api/mcp"
    }
  }
}
```

### Claude Code CLI

Add to your `.claude/settings.json`:

```json
{
  "mcpServers": {
    "design-system": {
      "url": "https://aids-server.vercel.app/api/mcp"
    }
  }
}
```

## Customizing the Design System

### Modifying Components

Edit `src/data/design-system.ts` to add or modify components. Each component follows this structure:

```typescript
{
  name: "ComponentName",
  description: "Component description",
  category: "Category",
  importStatement: "import { ComponentName } from '@your-lib'",
  props: [
    {
      name: "propName",
      type: "string | number",
      required: true,
      default: "'value'",
      description: "What this prop does"
    }
  ],
  examples: [
    {
      title: "Example Title",
      description: "Optional description",
      code: `<ComponentName prop="value" />`
    }
  ],
  relatedComponents: ["OtherComponent"]
}
```

### Modifying Style Guide

Update the `styleGuide` object in `src/data/design-system.ts`:

- **Colors**: Organized by category (Primary, Neutral, Semantic, etc.)
- **Typography**: Font family, size, weight, line-height for each style
- **Spacing**: Token name, CSS value, and pixel equivalent
- **Breakpoints**: Responsive breakpoint values and descriptions

### Important: Update API File

When modifying the design system data, also update the inline data in `api/mcp.ts` to match, as Vercel serverless functions bundle dependencies differently.

## Development

### Type Checking

```bash
npm run typecheck
```

### Building

```bash
npm run build
```

## Troubleshooting

### SSE Connection Issues

- Ensure your client supports SSE transport for MCP
- Check that CORS headers are properly configured for your client origin
- Vercel has a 60-second timeout for serverless functions; long-running connections may be terminated

### Session Not Found

When receiving "Session not found" errors, ensure you:
1. First establish an SSE connection via GET to `/api/mcp`
2. Use the returned `sessionId` for subsequent POST requests
3. Reconnect if the session expires or connection is lost

## License

MIT
