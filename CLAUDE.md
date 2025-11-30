# mcpsystem.design MCP Server

## Project Overview

This is a production-ready MCP (Model Context Protocol) server that exposes design system components and style guides to AI assistants. The project is built with Next.js and deployed on Vercel, using SSE (Server-Sent Events) transport for remote access.

**Live Server:** https://www.mcpsystem.design/sse

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
├── lib/
│   ├── design-system/         # Core design system data
│   │   ├── index.ts           # Main exports and helpers
│   │   ├── components.ts      # Component definitions
│   │   ├── style-guide.ts     # Colors, typography, spacing
│   │   └── types.ts           # TypeScript type definitions
│   ├── mcp/                   # MCP protocol utilities
│   │   ├── schemas.ts         # Zod validation schemas for JSON-RPC
│   │   ├── errors.ts          # JSON-RPC error codes and helpers
│   │   ├── logger.ts          # Structured logging with request IDs
│   │   └── types.ts           # TypeScript types derived from Zod
│   └── security/              # Security utilities
│       ├── host-validator.ts  # Host header whitelist validation
│       └── rate-limiter.ts    # In-memory rate limiting
├── components/                 # React UI components for website
│   └── docs/                   # Documentation/navigation components
│       ├── Sidebar.tsx         # Unified sidebar with accordion navigation
│       ├── MobileDrawer.tsx    # Mobile navigation drawer
│       ├── DocsHeader.tsx      # Site header/navbar
│       └── ThemeToggle.tsx     # Dark mode toggle
├── scripts/                    # Build and validation scripts
│   ├── validate-css-tokens.ts        # CSS token validation
│   └── validate-component-colors.ts  # Component color validation
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

#### MCP Server
- **`app/api/sse/route.ts`** - Main MCP SSE endpoint that handles tool calls
- **`lib/mcp/schemas.ts`** - Zod validation schemas for JSON-RPC requests
- **`lib/mcp/errors.ts`** - JSON-RPC 2.0 error codes and response helpers
- **`lib/security/host-validator.ts`** - Host header whitelist validation
- **`lib/security/rate-limiter.ts`** - In-memory rate limiting (100 req/min/IP)

#### Design System
- **`lib/design-system/components.ts`** - Component pattern definitions with class variations, examples, and metadata
- **`lib/design-system/style-guide.ts`** - Design tokens (colors, typography, spacing, breakpoints) - **Single source of truth**
- **`lib/design-system/types.ts`** - TypeScript interfaces for the design system
- **`lib/design-system/index.ts`** - Main exports, helpers, and **navigation data** (`getAllNavigation()`)
- **`lib/design-system/generate-css.ts`** - Utility for generating CSS from design tokens (reference implementation)

#### Navigation Components
- **`components/docs/Sidebar.tsx`** - Unified sidebar with accordion navigation for all pages
- **`components/docs/MobileDrawer.tsx`** - Mobile navigation drawer (reuses Sidebar)
- **`components/docs/DocsHeader.tsx`** - Site header/navbar

#### Component Page Components
- **`components/component-page/ClassVariationsTable.tsx`** - Displays Tailwind class variations (variants, sizes, states)
- **`components/component-page/SectionTabs.tsx`** - Tab navigation for component page sections (Overview, Classes, Guidelines, Examples)

#### Validation Scripts
- **`scripts/validate-css-tokens.ts`** - Validates CSS variables match design tokens
- **`scripts/validate-component-colors.ts`** - Validates component examples use semantic color tokens

## Development Guidelines

### Code Conventions

1. **TypeScript:** Use strict typing throughout. All design system data is fully typed.
2. **File Organization:** Keep design system data in `lib/design-system/`, UI components in `components/`, pages in `app/`
3. **Component Structure:** Each component pattern includes:
   - name, slug, description, category
   - specs with class variations (variants, sizes, states) showing actual Tailwind classes
   - code examples with Tailwind CSS
   - related components for discoverability
   - **Note:** These are Tailwind CSS patterns, not React components. Users copy HTML and swap classes.

