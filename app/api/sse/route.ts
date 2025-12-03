import { NextRequest, NextResponse } from 'next/server';
import {
  designSystem,
  getComponentByName,
  searchComponents,
  getAllCategories,
  styleGuide
} from '@/lib/design-system';
import {
  getAllWebComponents,
  getWebComponentByTag,
  searchWebComponents,
} from '@/lib/design-system/web-components';
import {
  JsonRpcRequestSchema,
  BatchRequestSchema,
  PatternNameArgsSchema,
  SearchArgsSchema,
  StyleGuideSectionSchema,
  GenerateBoilerplateArgsSchema,
} from '@/lib/mcp/schemas';
import {
  JsonRpcErrorCodes,
  createErrorResponse,
  formatZodError,
} from '@/lib/mcp/errors';
import { generateRequestId, createLogger } from '@/lib/mcp/logger';
import type { ToolResult, JsonRpcRequest } from '@/lib/mcp/types';
import { validateHost, buildEndpointUrl } from '@/lib/security/host-validator';
import { checkRateLimit, getClientIp } from '@/lib/security/rate-limiter';

// Tool definitions for MCP
const tools = [
  // Tailwind pattern tools (copy-paste HTML with class variations)
  { name: "list_patterns", description: "List all Tailwind CSS patterns (copy-paste HTML with class variations)", inputSchema: { type: "object", properties: {}, required: [] } },
  { name: "get_pattern", description: "Get detailed Tailwind pattern with class variations for variants, sizes, and states", inputSchema: { type: "object", properties: { patternName: { type: "string", description: "Pattern name (e.g., 'Button', 'Card')" } }, required: ["patternName"] } },
  { name: "search_patterns", description: "Search Tailwind patterns by name, description, or category", inputSchema: { type: "object", properties: { query: { type: "string", description: "Search query" } }, required: ["query"] } },
  { name: "get_pattern_examples", description: "Get code examples for a Tailwind pattern", inputSchema: { type: "object", properties: { patternName: { type: "string", description: "Pattern name" } }, required: ["patternName"] } },
  // Style guide tools
  { name: "get_style_guide", description: "Get style guide (colors, typography, spacing, breakpoints)", inputSchema: { type: "object", properties: { section: { type: "string", enum: ["colors", "typography", "spacing", "breakpoints", "all"] } }, required: [] } },
  { name: "get_colors", description: "Get color tokens", inputSchema: { type: "object", properties: { category: { type: "string" } }, required: [] } },
  { name: "get_typography", description: "Get typography scale", inputSchema: { type: "object", properties: {}, required: [] } },
  { name: "get_spacing", description: "Get spacing scale", inputSchema: { type: "object", properties: {}, required: [] } },
  { name: "get_breakpoints", description: "Get breakpoints", inputSchema: { type: "object", properties: {}, required: [] } },
  { name: "get_design_system_info", description: "Get design system overview", inputSchema: { type: "object", properties: {}, required: [] } },
  // @mcpsystem/ui component tools (import and use)
  { name: "list_components", description: "List all @mcpsystem/ui components for AI chat interfaces", inputSchema: { type: "object", properties: {}, required: [] } },
  { name: "get_component", description: "Get component documentation including props, events, CSS parts, and examples", inputSchema: { type: "object", properties: { tagName: { type: "string", description: "Component tag name (e.g., 'mcp-chat-message')" } }, required: ["tagName"] } },
  { name: "search_components", description: "Search @mcpsystem/ui components by name or description", inputSchema: { type: "object", properties: { query: { type: "string", description: "Search query" } }, required: ["query"] } },
  // Boilerplate generation tool
  { name: "generate_boilerplate", description: "Generate a starter HTML page with Tailwind CSS, Lit, and @mcpsystem/ui pre-configured", inputSchema: { type: "object", properties: { projectName: { type: "string", description: "Project name for the page title (default: 'My Project')" }, theme: { type: "string", enum: ["light", "dark"], description: "Initial theme (default: 'light')" }, includeExamples: { type: "boolean", description: "Include example components (default: true)" } }, required: [] } },
];

