# AIDS - AI Design System MCP Server

## Project Overview

This is a production-ready MCP (Model Context Protocol) server that exposes design system components and style guides to AI assistants. The project is built with Next.js and deployed on Vercel, using SSE (Server-Sent Events) transport for remote access.

**Live Server:** https://aids-server.vercel.app/

## Architecture

### Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Runtime:** Node.js 18+
- **Protocol:** MCP (Model Context Protocol) SDK v1.0
- **Transport:** SSE (Server-Sent Events)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Deployment:** Vercel (serverless)

### Project Structure

```
├── app/                        # Next.js App Router
│   ├── api/sse/route.ts       # Main MCP SSE transport endpoint
│   ├── components/            # Component documentation pages
│   │   ├── [slug]/page.tsx   # Dynamic component detail pages
│   │   ├── page.tsx          # Component list page
│   │   └── layout.tsx        # Components section layout
│   ├── docs/                  # Documentation pages
│   │   ├── page.tsx          # Docs home
│   │   ├── layout.tsx        # Docs section layout
│   │   └── getting-started/  # Getting started guide
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Landing page
├── api/                        # Vercel Serverless Functions (legacy)
│   ├── index.ts               # Landing page API
│   ├── health.ts              # Health check endpoint
│   └── mcp.ts                 # Deprecated MCP endpoint
├── lib/design-system/          # Core design system data
│   ├── index.ts               # Main exports and helpers
│   ├── components.ts          # Component definitions
│   ├── style-guide.ts         # Colors, typography, spacing
│   └── types.ts               # TypeScript type definitions
├── components/                 # React UI components for website
├── package.json
├── tsconfig.json
└── vercel.json                # Vercel deployment config
```

## Core Functionality

### MCP Tools Provided

The server exposes 10 MCP tools organized into two categories:

#### Component Tools
1. `list_components` - List all components with categories
2. `get_component` - Get detailed specification for a component
3. `search_components` - Search components by name/description/category
4. `get_component_examples` - Get code examples for a component

#### Style Guide Tools
5. `get_style_guide` - Get entire style guide or specific section
6. `get_colors` - Get color tokens (optionally by category)
7. `get_typography` - Get typography styles
8. `get_spacing` - Get spacing scale tokens
9. `get_breakpoints` - Get responsive breakpoint definitions
10. `get_design_system_info` - Get design system overview and stats

### Key Files

- **`app/api/sse/route.ts`** - Main MCP SSE endpoint that handles tool calls
- **`lib/design-system/components.ts`** - Component definitions with props, examples, and metadata
- **`lib/design-system/style-guide.ts`** - Design tokens (colors, typography, spacing, breakpoints)
- **`lib/design-system/types.ts`** - TypeScript interfaces for the design system

## Development Guidelines

### Code Conventions

1. **TypeScript:** Use strict typing throughout. All design system data is fully typed.
2. **File Organization:** Keep design system data in `lib/design-system/`, UI components in `components/`, pages in `app/`
3. **Component Structure:** Each component definition includes:
   - name, slug, description, category
   - props with types, required status, defaults
   - code examples with Tailwind CSS
   - related components for discoverability

4. **Style Guide Structure:** Organized by:
   - Colors (by category: Gray Scale, Accent, Feedback, etc.)
   - Typography (font family, sizes, weights, line heights)
   - Spacing (tokens with CSS values and pixel equivalents)
   - Breakpoints (responsive breakpoint values)

### Adding/Modifying Components

When adding or modifying components in `lib/design-system/components.ts`:

```typescript
{
  name: "ComponentName",
  slug: "component-name",          // URL-friendly slug
  description: "Brief description",
  category: "Category",             // Forms, Layout, etc.
  importStatement: "import { ComponentName } from '@your-lib'",
  tailwind: true,                   // Whether it uses Tailwind CSS
  props: [
    {
      name: "propName",
      type: "string | number",      // TypeScript type
      required: true,
      default: "'value'",           // As a string
      description: "What this prop does"
    }
  ],
  examples: [
    {
      title: "Example Title",
      code: `<div className="...">Example</div>`,
      preview: "preview-id"         // Optional preview identifier
    }
  ],
  relatedComponents: ["OtherComponent"]
}
```

### Modifying Style Guide

Update `lib/design-system/style-guide.ts` to change design tokens:

- **Colors:** Add to appropriate category, include name, hex value, usage description
- **Typography:** Define font family, size, weight, line height
- **Spacing:** Token name, CSS value (e.g., "1rem"), pixel value
- **Breakpoints:** Name, value, description of typical usage

### Testing Changes

1. **Type check:** `npm run typecheck`
2. **Local dev:** `npm run dev` - Test at http://localhost:3000/api/sse
3. **Build check:** `npm run build` - Ensure production build succeeds
4. **Deploy:** `vercel` - Deploy to preview environment

## Common Tasks

### Running the Development Server

```bash
npm run dev
```

The MCP SSE endpoint will be available at `http://localhost:3000/api/sse`

### Type Checking

```bash
npm run typecheck
```

### Building for Production

```bash
npm run build
```

### Deploying to Vercel

```bash
vercel              # Deploy to preview
vercel --prod       # Deploy to production
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/sse` | GET | Establish SSE connection for MCP |
| `/api/sse` | POST | Send MCP JSON-RPC messages |
| `/api/health` | GET | Health check endpoint |
| `/` | GET | Landing page with server info |

## Integration with AI Assistants

This server is designed to be connected to AI assistants via MCP:

### Cursor
Add to `.cursor/mcp.json`:
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
Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:
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
Add to `.claude/settings.json`:
```json
{
  "mcpServers": {
    "aids": {
      "url": "https://aids-server.vercel.app/sse"
    }
  }
}
```

## Important Notes

### Vercel Serverless Limitations
- **Timeout:** 60 seconds for serverless functions
- **SSE Keep-Alive:** Periodic ping messages sent to maintain connection
- **Cold Starts:** First request may be slower due to cold start

### CORS Configuration
- CORS headers are configured in `app/api/sse/route.ts`
- Adjust as needed for different client origins

### Dark Mode Support
- The website includes dark mode toggle functionality
- Dark mode preferences are stored in localStorage
- Theme switching is handled via CSS classes

## Git Workflow

- **Main Branch:** `main`
- **Feature Branches:** Create feature branches for new work
- **Commits:** Use conventional commit messages
- **Pull Requests:** Create PRs against `main` branch

## Dependencies

### Core Dependencies
- `@modelcontextprotocol/sdk` - MCP protocol implementation
- `next` - Next.js framework
- `react` / `react-dom` - React library
- `shiki` - Syntax highlighting for code examples
- `zod` - Schema validation

### Dev Dependencies
- `typescript` - TypeScript compiler
- `tailwindcss` - Tailwind CSS framework
- `tsx` - TypeScript execution for development
- `@vercel/node` - Vercel serverless function types

## Troubleshooting

### SSE Connection Issues
- Ensure client supports SSE transport for MCP
- Check CORS headers in `app/api/sse/route.ts`
- Verify network/proxy settings

### Build Failures
- Run `npm run typecheck` to catch type errors
- Check Next.js build output for specific errors
- Ensure all dependencies are installed: `npm install`

### Deployment Issues
- Verify Vercel configuration in `vercel.json`
- Check deployment logs in Vercel dashboard
- Ensure environment variables are set (if any)

## Future Enhancements

Consider these when extending the project:
- Add more component categories
- Implement component versioning
- Add analytics for tool usage
- Create component playground/sandbox
- Add dark mode tokens to style guide
- Implement component search by props/types