4. **Style Guide Structure:** Organized by:
   - Colors (by category: Semantic, Gray Scale, Accent)
   - Typography (font family, sizes, weights, line heights)
   - Spacing (tokens with CSS values and pixel equivalents)
   - Breakpoints (responsive breakpoint values)

5. **Design Token System:**
   - Design tokens in `lib/design-system/style-guide.ts` are the single source of truth
   - CSS variables in `app/globals.css` are validated against design tokens
   - Component examples in `lib/design-system/components.ts` must use semantic color tokens
   - Semantic tokens include both light and dark mode variants with CSS variable mapping
   - **Two validation scripts run automatically on build:**
     - `validate:tokens` - Ensures CSS variables match design tokens
     - `validate:component-colors` - Ensures component examples use semantic tokens (not raw Tailwind colors)
   - Run `npm run validate` to run both validations together

6. **Navigation Architecture:**
   - **Single Source of Truth:** `getAllNavigation()` in `lib/design-system/index.ts` returns complete site navigation
   - **Structure:** 3 main sections (Home, Docs, Components) - all expanded by default
   - **Unified Sidebar:** `components/docs/Sidebar.tsx` with accordion functionality used across all pages
   - **Mobile Support:** `MobileDrawer.tsx` reuses Sidebar component with `isMobile` prop
   - **Auto-expand:** Active section automatically expands based on current route
   - **Navigation Types:**
     - `NavItem` - Single link in sidebar
     - `NavCategory` - Group of items under a section (e.g., "Actions" under "Components")
     - `NavSection` - Top-level collapsible accordion group

### Adding/Modifying Components

When adding or modifying component patterns in `lib/design-system/components.ts`:

```typescript
{
  name: "ComponentName",
  slug: "component-name",          // URL-friendly slug
  description: "Brief description",
  category: "Category",             // Forms, Layout, etc.
  usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
  tailwind: true,                   // Whether it uses Tailwind CSS
  specs: {                          // Class variations - show which Tailwind classes to swap
    variants: [
      { name: "Primary", classes: "bg-primary text-primary-foreground hover:bg-primary-hover" },
      { name: "Secondary", classes: "bg-surface-hover text-default" }
    ],
    sizes: [
      { name: "Small", classes: "h-8 px-3 text-xs" },
      { name: "Medium", classes: "h-10 px-4 text-sm", description: "Default size" }
    ],
    states: [
      { name: "Disabled", classes: "opacity-70 cursor-not-allowed", description: "Add disabled attribute" }
    ]
  },
  examples: [
    {
      title: "Example Title",
      code: `<div className="...">Example</div>`,
      preview: "preview-id",         // Optional preview identifier
      interactive: "alpine"          // Optional: indicates Alpine.js required
    }
  ],
  relatedComponents: ["OtherComponent"]
}
```

**Important:** The `specs` field documents which Tailwind classes to swap for different variations. This is honest documentation - users copy HTML and change classes, not pass props to components.

### Modifying Style Guide

Update `lib/design-system/style-guide.ts` to change design tokens:

- **Colors:** Add to appropriate category with:
  - `name`: Token name (e.g., "surface")
  - `value`: Light mode color value (hex)
  - `darkValue`: (Optional) Dark mode color value
  - `cssVar`: (Optional) CSS variable name (e.g., "--color-surface")
  - `usage`: Description of intended use
- **Typography:** Define font family, size, weight, line height
- **Spacing:** Token name, CSS value (e.g., "1rem"), pixel value
- **Breakpoints:** Name, value, description of typical usage

**IMPORTANT:** After modifying design tokens or component examples:
1. Update the corresponding CSS variables in `app/globals.css` (@theme block)
2. Run `npm run validate` to verify both CSS and component colors
3. Fix any validation errors before committing