// Execute tool with validated arguments
function executeTool(name: string, args: Record<string, unknown>): ToolResult {
  switch (name) {
    // Tailwind pattern tools
    case "list_patterns": {
      const byCategory = designSystem.components.reduce((acc, c) => {
        if (!acc[c.category]) acc[c.category] = [];
        acc[c.category].push({ name: c.name, description: c.description });
        return acc;
      }, {} as Record<string, { name: string; description: string }[]>);
      return { content: [{ type: "text", text: JSON.stringify({ designSystem: designSystem.name, version: designSystem.version, patternsByCategory: byCategory }, null, 2) }] };
    }

    case "get_pattern": {
      const patternName = typeof args.patternName === 'string' ? args.patternName : '';
      if (!patternName) {
        return { content: [{ type: "text", text: "Missing patternName argument" }], isError: true };
      }
      const pattern = getComponentByName(patternName);
      if (!pattern) {
        return { content: [{ type: "text", text: `Pattern not found. Available: ${designSystem.components.map(c => c.name).join(", ")}` }], isError: true };
      }
      // Return pattern without deprecated props field
      const { props: _props, ...patternData } = pattern;
      return { content: [{ type: "text", text: JSON.stringify(patternData, null, 2) }] };
    }

    case "search_patterns": {
      const parsed = SearchArgsSchema.safeParse(args);
      if (!parsed.success) {
        return { content: [{ type: "text", text: `Invalid arguments: ${formatZodError(parsed.error)}` }], isError: true };
      }
      const results = searchComponents(parsed.data.query);
      return { content: [{ type: "text", text: JSON.stringify({ query: parsed.data.query, results: results.map(c => ({ name: c.name, category: c.category, description: c.description })) }, null, 2) }] };
    }

    case "get_pattern_examples": {
      const patternName = typeof args.patternName === 'string' ? args.patternName : '';
      if (!patternName) {
        return { content: [{ type: "text", text: "Missing patternName argument" }], isError: true };
      }
      const pattern = getComponentByName(patternName);
      if (!pattern) {
        return { content: [{ type: "text", text: "Pattern not found" }], isError: true };
      }

      // Build class variations section if specs exist
      let classVariationsText = '';
      if (pattern.specs) {
        const sections: string[] = [];
        if (pattern.specs.variants?.length) {
          sections.push('**Variants:**\n' + pattern.specs.variants.map(v => `- ${v.name}: \`${v.classes}\``).join('\n'));
        }
        if (pattern.specs.sizes?.length) {
          sections.push('**Sizes:**\n' + pattern.specs.sizes.map(s => `- ${s.name}: \`${s.classes}\``).join('\n'));
        }
        if (pattern.specs.states?.length) {
          sections.push('**States:**\n' + pattern.specs.states.map(s => `- ${s.name}: \`${s.classes}\``).join('\n'));
        }
        if (sections.length) {
          classVariationsText = '\n## Class Variations\n\n' + sections.join('\n\n') + '\n';
        }
      }

      const examplesText = pattern.examples.map(e => {
        const description = e.description ? `\n${e.description}` : '';
        return `## ${e.title}${description}\n\n\`\`\`html\n${e.code}\n\`\`\``;
      }).join("\n\n");
      return { content: [{ type: "text", text: `# ${pattern.name}\n\n${pattern.description}\n\nUsage: ${pattern.usageNote}${classVariationsText}\n\n${examplesText}` }] };
    }

    case "get_style_guide": {
      const parsed = StyleGuideSectionSchema.safeParse(args);
      const section = parsed.success ? (parsed.data.section || "all") : "all";
      const sg = styleGuide as unknown as Record<string, unknown>;
      const data = section === "all" ? styleGuide : { [section]: sg[section] };
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }

    case "get_colors":
      return { content: [{ type: "text", text: JSON.stringify({ colors: styleGuide.colors }, null, 2) }] };

    case "get_typography":
      return { content: [{ type: "text", text: JSON.stringify({ typography: styleGuide.typography }, null, 2) }] };

    case "get_spacing":
      return { content: [{ type: "text", text: JSON.stringify({ spacing: styleGuide.spacing }, null, 2) }] };

    case "get_breakpoints":
      return { content: [{ type: "text", text: JSON.stringify({ breakpoints: styleGuide.breakpoints }, null, 2) }] };

    case "get_design_system_info":
      return { content: [{ type: "text", text: JSON.stringify({ name: designSystem.name, version: designSystem.version, description: designSystem.description, stats: { components: designSystem.components.length, categories: getAllCategories() } }, null, 2) }] };

    // @mcpsystem/ui component tools
    case "list_components": {
      const components = getAllWebComponents();
      const summary = components.map(c => ({
        name: c.name,
        tagName: c.tagName,
        description: c.description,
        category: c.category,
      }));
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            package: "@mcpsystem/ui",
            version: "0.1.0",
            description: "AI-first components for chat interfaces",
            install: "npm install @mcpsystem/ui",
            usage: "import '@mcpsystem/ui';",
            components: summary,
          }, null, 2)
        }]
      };
    }

    case "get_component": {
      const tagName = typeof args.tagName === 'string' ? args.tagName : '';
      if (!tagName) {
        return { content: [{ type: "text", text: "Missing tagName argument" }], isError: true };
      }
      const comp = getWebComponentByTag(tagName);
      if (!comp) {
        const available = getAllWebComponents().map(c => c.tagName).join(", ");
        return { content: [{ type: "text", text: `Component not found: ${tagName}. Available: ${available}` }], isError: true };
      }

      // Format as documentation
      const doc = [
        `# <${comp.tagName}>`,
        '',
        comp.description,
        '',
        '## Installation',
        '```bash',
        'npm install @mcpsystem/ui',
        '```',
        '',
        '## Usage',
        '```html',
        '<script type="module">',
        "  import '@mcpsystem/ui';",
        '</script>',
        '',
        `<${comp.tagName}></${comp.tagName}>`,
        '```',
        '',
        '## Properties',
        ...comp.props.map(p => `- **${p.name}** (\`${p.type}\`${p.default ? `, default: \`${p.default}\`` : ''}): ${p.description}${p.attribute ? ` (attribute: \`${p.attribute}\`)` : ''}`),
        '',
        '## Slots',
        comp.slots.length ? comp.slots.map(s => `- **${s.name || 'default'}**: ${s.description}`).join('\n') : '- None',
        '',
        '## CSS Parts',
        ...comp.cssParts.map(p => `- **${p.name}**: ${p.description}`),
        '',
        '## CSS Custom Properties',
        ...comp.cssProps.map(p => `- \`${p.name}\`${p.default ? ` (default: \`${p.default}\`)` : ''}: ${p.description}`),
        '',
        '## Events',
        comp.events.length ? comp.events.map(e => `- **${e.name}**${e.detail ? ` (detail: \`${e.detail}\`)` : ''}: ${e.description}`).join('\n') : '- None',
        '',
        '## Examples',
        ...comp.examples.flatMap(e => [`### ${e.title}`, '```html', e.code, '```', '']),
      ].join('\n');

      return { content: [{ type: "text", text: doc }] };
    }

    case "search_components": {
      const query = typeof args.query === 'string' ? args.query : '';
      if (!query) {
        return { content: [{ type: "text", text: "Missing query argument" }], isError: true };
      }
      const results = searchWebComponents(query);
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            query,
            results: results.map(c => ({
              name: c.name,
              tagName: c.tagName,
              description: c.description,
            }))
          }, null, 2)
        }]
      };
    }

    case "generate_boilerplate": {
      const parsed = GenerateBoilerplateArgsSchema.safeParse(args);
      const projectName = parsed.success && parsed.data.projectName ? parsed.data.projectName : 'My Project';
      const theme = parsed.success && parsed.data.theme ? parsed.data.theme : 'light';
      const includeExamples = parsed.success && parsed.data.includeExamples !== undefined ? parsed.data.includeExamples : true;

      const exampleSection = includeExamples ? `
    <!-- Example Chat Interface -->
    <div class="max-w-2xl mx-auto space-y-4">
      <mcp-chat-message role="user">
        Hello! How can I use these components?
      </mcp-chat-message>

      <mcp-chat-message role="assistant" name="Claude">
        <mcp-streaming-text text="Welcome! These components are designed for AI chat interfaces. You can customize them with CSS custom properties and Tailwind classes."></mcp-streaming-text>
      </mcp-chat-message>

      <mcp-typing-indicator></mcp-typing-indicator>

      <mcp-code-block language="javascript">
const greeting = "Hello, World!";
console.log(greeting);
      </mcp-code-block>

      <mcp-token-counter used="1250" limit="4096" show-label></mcp-token-counter>

      <mcp-message-input placeholder="Type your message..."></mcp-message-input>
    </div>` : '';

      const packageJson = `{
  "name": "${projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@mcpsystem/ui": "^0.1.0",
    "lit": "^3.0.0"
  },
  "devDependencies": {
    "tailwindcss": "^4.0.0",
    "vite": "^5.0.0"
  }
}`;

      const indexHtml = `<!DOCTYPE html>
<html lang="en" class="${theme}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <link rel="stylesheet" href="/src/styles.css">
</head>
<body class="min-h-screen p-8">
  <header class="mb-8">
    <h1 class="text-3xl font-bold">${projectName}</h1>
    <p class="text-[var(--color-text-muted)] mt-2">
      Built with Tailwind CSS, Lit, and @mcpsystem/ui
    </p>
    <button
      onclick="document.documentElement.classList.toggle('dark')"
      class="mt-4 px-4 py-2 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors"
    >
      Toggle Theme
    </button>
  </header>

  <main>${exampleSection}
  </main>

  <script type="module" src="/src/main.js"></script>
</body>
</html>`;

      const mainJs = `// Import @mcpsystem/ui components (linked via npm link)
import '@mcpsystem/ui';

// Handle message input submissions
document.querySelector('mcp-message-input')?.addEventListener('mcp-submit', (e) => {
  console.log('Message submitted:', e.detail.value);
});`;

      const stylesCss = `@import "tailwindcss";

/* MCP Design System CSS Custom Properties */
:root {
  /* Light mode colors */
  --color-surface: #ffffff;
  --color-surface-hover: #f5f5f5;
  --color-surface-active: #ebebeb;
  --color-primary: #2563eb;
  --color-primary-foreground: #ffffff;
  --color-primary-hover: #1d4ed8;
  --color-muted: #f5f5f5;
  --color-muted-foreground: #737373;
  --color-border: #e5e5e5;
  --color-text: #171717;
  --color-text-muted: #737373;
}

.dark {
  /* Dark mode colors */
  --color-surface: #171717;
  --color-surface-hover: #262626;
  --color-surface-active: #404040;
  --color-primary: #3b82f6;
  --color-primary-foreground: #ffffff;
  --color-primary-hover: #60a5fa;
  --color-muted: #262626;
  --color-muted-foreground: #a3a3a3;
  --color-border: #404040;
  --color-text: #fafafa;
  --color-text-muted: #a3a3a3;
}

body {
  background-color: var(--color-surface);
  color: var(--color-text);
  font-family: system-ui, -apple-system, sans-serif;
}`;

      return {
        content: [{
          type: "text",
          text: `# Boilerplate Generated

Here's a starter project with Tailwind CSS, Lit, and @mcpsystem/ui pre-configured.

## Project Structure

\`\`\`
${projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/
├── index.html
├── package.json
└── src/
    ├── main.js
    └── styles.css
\`\`\`

## Setup Instructions

1. Create project directory and files (shown below)
2. Link @mcpsystem/ui locally:
   \`\`\`bash
   # In the @mcpsystem/ui package directory
   cd packages/ui && npm link

   # In your new project directory
   npm link @mcpsystem/ui
   \`\`\`
3. Install dependencies and run:
   \`\`\`bash
   npm install
   npm run dev
   \`\`\`

---

## Files

### package.json
\`\`\`json
${packageJson}
\`\`\`

### index.html
\`\`\`html
${indexHtml}
\`\`\`

### src/main.js
\`\`\`javascript
${mainJs}
\`\`\`

### src/styles.css
\`\`\`css
${stylesCss}
\`\`\`

---

## Features
- **Tailwind CSS v4** with design system color tokens
- **Lit** for Web Components support
- **@mcpsystem/ui** components via npm link
- **Vite** for fast development
- **Dark mode** toggle included

## Available Components
- \`<mcp-chat-message>\` - Chat message bubbles
- \`<mcp-typing-indicator>\` - "AI is thinking" animation
- \`<mcp-code-block>\` - Code display with copy button
- \`<mcp-message-input>\` - Auto-resize textarea with send button
- \`<mcp-streaming-text>\` - Typewriter effect
- \`<mcp-token-counter>\` - Token usage visualization

Use \`get_component\` to learn more about each component's props and events.`
        }]
      };
    }

    default:
      return { content: [{ type: "text", text: `Unknown tool: ${name}` }], isError: true };
  }
}

