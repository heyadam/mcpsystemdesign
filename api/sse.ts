import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  designSystem,
  getComponentByName,
  searchComponents,
  getComponentsByCategory,
  getAllCategories,
  styleGuide
} from "../lib/design-system";

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
      const data = section === "all" ? styleGuide : { [section]: (styleGuide as any)[section] };
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
function handleJsonRpc(req: { jsonrpc: string; id?: string | number; method: string; params?: any }): any {
  const { method, params, id } = req;

  switch (method) {
    case "initialize":
      return { jsonrpc: "2.0", id, result: { protocolVersion: "2024-11-05", capabilities: { tools: {} }, serverInfo: { name: "minimal-design-system", version: "1.0.0" } } };
    case "notifications/initialized":
      return null;
    case "tools/list":
      return { jsonrpc: "2.0", id, result: { tools } };
    case "tools/call":
      const result = executeTool(params.name, params.arguments || {});
      return { jsonrpc: "2.0", id, result };
    case "ping":
      return { jsonrpc: "2.0", id, result: {} };
    default:
      return { jsonrpc: "2.0", id, error: { code: -32601, message: `Method not found: ${method}` } };
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Cache-Control");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method === "GET") {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");

    const host = req.headers.host || "aids-server.vercel.app";
    const protocol = host.includes("localhost") ? "http" : "https";
    res.write(`event: endpoint\ndata: ${protocol}://${host}/sse\n\n`);

    const interval = setInterval(() => res.write(": ping\n\n"), 30000);
    req.on("close", () => clearInterval(interval));
    return;
  }

  if (req.method === "POST") {
    try {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

      if (Array.isArray(body)) {
        const responses = body.map(r => handleJsonRpc(r)).filter(r => r !== null);
        res.status(200).json(responses);
      } else {
        const response = handleJsonRpc(body);
        if (response === null) {
          res.status(202).end();
        } else {
          res.status(200).json(response);
        }
      }
    } catch (error) {
      res.status(500).json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } });
    }
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