**Component Color Rules:**
- Use semantic tokens (`bg-surface`, `text-muted`, `border-default`, etc.) instead of raw Tailwind colors
- Avoid raw colors like `bg-gray-500`, `text-red-600` - use `bg-surface-hover`, `text-error-emphasis` instead
- Exceptions exist for gradients, code highlighting, and specific UI patterns (see `scripts/validate-component-colors.ts`)

### Modifying Navigation

To add or modify site navigation, update `getAllNavigation()` in `lib/design-system/index.ts`:

**Adding a new docs page:**
```typescript
{
  id: 'docs',
  title: 'Docs',
  items: [
    {
      title: 'Getting Started',
      href: '/docs/getting-started',
    },
    {
      title: 'New Doc Page',  // Add here
      href: '/docs/new-page',
    },
  ],
}
```

**Adding a new top-level section:**
```typescript
export function getAllNavigation(): NavSection[] {
  return [
    // ... existing sections
    {
      id: 'new-section',
      title: 'New Section',
      items: [
        { title: 'Page 1', href: '/new-section/page1' },
        { title: 'Page 2', href: '/new-section/page2' },
      ],
    },
  ];
}
```

**Notes:**
- Component categories are auto-generated from `categories` in `lib/design-system/style-guide.ts`
- Sidebar automatically shows all sections expanded by default
- Active section/item is highlighted based on current route

### Testing Changes

1. **Type check:** `npm run typecheck`
2. **Validate all:** `npm run validate` - Runs both validation scripts (ALWAYS run this before committing)
   - `npm run validate:tokens` - Validates CSS variables match design tokens
   - `npm run validate:component-colors` - Validates component examples use semantic tokens
3. **Local dev:** `npm run dev` - Test at http://localhost:3000/api/sse
4. **Build check:** `npm run build` - Runs all validations + production build
5. **Deploy:** `vercel` - Deploy to preview environment

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
    "mcpdesignsystem": {
      "url": "https://www.mcpsystem.design/sse"
    }
  }
}
```

### Claude Desktop
Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:
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
Add to `.claude/settings.json`:
```json
{
  "mcpServers": {
    "mcpdesignsystem": {
      "url": "https://www.mcpsystem.design/sse"
    }
  }
}
```

## Security

The SSE endpoint includes comprehensive security hardening:

### Input Validation
- All JSON-RPC requests validated with Zod schemas (`lib/mcp/schemas.ts`)
- Tool arguments type-checked before execution
- Batch requests limited to 100 items maximum

### Rate Limiting
- 100 requests per minute per IP address
- Returns HTTP 429 with `Retry-After` header when exceeded
- In-memory rate limiting (resets on serverless cold starts)

### Host Header Validation
- Whitelist-based validation prevents host header injection attacks
- Allowed hosts: `www.mcpsystem.design`, `mcpsystem.design`, `localhost:3000`
- Invalid hosts default to `www.mcpsystem.design`

### Error Handling
- Standard JSON-RPC 2.0 error codes (-32700, -32600, -32601, -32602)
- Structured error responses with request IDs
- All errors logged with context for debugging

### Structured Logging
- Unique request IDs for all requests (`X-Request-Id` header)
- JSON-formatted logs compatible with Vercel log aggregation
- Request tracing for debugging and security auditing

## Important Notes

### Vercel Serverless Limitations
- **Timeout:** 60 seconds for serverless functions
- **SSE Keep-Alive:** Periodic ping messages sent to maintain connection
- **Cold Starts:** First request may be slower due to cold start
- **Rate Limiting:** In-memory rate limits reset on cold starts

### CORS Configuration
- CORS headers are configured in `app/api/sse/route.ts`
- Currently allows all origins (`*`) for public API access

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
- Run `npm run validate` to check design token and component color validation
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
- Add class variations to more components (currently Button, Input, Badge, Card, Alert have full specs)
- Build AI-first Web Components in `packages/ui/` (see `docs/ROADMAP.md`)