// Handle validated JSON-RPC requests
function handleJsonRpc(
  req: JsonRpcRequest,
  requestId: string
): { response: Record<string, unknown> | null } {
  const { method, params, id } = req;

  switch (method) {
    case "initialize":
      return {
        response: {
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: "2024-11-05",
            capabilities: { tools: {} },
            serverInfo: { name: "mcpdesignsystem", version: "1.0.0" }
          }
        }
      };

    case "notifications/initialized":
      return { response: null };

    case "tools/list":
      return { response: { jsonrpc: "2.0", id, result: { tools } } };

    case "tools/call": {
      const toolName = typeof params?.name === 'string' ? params.name : '';
      const toolArgs = (typeof params?.arguments === 'object' && params.arguments !== null)
        ? params.arguments as Record<string, unknown>
        : {};

      if (!toolName) {
        return {
          response: createErrorResponse(
            id ?? null,
            JsonRpcErrorCodes.INVALID_PARAMS,
            'Missing tool name'
          )
        };
      }

      const result = executeTool(toolName, toolArgs);
      return { response: { jsonrpc: "2.0", id, result } };
    }

    case "ping":
      return { response: { jsonrpc: "2.0", id, result: {} } };

    default:
      return {
        response: createErrorResponse(
          id ?? null,
          JsonRpcErrorCodes.METHOD_NOT_FOUND,
          `Method not found: ${method}`
        )
      };
  }
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization, Cache-Control',
};

