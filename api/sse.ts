import type { VercelRequest, VercelResponse } from "@vercel/node";

// Design system data
const designSystem = {
  name: "ACME Design System",
  version: "2.0.0",
  description: "A comprehensive design system for building consistent, accessible, and beautiful user interfaces.",
  components: [
    {
      name: "Button",
      description: "A versatile button component that supports multiple variants, sizes, and states.",
      category: "Actions",
      importStatement: "import { Button } from '@acme/ui'",
      props: [
        { name: "variant", type: "'primary' | 'secondary' | 'ghost' | 'danger'", required: false, default: "'primary'", description: "Visual style variant" },
        { name: "size", type: "'sm' | 'md' | 'lg'", required: false, default: "'md'", description: "Size of the button" },
        { name: "disabled", type: "boolean", required: false, default: "false", description: "Whether disabled" },
        { name: "loading", type: "boolean", required: false, default: "false", description: "Shows loading spinner" },
        { name: "children", type: "ReactNode", required: true, description: "Button content" }
      ],
      examples: [
        { title: "Basic Usage", code: `<Button>Default</Button>\n<Button variant="secondary">Secondary</Button>` },
        { title: "Loading State", code: `<Button loading>Submitting...</Button>` }
      ],
      relatedComponents: ["IconButton", "ButtonGroup"]
    },
    {
      name: "Input",
      description: "A form input component for text entry with validation states.",
      category: "Forms",
      importStatement: "import { Input } from '@acme/ui'",
      props: [
        { name: "type", type: "'text' | 'email' | 'password' | 'number'", required: false, default: "'text'", description: "Input type" },
        { name: "label", type: "string", required: false, description: "Label text" },
        { name: "error", type: "string", required: false, description: "Error message" },
        { name: "disabled", type: "boolean", required: false, default: "false", description: "Whether disabled" }
      ],
      examples: [
        { title: "Basic Input", code: `<Input label="Email" placeholder="Enter email" />` }
      ],
      relatedComponents: ["TextArea", "Select"]
    },
    {
      name: "Card",
      description: "A container for grouping related content.",
      category: "Layout",
      importStatement: "import { Card } from '@acme/ui'",
      props: [
        { name: "variant", type: "'elevated' | 'outlined'", required: false, default: "'elevated'", description: "Visual style" },
        { name: "padding", type: "'sm' | 'md' | 'lg'", required: false, default: "'md'", description: "Internal padding" }
      ],
      examples: [
        { title: "Basic Card", code: `<Card>Content here</Card>` }
      ],
      relatedComponents: ["Paper", "Box"]
    },
    {
      name: "Modal",
      description: "A dialog overlay for focused interactions.",
      category: "Overlays",
      importStatement: "import { Modal } from '@acme/ui'",
      props: [
        { name: "isOpen", type: "boolean", required: true, description: "Whether visible" },
        { name: "onClose", type: "() => void", required: true, description: "Close callback" },
        { name: "size", type: "'sm' | 'md' | 'lg'", required: false, default: "'md'", description: "Modal size" }
      ],
      examples: [
        { title: "Basic Modal", code: `<Modal isOpen={isOpen} onClose={close}>Content</Modal>` }
      ],
      relatedComponents: ["Dialog", "Drawer"]
    },
    {
      name: "Avatar",
      description: "Display user profile images with fallback.",
      category: "Data Display",
      importStatement: "import { Avatar } from '@acme/ui'",
      props: [
        { name: "src", type: "string", required: false, description: "Image URL" },
        { name: "name", type: "string", required: false, description: "Name for initials" },
        { name: "size", type: "'sm' | 'md' | 'lg'", required: false, default: "'md'", description: "Avatar size" }
      ],
      examples: [
        { title: "Basic", code: `<Avatar src="/user.jpg" name="John" />` }
      ],
      relatedComponents: ["Badge"]
    },
    {
      name: "Toast",
      description: "Notification component for brief messages.",
      category: "Feedback",
      importStatement: "import { useToast } from '@acme/ui'",
      props: [
        { name: "title", type: "string", required: false, description: "Toast title" },
        { name: "status", type: "'info' | 'success' | 'error'", required: false, default: "'info'", description: "Toast type" }
      ],
      examples: [
        { title: "Success Toast", code: `toast({ title: "Success!", status: "success" })` }
      ],
      relatedComponents: ["Alert"]
    }
  ],
  styleGuide: {
    colors: [
      { name: "Primary", description: "Brand colors", colors: [
        { name: "primary-500", value: "#6366F1", usage: "Primary buttons" },
        { name: "primary-700", value: "#4338CA", usage: "Hover states" }
      ]},
      { name: "Neutral", description: "Grayscale", colors: [
        { name: "gray-500", value: "#6B7280", usage: "Secondary text" },
        { name: "gray-900", value: "#111827", usage: "Primary text" }
      ]},
      { name: "Semantic", description: "Status colors", colors: [
        { name: "success", value: "#10B981", description: "Success" },
        { name: "error", value: "#EF4444", description: "Error" }
      ]}
    ],
    typography: [
      { name: "h1", fontFamily: "Inter", fontSize: "2.25rem", fontWeight: "700", lineHeight: "1.2", usage: "Page headings" },
      { name: "body", fontFamily: "Inter", fontSize: "1rem", fontWeight: "400", lineHeight: "1.75", usage: "Body text" }
    ],
    spacing: [
      { name: "2", value: "0.5rem", pixels: 8 },
      { name: "4", value: "1rem", pixels: 16 },
      { name: "8", value: "2rem", pixels: 32 }
    ],
    breakpoints: [
      { name: "sm", value: "640px", description: "Small devices" },
      { name: "lg", value: "1024px", description: "Large devices" }
    ]
  }
};

