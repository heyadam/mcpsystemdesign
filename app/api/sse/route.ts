import { NextRequest, NextResponse } from 'next/server';
import {
  designSystem,
  getComponentByName,
  searchComponents,
  getAllCategories,
  styleGuide
} from '@/lib/design-system';

// Tool definitions for MCP
const tools = [
  { name: "list_components", description: "List all available design system components", inputSchema: { type: "object", properties: {}, required: [] } },
  { name: "get_component", description: "Get detailed component specification with Tailwind classes", inputSchema: { type: "object", properties: { componentName: { type: "string", description: "Component name" } }, required: ["componentName"] } },
  { name: "search_components", description: "Search for components", inputSchema: { type: "object", properties: { query: { type: "string", description: "Search query" } }, required: ["query"] } },
  { name: "get_component_examples", description: "Get Tailwind code examples for a component", inputSchema: { type: "object", properties: { componentName: { type: "string", description: "Component name" } }, required: ["componentName"] } },
  { name: "get_style_guide", description: "Get style guide (colors, typography, spacing, breakpoints)", inputSchema: { type: "object", properties: { section: { type: "string", enum: ["colors", "typography", "spacing", "breakpoints", "all"] } }, required: [] } },
  { name: "get_colors", description: "Get color tokens", inputSchema: { type: "object", properties: { category: { type: "string" } }, required: [] } },
  { name: "get_typography", description: "Get typography scale", inputSchema: { type: "object", properties: {}, required: [] } },
  { name: "get_spacing", description: "Get spacing scale", inputSchema: { type: "object", properties: {}, required: [] } },
  { name: "get_breakpoints", description: "Get breakpoints", inputSchema: { type: "object", properties: {}, required: [] } },
  { name: "get_design_system_info", description: "Get design system overview", inputSchema: { type: "object", properties: {}, required: [] } }
];

// Execute tool and return result
function executeTool(name: string, args: Record<string, unknown>): { content: Array<{ type: string; text: string }>; isError?: boolean } {
  switch (name) {
    case "list_components": {
      const byCategory = designSystem.components.reduce((acc, c) => {
        if (!acc[c.category]) acc[c.category] = [];
        acc[c.category].push({ name: c.name, description: c.description });
        return acc;
      }, {} as Record<string, { name: string; description: string }[]>);
      return { content: [{ type: "text", text: JSON.stringify({ designSystem: designSystem.name, version: designSystem.version, componentsByCategory: byCategory }, null, 2) }] };
    }
    case "get_component": {
      const comp = getComponentByName(args.componentName as string);
      if (!comp) return { content: [{ type: "text", text: `Component not found. Available: ${designSystem.components.map(c => c.name).join(", ")}` }], isError: true };
      return { content: [{ type: "text", text: JSON.stringify(comp, null, 2) }] };
    }
    case "search_components": {
      const results = searchComponents(args.query as string);
      return { content: [{ type: "text", text: JSON.stringify({ query: args.query, results: results.map(c => ({ name: c.name, category: c.category, description: c.description })) }, null, 2) }] };
    }
    case "get_component_examples": {
      const comp = getComponentByName(args.componentName as string);
      if (!comp) return { content: [{ type: "text", text: "Component not found" }], isError: true };
      return { content: [{ type: "text", text: `# ${comp.name}\n\n${comp.description}\n\nImport: \`${comp.importStatement}\`\n\n${comp.examples.map(e => `## ${e.title}\n\`\`\`html\n${e.code}\n\`\`\``).join("\n\n")}` }] };
    }
    case "get_style_guide": {
      const section = (args.section as string) || "all";
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
    default:
      return { content: [{ type: "text", text: `Unknown tool: ${name}` }], isError: true };
  }
}

// Handle JSON-RPC requests
function handleJsonRpc(req: { jsonrpc: string; id?: string | number; method: string; params?: Record<string, unknown> }): Record<string, unknown> | null {
  const { method, params, id } = req;

  switch (method) {
    case "initialize":
      return { jsonrpc: "2.0", id, result: { protocolVersion: "2024-11-05", capabilities: { tools: {} }, serverInfo: { name: "mcpdesignsystem", version: "1.0.0" } } };
    case "notifications/initialized":
      return null;
    case "tools/list":
      return { jsonrpc: "2.0", id, result: { tools } };
    case "tools/call":
      const result = executeTool((params as Record<string, unknown>)?.name as string, ((params as Record<string, unknown>)?.arguments as Record<string, unknown>) || {});
      return { jsonrpc: "2.0", id, result };
    case "ping":
      return { jsonrpc: "2.0", id, result: {} };
    default:
      return { jsonrpc: "2.0", id, error: { code: -32601, message: `Method not found: ${method}` } };
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

  // Get the host for the endpoint URL
  const host = request.headers.get('host') || 'aids-server.vercel.app';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const endpointUrl = `${protocol}://${host}/api/sse`;

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
  try {
    const body = await request.json();

    // Handle batch requests
    if (Array.isArray(body)) {
      const responses = body
        .map((req: { jsonrpc: string; id?: string | number; method: string; params?: Record<string, unknown> }) => handleJsonRpc(req))
        .filter((response): response is Record<string, unknown> => response !== null);
      return NextResponse.json(responses, { headers: corsHeaders });
    }

    // Handle single request
    const response = handleJsonRpc(body);
    if (response === null) {
      return new NextResponse(null, { status: 202, headers: corsHeaders });
    }

    return NextResponse.json(response, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json(
      { jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } },
      { status: 500, headers: corsHeaders }
    );
  }
}