// OPTIONS handler for CORS
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

// GET handler for SSE
export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();

  // Validate host header to prevent injection
  const validatedHost = validateHost(request.headers.get('host'));
  const endpointUrl = buildEndpointUrl(validatedHost);

  const stream = new ReadableStream({
    start(controller) {
      // Send the endpoint event immediately
      const endpointEvent = `event: endpoint\ndata: ${endpointUrl}\n\n`;
      controller.enqueue(encoder.encode(endpointEvent));

      // Send periodic pings to keep connection alive
      const pingInterval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(': ping\n\n'));
        } catch {
          clearInterval(pingInterval);
        }
      }, 30000);

      // Clean up on close
      request.signal.addEventListener('abort', () => {
        clearInterval(pingInterval);
        controller.close();
      });
    },
  });

  return new NextResponse(stream, {
    headers: {
      ...corsHeaders,
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
}

// POST handler for JSON-RPC
export async function POST(request: NextRequest) {
  const requestId = generateRequestId();
  const clientIp = getClientIp(request);

  const logger = createLogger({
    requestId,
    ip: clientIp,
    timestamp: new Date().toISOString(),
  });

  // Add request ID to all response headers
  const responseHeaders = {
    ...corsHeaders,
    'X-Request-Id': requestId,
  };

  // Check rate limit
  const rateLimit = checkRateLimit(clientIp);
  if (!rateLimit.allowed) {
    logger.warn('Rate limit exceeded');
    return NextResponse.json(
      createErrorResponse(null, JsonRpcErrorCodes.RATE_LIMITED, 'Rate limit exceeded'),
      {
        status: 429,
        headers: {
          ...responseHeaders,
          'Retry-After': String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
        },
      }
    );
  }

  try {
    const body = await request.json();

    // Handle batch requests
    if (Array.isArray(body)) {
      const batchResult = BatchRequestSchema.safeParse(body);
      if (!batchResult.success) {
        logger.warn('Invalid batch request', { error: formatZodError(batchResult.error) });
        return NextResponse.json(
          createErrorResponse(null, JsonRpcErrorCodes.INVALID_REQUEST, formatZodError(batchResult.error)),
          { status: 400, headers: responseHeaders }
        );
      }

      const responses = batchResult.data
        .map((req) => {
          logger.info('Processing batch request', { method: req.method });
          return handleJsonRpc(req, requestId).response;
        })
        .filter((response): response is Record<string, unknown> => response !== null);

      return NextResponse.json(responses, { headers: responseHeaders });
    }

    // Handle single request
    const parseResult = JsonRpcRequestSchema.safeParse(body);
    if (!parseResult.success) {
      logger.warn('Invalid request', { error: formatZodError(parseResult.error) });
      return NextResponse.json(
        createErrorResponse(null, JsonRpcErrorCodes.INVALID_REQUEST, formatZodError(parseResult.error)),
        { status: 400, headers: responseHeaders }
      );
    }

    logger.info('Processing request', { method: parseResult.data.method });
    const { response } = handleJsonRpc(parseResult.data, requestId);

    if (response === null) {
      return new NextResponse(null, { status: 202, headers: responseHeaders });
    }

    return NextResponse.json(response, { headers: responseHeaders });
  } catch (error) {
    logger.error('Parse error', error instanceof Error ? error : undefined);
    return NextResponse.json(
      createErrorResponse(null, JsonRpcErrorCodes.PARSE_ERROR, 'Invalid JSON'),
      { status: 400, headers: responseHeaders }
    );
  }
}