// Tool definitions
const tools = [
  { name: "list_components", description: "List all available design system components", inputSchema: { type: "object", properties: {}, required: [] } },
  { name: "get_component", description: "Get detailed component specification", inputSchema: { type: "object", properties: { componentName: { type: "string", description: "Component name" } }, required: ["componentName"] } },
  { name: "search_components", description: "Search for components", inputSchema: { type: "object", properties: { query: { type: "string", description: "Search query" } }, required: ["query"] } },
  { name: "get_component_examples", description: "Get code examples for a component", inputSchema: { type: "object", properties: { componentName: { type: "string", description: "Component name" } }, required: ["componentName"] } },
  { name: "get_style_guide", description: "Get style guide (colors, typography, spacing, breakpoints)", inputSchema: { type: "object", properties: { section: { type: "string", enum: ["colors", "typography", "spacing", "breakpoints", "all"] } }, required: [] } },
  { name: "get_colors", description: "Get color tokens", inputSchema: { type: "object", properties: { category: { type: "string" } }, required: [] } },
  { name: "get_typography", description: "Get typography styles", inputSchema: { type: "object", properties: {}, required: [] } },
  { name: "get_spacing", description: "Get spacing scale", inputSchema: { type: "object", properties: {}, required: [] } },
  { name: "get_breakpoints", description: "Get breakpoints", inputSchema: { type: "object", properties: {}, required: [] } },
  { name: "get_design_system_info", description: "Get design system overview", inputSchema: { type: "object", properties: {}, required: [] } }
];

// Execute tool
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
      const comp = designSystem.components.find(c => c.name.toLowerCase() === (args.componentName as string).toLowerCase());
      if (!comp) return { content: [{ type: "text", text: `Component not found. Available: ${designSystem.components.map(c => c.name).join(", ")}` }], isError: true };
      return { content: [{ type: "text", text: JSON.stringify(comp, null, 2) }] };
    }
    case "search_components": {
      const q = (args.query as string).toLowerCase();
      const results = designSystem.components.filter(c => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
      return { content: [{ type: "text", text: JSON.stringify({ query: args.query, results: results.map(c => ({ name: c.name, category: c.category, description: c.description })) }, null, 2) }] };
    }
    case "get_component_examples": {
      const comp = designSystem.components.find(c => c.name.toLowerCase() === (args.componentName as string).toLowerCase());
      if (!comp) return { content: [{ type: "text", text: "Component not found" }], isError: true };
      return { content: [{ type: "text", text: `# ${comp.name} Examples\n\n${comp.examples.map(e => `## ${e.title}\n\`\`\`tsx\n${e.code}\n\`\`\``).join("\n\n")}` }] };
    }
    case "get_style_guide": {
      const section = (args.section as string) || "all";
      const data = section === "all" ? designSystem.styleGuide : { [section]: (designSystem.styleGuide as any)[section] };
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }
    case "get_colors":
      return { content: [{ type: "text", text: JSON.stringify({ colors: designSystem.styleGuide.colors }, null, 2) }] };
    case "get_typography":
      return { content: [{ type: "text", text: JSON.stringify({ typography: designSystem.styleGuide.typography }, null, 2) }] };
    case "get_spacing":
      return { content: [{ type: "text", text: JSON.stringify({ spacing: designSystem.styleGuide.spacing }, null, 2) }] };
    case "get_breakpoints":
      return { content: [{ type: "text", text: JSON.stringify({ breakpoints: designSystem.styleGuide.breakpoints }, null, 2) }] };
    case "get_design_system_info":
      return { content: [{ type: "text", text: JSON.stringify({ name: designSystem.name, version: designSystem.version, description: designSystem.description, stats: { components: designSystem.components.length, categories: [...new Set(designSystem.components.map(c => c.category))] } }, null, 2) }] };
    default:
      return { content: [{ type: "text", text: `Unknown tool: ${name}` }], isError: true };
  }
}

// Handle JSON-RPC
function handleJsonRpc(req: { jsonrpc: string; id?: string | number; method: string; params?: any }): any {
  const { method, params, id } = req;

  switch (method) {
    case "initialize":
      return { jsonrpc: "2.0", id, result: { protocolVersion: "2024-11-05", capabilities: { tools: {} }, serverInfo: { name: "design-system-mcp", version: "1.0.0" } } };
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
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Cache-Control");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method === "GET") {
    // SSE connection
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");

    // Send endpoint event
    const host = req.headers.host || "aids-server.vercel.app";
    const protocol = host.includes("localhost") ? "http" : "https";
    res.write(`event: endpoint\ndata: ${protocol}://${host}/sse\n\n`);

    // Keep alive
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
