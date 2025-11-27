import type { VercelRequest, VercelResponse } from "@vercel/node";

// Vercel-inspired Design System
const designSystem = {
  name: "Minimal Design System",
  version: "1.0.0",
  description: "A minimal, Vercel-inspired design system built with Tailwind CSS. Clean, fast, and pixel-perfect.",
  components: [
    {
      name: "Button",
      description: "Minimal button with subtle hover states and clean typography.",
      category: "Actions",
      importStatement: "import { Button } from '@minimal/ui'",
      tailwind: true,
      props: [
        { name: "variant", type: "'default' | 'secondary' | 'ghost' | 'danger'", required: false, default: "'default'", description: "Visual style" },
        { name: "size", type: "'sm' | 'md' | 'lg'", required: false, default: "'md'", description: "Button size" },
        { name: "disabled", type: "boolean", required: false, default: "false", description: "Disabled state" },
        { name: "loading", type: "boolean", required: false, default: "false", description: "Loading state" }
      ],
      examples: [
        {
          title: "Default",
          code: `<button className="h-10 px-4 bg-white text-black border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
  Button
</button>`,
          preview: "default"
        },
        {
          title: "Primary",
          code: `<button className="h-10 px-4 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
  Deploy
</button>`,
          preview: "primary"
        },
        {
          title: "Secondary",
          code: `<button className="h-10 px-4 bg-gray-100 text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
  Cancel
</button>`,
          preview: "secondary"
        },
        {
          title: "Ghost",
          code: `<button className="h-10 px-4 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
  Learn more
</button>`,
          preview: "ghost"
        }
      ]
    },
    {
      name: "Input",
      description: "Clean text input with focus ring and error states.",
      category: "Forms",
      importStatement: "import { Input } from '@minimal/ui'",
      tailwind: true,
      props: [
        { name: "placeholder", type: "string", required: false, description: "Placeholder text" },
        { name: "error", type: "boolean", required: false, default: "false", description: "Error state" },
        { name: "disabled", type: "boolean", required: false, default: "false", description: "Disabled state" }
      ],
      examples: [
        {
          title: "Default",
          code: `<input
  type="text"
  placeholder="Enter your email"
  className="h-10 w-full px-3 bg-white border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow"
/>`,
          preview: "input-default"
        },
        {
          title: "With Label",
          code: `<div className="space-y-2">
  <label className="text-sm font-medium text-gray-700">Email</label>
  <input
    type="email"
    placeholder="you@example.com"
    className="h-10 w-full px-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
  />
</div>`,
          preview: "input-label"
        }
      ]
    },
    {
      name: "Card",
      description: "Subtle container with border and optional hover effect.",
      category: "Layout",
      importStatement: "import { Card } from '@minimal/ui'",
      tailwind: true,
      props: [
        { name: "hover", type: "boolean", required: false, default: "false", description: "Enable hover effect" },
        { name: "padding", type: "'sm' | 'md' | 'lg'", required: false, default: "'md'", description: "Internal padding" }
      ],
      examples: [
        {
          title: "Default",
          code: `<div className="p-6 bg-white border border-gray-200 rounded-xl">
  <h3 className="font-semibold text-gray-900">Card Title</h3>
  <p className="mt-2 text-sm text-gray-500">Card description goes here.</p>
</div>`,
          preview: "card-default"
        },
        {
          title: "Interactive",
          code: `<div className="p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer">
  <h3 className="font-semibold text-gray-900">Clickable Card</h3>
  <p className="mt-2 text-sm text-gray-500">Hover to see the effect.</p>
</div>`,
          preview: "card-hover"
        }
      ]
    },
    {
      name: "Badge",
      description: "Small status indicator with semantic colors.",
      category: "Data Display",
      importStatement: "import { Badge } from '@minimal/ui'",
      tailwind: true,
      props: [
        { name: "variant", type: "'default' | 'success' | 'warning' | 'error'", required: false, default: "'default'", description: "Badge variant" }
      ],
      examples: [
        {
          title: "Variants",
          code: `<span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Default</span>
<span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700">Success</span>
<span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-amber-50 text-amber-700">Warning</span>
<span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-red-50 text-red-700">Error</span>`,
          preview: "badge-variants"
        }
      ]
    },
    {
      name: "Avatar",
      description: "User avatar with fallback initials.",
      category: "Data Display",
      importStatement: "import { Avatar } from '@minimal/ui'",
      tailwind: true,
      props: [
        { name: "src", type: "string", required: false, description: "Image URL" },
        { name: "fallback", type: "string", required: false, description: "Fallback initials" },
        { name: "size", type: "'sm' | 'md' | 'lg'", required: false, default: "'md'", description: "Avatar size" }
      ],
      examples: [
        {
          title: "Sizes",
          code: `<div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-xs font-medium">A</div>
<div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-sm font-medium">AB</div>
<div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-medium">CD</div>`,
          preview: "avatar-sizes"
        }
      ]
    },
    {
      name: "Toggle",
      description: "Accessible toggle switch for boolean settings.",
      category: "Forms",
      importStatement: "import { Toggle } from '@minimal/ui'",
      tailwind: true,
      props: [
        { name: "checked", type: "boolean", required: false, default: "false", description: "Checked state" },
        { name: "disabled", type: "boolean", required: false, default: "false", description: "Disabled state" }
      ],
      examples: [
        {
          title: "States",
          code: `<!-- Off -->
<button className="w-11 h-6 bg-gray-200 rounded-full relative transition-colors">
  <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform" />
</button>

<!-- On -->
<button className="w-11 h-6 bg-gray-900 rounded-full relative transition-colors">
  <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform translate-x-5" />
</button>`,
          preview: "toggle-states"
        }
      ]
    },
    {
      name: "Tabs",
      description: "Segmented navigation for switching views.",
      category: "Navigation",
      importStatement: "import { Tabs } from '@minimal/ui'",
      tailwind: true,
      props: [
        { name: "items", type: "string[]", required: true, description: "Tab labels" },
        { name: "activeIndex", type: "number", required: false, default: "0", description: "Active tab index" }
      ],
      examples: [
        {
          title: "Default",
          code: `<div className="inline-flex bg-gray-100 rounded-lg p-1">
  <button className="px-4 py-2 text-sm font-medium bg-white text-gray-900 rounded-md shadow-sm">Overview</button>
  <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900">Analytics</button>
  <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900">Settings</button>
</div>`,
          preview: "tabs-default"
        }
      ]
    },
    {
      name: "Spinner",
      description: "Loading indicator with smooth animation.",
      category: "Feedback",
      importStatement: "import { Spinner } from '@minimal/ui'",
      tailwind: true,
      props: [
        { name: "size", type: "'sm' | 'md' | 'lg'", required: false, default: "'md'", description: "Spinner size" }
      ],
      examples: [
        {
          title: "Sizes",
          code: `<svg className="w-4 h-4 animate-spin text-gray-900" viewBox="0 0 24 24" fill="none">
  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
</svg>`,
          preview: "spinner"
        }
      ]
    }
  ],
  styleGuide: {
    colors: [
      {
        name: "Gray Scale",
        description: "Neutral palette for text, backgrounds, and borders",
        colors: [
          { name: "gray-50", value: "#FAFAFA", usage: "Subtle backgrounds" },
          { name: "gray-100", value: "#F4F4F5", usage: "Secondary backgrounds" },
          { name: "gray-200", value: "#E4E4E7", usage: "Borders, dividers" },
          { name: "gray-300", value: "#D4D4D8", usage: "Disabled borders" },
          { name: "gray-400", value: "#A1A1AA", usage: "Placeholder text" },
          { name: "gray-500", value: "#71717A", usage: "Secondary text" },
          { name: "gray-600", value: "#52525B", usage: "Tertiary text" },
          { name: "gray-700", value: "#3F3F46", usage: "Primary text light" },
          { name: "gray-800", value: "#27272A", usage: "Headings" },
          { name: "gray-900", value: "#18181B", usage: "Primary text" },
          { name: "gray-950", value: "#09090B", usage: "High contrast" }
        ]
      },
      {
        name: "Accent",
        description: "Semantic colors for states and actions",
        colors: [
          { name: "blue-500", value: "#3B82F6", usage: "Links, focus rings" },
          { name: "emerald-500", value: "#10B981", usage: "Success states" },
          { name: "amber-500", value: "#F59E0B", usage: "Warning states" },
          { name: "red-500", value: "#EF4444", usage: "Error states, destructive" }
        ]
      }
    ],
    typography: [
      { name: "Display", fontFamily: "Inter, system-ui, sans-serif", fontSize: "3.5rem", fontWeight: "600", lineHeight: "1.1", letterSpacing: "-0.02em", usage: "Hero headlines" },
      { name: "H1", fontFamily: "Inter, system-ui, sans-serif", fontSize: "2.25rem", fontWeight: "600", lineHeight: "1.2", letterSpacing: "-0.02em", usage: "Page titles" },
      { name: "H2", fontFamily: "Inter, system-ui, sans-serif", fontSize: "1.5rem", fontWeight: "600", lineHeight: "1.3", letterSpacing: "-0.01em", usage: "Section headers" },
      { name: "H3", fontFamily: "Inter, system-ui, sans-serif", fontSize: "1.125rem", fontWeight: "600", lineHeight: "1.4", usage: "Card titles" },
      { name: "Body", fontFamily: "Inter, system-ui, sans-serif", fontSize: "1rem", fontWeight: "400", lineHeight: "1.6", usage: "Paragraphs" },
      { name: "Small", fontFamily: "Inter, system-ui, sans-serif", fontSize: "0.875rem", fontWeight: "400", lineHeight: "1.5", usage: "Secondary text" },
      { name: "Caption", fontFamily: "Inter, system-ui, sans-serif", fontSize: "0.75rem", fontWeight: "500", lineHeight: "1.4", usage: "Labels, metadata" },
      { name: "Code", fontFamily: "JetBrains Mono, Menlo, monospace", fontSize: "0.875rem", fontWeight: "400", lineHeight: "1.6", usage: "Code blocks" }
    ],
    spacing: [
      { name: "0", value: "0", pixels: 0 },
      { name: "1", value: "0.25rem", pixels: 4 },
      { name: "2", value: "0.5rem", pixels: 8 },
      { name: "3", value: "0.75rem", pixels: 12 },
      { name: "4", value: "1rem", pixels: 16 },
      { name: "5", value: "1.25rem", pixels: 20 },
      { name: "6", value: "1.5rem", pixels: 24 },
      { name: "8", value: "2rem", pixels: 32 },
      { name: "10", value: "2.5rem", pixels: 40 },
      { name: "12", value: "3rem", pixels: 48 },
      { name: "16", value: "4rem", pixels: 64 },
      { name: "20", value: "5rem", pixels: 80 },
      { name: "24", value: "6rem", pixels: 96 }
    ],
    breakpoints: [
      { name: "sm", value: "640px", description: "Mobile landscape" },
      { name: "md", value: "768px", description: "Tablet" },
      { name: "lg", value: "1024px", description: "Desktop" },
      { name: "xl", value: "1280px", description: "Large desktop" },
      { name: "2xl", value: "1536px", description: "Wide screens" }
    ]
  }
};

// Tool definitions
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
      return { content: [{ type: "text", text: `# ${comp.name}\n\n${comp.description}\n\nImport: \`${comp.importStatement}\`\n\n${comp.examples.map(e => `## ${e.title}\n\`\`\`html\n${e.code}\n\`\`\``).join("\n\n")}` }] };
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
