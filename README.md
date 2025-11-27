# AIDS - AI Design System MCP Server

A production-ready MCP (Model Context Protocol) server that exposes design system components and style guides for AI assistants. Deployed on Vercel with SSE transport for remote access.

**Live Server:** https://aids-server.vercel.app/

## Features

- **Component Specifications**: Access detailed props, types, and descriptions for UI components
- **Code Examples**: Get ready-to-use Tailwind CSS code snippets for each component
- **Style Guide**: Retrieve colors, typography, spacing scales, and breakpoints
- **Search**: Find components by name, description, or category
- **SSE Transport**: Remote access via Server-Sent Events for web deployment

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Local Development

Run the Next.js development server:

```bash
npm run dev
```

The MCP SSE endpoint will be available at `http://localhost:3000/api/sse`

### 3. Deploy to Vercel

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Deploy
vercel
```

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/
│   │   └── sse/
│   │       └── route.ts    # MCP SSE transport endpoint
│   ├── components/         # Component documentation pages
│   ├── docs/               # Documentation pages
│   └── page.tsx            # Landing page
├── api/                    # Vercel Serverless Functions
│   ├── index.ts            # Landing page API
│   ├── health.ts           # Health check endpoint
│   └── mcp.ts              # Legacy MCP endpoint (deprecated)
├── lib/
│   └── design-system/      # Design system data
│       ├── index.ts        # Main exports and helpers
│       ├── components.ts   # Component definitions
│       ├── style-guide.ts  # Colors, typography, spacing
│       └── types.ts        # TypeScript types
├── components/             # React components for the website
├── package.json
├── tsconfig.json
├── vercel.json
└── README.md
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/sse` or `/api/sse` | GET | Establish SSE connection |
| `/sse` or `/api/sse` | POST | Send MCP JSON-RPC messages |
| `/api/health` | GET | Health check |
| `/` | GET | Server info page |

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
   - **Name:** `aids`
   - **Type:** `sse`
   - **URL:** `https://aids-server.vercel.app/sse`

Alternatively, add to your `.cursor/mcp.json` file:

```json
{
  "mcpServers": {
    "aids": {
      "url": "https://aids-server.vercel.app/sse"
    }
  }
}
```

### Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "aids": {
      "url": "https://aids-server.vercel.app/sse"
    }
  }
}
```

### Claude Code CLI

Add to your `.claude/settings.json`:

```json
{
  "mcpServers": {
    "aids": {
      "url": "https://aids-server.vercel.app/sse"
    }
  }
}
```

## Customizing the Design System

### Modifying Components

Edit `lib/design-system/components.ts` to add or modify components. Each component follows this structure:

```typescript
{
  name: "ComponentName",
  slug: "component-name",
  description: "Component description",
  category: "Category",
  importStatement: "import { ComponentName } from '@your-lib'",
  tailwind: true,
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
      code: `<div className="...">Example</div>`,
      preview: "preview-id"
    }
  ],
  relatedComponents: ["OtherComponent"]
}
```

### Modifying Style Guide

Update `lib/design-system/style-guide.ts`:

- **Colors**: Organized by category (Gray Scale, Accent, etc.)
- **Typography**: Font family, size, weight, line-height for each style
- **Spacing**: Token name, CSS value, and pixel equivalent
- **Breakpoints**: Responsive breakpoint values and descriptions

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

### Connection Drops

The SSE endpoint sends periodic ping messages to keep the connection alive. If your client disconnects frequently, check your network configuration or proxy settings.

## License

MIT
