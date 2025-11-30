# mcpsystem.design MCP Server

A production-ready MCP (Model Context Protocol) server that exposes design system components and style guides for AI assistants. Deployed on Vercel with SSE transport for remote access.

**Live Server:** https://www.mcpsystem.design/

## Features

- **Component Specifications**: Access detailed props, types, and descriptions for UI components
- **Code Examples**: Get ready-to-use Tailwind CSS code snippets for each component
- **Style Guide**: Retrieve colors, typography, spacing scales, and breakpoints
- **Search**: Find components by name, description, or category
- **SSE Transport**: Remote access via Server-Sent Events for web deployment
- **Security Hardened**: Input validation, rate limiting, and structured logging

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
├── api/                    # Vercel Serverless Functions (legacy)
│   ├── index.ts            # Landing page API
│   ├── health.ts           # Health check endpoint
│   └── mcp.ts              # Legacy MCP endpoint (deprecated)
├── lib/
│   ├── design-system/      # Design system data
│   │   ├── index.ts        # Main exports and helpers
│   │   ├── components.ts   # Component definitions
│   │   ├── style-guide.ts  # Colors, typography, spacing
│   │   └── types.ts        # TypeScript types
│   ├── mcp/                # MCP protocol utilities
│   │   ├── schemas.ts      # Zod validation schemas
│   │   ├── errors.ts       # JSON-RPC error codes
│   │   ├── logger.ts       # Structured logging
│   │   └── types.ts        # TypeScript types
│   └── security/           # Security utilities
│       ├── host-validator.ts  # Host header validation
│       └── rate-limiter.ts    # Rate limiting
├── components/             # React components for the website
├── scripts/                # Build and validation scripts
│   ├── validate-css-tokens.ts       # CSS token validation
│   └── validate-component-colors.ts # Component color validation
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
   - **Name:** `mcpdesignsystem`
   - **Type:** `sse`
   - **URL:** `https://www.mcpsystem.design/sse`

Alternatively, add to your `.cursor/mcp.json` file:

```json
{
  "mcpServers": {
    "mcpdesignsystem": {
      "url": "https://www.mcpsystem.design/sse"
    }
  }
}
```

### Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "mcpdesignsystem": {
      "url": "https://www.mcpsystem.design/sse"
    }
  }
}
```

### Claude Code CLI

Add to your `.claude/settings.json`:

```json
{
  "mcpServers": {
    "mcpdesignsystem": {
      "url": "https://www.mcpsystem.design/sse"
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
  usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
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

- **Colors**: Organized by category (Semantic tokens, Gray Scale, Accent)
- **Typography**: Font family, size, weight, line-height for each style
- **Spacing**: Token name, CSS value, and pixel equivalent
- **Breakpoints**: Responsive breakpoint values and descriptions

### Color Token Rules

Component examples must use **semantic color tokens** instead of raw Tailwind colors:

| Instead of | Use |
|------------|-----|
| `bg-gray-50`, `bg-gray-100` | `bg-surface`, `bg-surface-raised`, `bg-surface-sunken` |
| `text-gray-600`, `text-gray-400` | `text-default`, `text-muted`, `text-subtle` |
| `border-gray-200` | `border-default`, `border-muted`, `border-emphasis` |
| `bg-red-500`, `text-red-600` | `bg-error-emphasis`, `text-error-foreground` |
| `bg-green-500`, `text-emerald-600` | `bg-success-emphasis`, `text-success-foreground` |
| `bg-amber-500` | `bg-warning-emphasis`, `text-warning-foreground` |
| `bg-blue-500` | `bg-info-emphasis`, `text-info-foreground` |

## Validation

The project includes two validation scripts that run automatically on build:

### CSS Token Validation

Ensures CSS variables in `globals.css` match the design tokens in `style-guide.ts`:

```bash
npm run validate:tokens
```

### Component Color Validation

Ensures component examples use semantic color tokens instead of raw Tailwind colors:

```bash
npm run validate:component-colors
```

### Run All Validations

```bash
npm run validate
```

**Always run `npm run validate` before committing changes to ensure design system consistency.**

## Development

### Type Checking

```bash
npm run typecheck
```

### Validation

```bash
npm run validate          # Run all validations (recommended before commits)
npm run validate:tokens   # CSS token validation only
npm run validate:component-colors  # Component color validation only
```

### Building

```bash
npm run build             # Runs validation + production build
```

## Security

The SSE endpoint includes several security hardening measures:

### Input Validation
- All JSON-RPC requests are validated using Zod schemas
- Tool arguments are type-checked before execution
- Batch requests limited to 100 items maximum

### Rate Limiting
- 100 requests per minute per IP address
- Returns HTTP 429 with `Retry-After` header when exceeded
- In-memory rate limiting (resets on cold starts)

### Host Header Validation
- Whitelist-based validation prevents host header injection
- Allowed hosts: `www.mcpsystem.design`, `mcpsystem.design`, `localhost`
- Invalid hosts default to `www.mcpsystem.design`

### Structured Logging
- All requests include unique request IDs (`X-Request-Id` header)
- JSON-formatted logs for Vercel log aggregation
- Request tracing for debugging and auditing

## Troubleshooting

### SSE Connection Issues

- Ensure your client supports SSE transport for MCP
- Check that CORS headers are properly configured for your client origin
- Vercel has a 60-second timeout for serverless functions; long-running connections may be terminated

### Connection Drops

The SSE endpoint sends periodic ping messages to keep the connection alive. If your client disconnects frequently, check your network configuration or proxy settings.

### Rate Limit Errors (HTTP 429)

If you receive a 429 status code, you've exceeded the rate limit (100 requests/minute). Wait for the duration specified in the `Retry-After` header before retrying.

## License

MIT
