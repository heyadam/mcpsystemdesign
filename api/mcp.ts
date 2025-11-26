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
        { name: "leftIcon", type: "ReactNode", required: false, description: "Icon on left side" },
        { name: "rightIcon", type: "ReactNode", required: false, description: "Icon on right side" },
        { name: "fullWidth", type: "boolean", required: false, default: "false", description: "Take full width" },
        { name: "onClick", type: "() => void", required: false, description: "Click handler" },
        { name: "children", type: "ReactNode", required: true, description: "Button content" }
      ],
      examples: [
        { title: "Basic Usage", code: `<Button>Default</Button>\n<Button variant="secondary">Secondary</Button>` },
        { title: "With Icons", code: `<Button leftIcon={<PlusIcon />}>Add Item</Button>` },
        { title: "Loading State", code: `<Button loading>Submitting...</Button>` }
      ],
      relatedComponents: ["IconButton", "ButtonGroup", "Link"]
    },
    {
      name: "Input",
      description: "A form input component for text entry with validation states, labels, and helper text.",
      category: "Forms",
      importStatement: "import { Input } from '@acme/ui'",
      props: [
        { name: "type", type: "'text' | 'email' | 'password' | 'number'", required: false, default: "'text'", description: "Input type" },
        { name: "label", type: "string", required: false, description: "Label text" },
        { name: "placeholder", type: "string", required: false, description: "Placeholder text" },
        { name: "error", type: "string", required: false, description: "Error message" },
        { name: "helperText", type: "string", required: false, description: "Helper text" },
        { name: "disabled", type: "boolean", required: false, default: "false", description: "Whether disabled" },
        { name: "required", type: "boolean", required: false, default: "false", description: "Whether required" }
      ],
      examples: [
        { title: "Basic Input", code: `<Input label="Email" placeholder="Enter email" />` },
        { title: "With Error", code: `<Input label="Email" error="Invalid email" />` }
      ],
      relatedComponents: ["TextArea", "Select", "FormField"]
    },
    {
      name: "Card",
      description: "A container for grouping related content with optional header and footer.",
      category: "Layout",
      importStatement: "import { Card, CardHeader, CardBody, CardFooter } from '@acme/ui'",
      props: [
        { name: "variant", type: "'elevated' | 'outlined' | 'filled'", required: false, default: "'elevated'", description: "Visual style" },
        { name: "padding", type: "'none' | 'sm' | 'md' | 'lg'", required: false, default: "'md'", description: "Internal padding" },
        { name: "hoverable", type: "boolean", required: false, default: "false", description: "Show hover effects" },
        { name: "children", type: "ReactNode", required: true, description: "Card content" }
      ],
      examples: [
        { title: "Basic Card", code: `<Card><CardBody>Content</CardBody></Card>` }
      ],
      relatedComponents: ["Paper", "Box", "Container"]
    },
    {
      name: "Modal",
      description: "A dialog overlay for focused interactions and confirmations.",
      category: "Overlays",
      importStatement: "import { Modal, ModalHeader, ModalBody, ModalFooter } from '@acme/ui'",
      props: [
        { name: "isOpen", type: "boolean", required: true, description: "Whether visible" },
        { name: "onClose", type: "() => void", required: true, description: "Close callback" },
        { name: "size", type: "'sm' | 'md' | 'lg' | 'xl'", required: false, default: "'md'", description: "Modal size" },
        { name: "closeOnOverlayClick", type: "boolean", required: false, default: "true", description: "Close on overlay click" }
      ],
      examples: [
        { title: "Confirmation", code: `<Modal isOpen={isOpen} onClose={close}><ModalBody>Confirm?</ModalBody></Modal>` }
      ],
      relatedComponents: ["Dialog", "Drawer", "AlertDialog"]
    },
    {
      name: "Avatar",
      description: "Display user profile images with fallback to initials.",
      category: "Data Display",
      importStatement: "import { Avatar, AvatarGroup } from '@acme/ui'",
      props: [
        { name: "src", type: "string", required: false, description: "Image URL" },
        { name: "name", type: "string", required: false, description: "Name for initials fallback" },
        { name: "size", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", required: false, default: "'md'", description: "Avatar size" },
        { name: "status", type: "'online' | 'offline' | 'away'", required: false, description: "Status indicator" }
      ],
      examples: [
        { title: "Basic", code: `<Avatar src="/user.jpg" />\n<Avatar name="John Doe" />` }
      ],
      relatedComponents: ["Badge", "UserCard"]
    },
    {
      name: "Toast",
      description: "Notification component for brief messages about actions or events.",
      category: "Feedback",
      importStatement: "import { useToast } from '@acme/ui'",
      props: [
        { name: "title", type: "string", required: false, description: "Toast title" },
        { name: "description", type: "string", required: false, description: "Toast message" },
        { name: "status", type: "'info' | 'success' | 'warning' | 'error'", required: false, default: "'info'", description: "Toast type" },
        { name: "duration", type: "number", required: false, default: "5000", description: "Auto-dismiss time in ms" }
      ],
      examples: [
        { title: "Success Toast", code: `toast({ title: "Success!", status: "success" })` }
      ],
      relatedComponents: ["Alert", "Notification"]
    }
  ],
  styleGuide: {
    colors: [
      {
        name: "Primary",
        description: "Primary brand colors",
        colors: [
          { name: "primary-50", value: "#EEF2FF", usage: "Subtle backgrounds" },
          { name: "primary-500", value: "#6366F1", usage: "Primary buttons, links" },
          { name: "primary-700", value: "#4338CA", usage: "Active/pressed states" },
          { name: "primary-900", value: "#312E81", usage: "Headings" }
        ]
      },
      {
        name: "Neutral",
        description: "Grayscale colors",
        colors: [
          { name: "gray-50", value: "#F9FAFB", usage: "Page backgrounds" },
          { name: "gray-500", value: "#6B7280", usage: "Secondary text" },
          { name: "gray-900", value: "#111827", usage: "Primary text" }
        ]
      },
      {
        name: "Semantic",
        description: "Status and feedback colors",
        colors: [
          { name: "success", value: "#10B981", description: "Success states" },
          { name: "warning", value: "#F59E0B", description: "Warning states" },
          { name: "error", value: "#EF4444", description: "Error states" },
          { name: "info", value: "#3B82F6", description: "Info states" }
        ]
      }
    ],
    typography: [
      { name: "h1", fontFamily: "Inter, sans-serif", fontSize: "2.25rem", fontWeight: "700", lineHeight: "1.2", usage: "Page headings" },
      { name: "h2", fontFamily: "Inter, sans-serif", fontSize: "1.875rem", fontWeight: "600", lineHeight: "1.25", usage: "Section headings" },
      { name: "body", fontFamily: "Inter, sans-serif", fontSize: "1rem", fontWeight: "400", lineHeight: "1.75", usage: "Default body text" },
      { name: "caption", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: "400", lineHeight: "1.5", usage: "Labels, helper text" }
    ],
    spacing: [
      { name: "1", value: "0.25rem", pixels: 4 },
      { name: "2", value: "0.5rem", pixels: 8 },
      { name: "4", value: "1rem", pixels: 16 },
      { name: "6", value: "1.5rem", pixels: 24 },
      { name: "8", value: "2rem", pixels: 32 },
      { name: "12", value: "3rem", pixels: 48 },
      { name: "16", value: "4rem", pixels: 64 }
    ],
    breakpoints: [
      { name: "sm", value: "640px", description: "Small devices" },
      { name: "md", value: "768px", description: "Medium devices" },
      { name: "lg", value: "1024px", description: "Large devices" },
      { name: "xl", value: "1280px", description: "Extra large devices" }
    ]
  }
};

// Tool definitions for MCP
const tools = [
  {
    name: "list_components",
    description: "List all available design system components with their categories",
    inputSchema: { type: "object", properties: {}, required: [] }
  },
  {
    name: "get_component",
    description: "Get detailed specification for a specific component including props, examples, and usage",
    inputSchema: {
      type: "object",
      properties: {
        componentName: { type: "string", description: "Name of the component (case-insensitive)" }
      },
      required: ["componentName"]
    }
  },
  {
    name: "search_components",
    description: "Search for components by name, description, or category",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
        category: { type: "string", description: "Filter by category (optional)" }
      },
      required: ["query"]
    }
  },
  {
    name: "get_component_examples",
    description: "Get code examples for a specific component",
    inputSchema: {
      type: "object",
      properties: {
        componentName: { type: "string", description: "Name of the component" }
      },
      required: ["componentName"]
    }
  },
  {
    name: "get_style_guide",
    description: "Get style guide information (colors, typography, spacing, breakpoints)",
    inputSchema: {
      type: "object",
      properties: {
        section: {
          type: "string",
          enum: ["colors", "typography", "spacing", "breakpoints", "all"],
          description: "Which section of the style guide to retrieve"
        }
      },
      required: []
    }
  },
  {
    name: "get_colors",
    description: "Get color tokens from the design system",
    inputSchema: {
      type: "object",
      properties: {
        category: { type: "string", description: "Color category (Primary, Neutral, Semantic)" }
      },
      required: []
    }
  },
  {
    name: "get_typography",
    description: "Get typography styles from the design system",
    inputSchema: { type: "object", properties: {}, required: [] }
  },
  {
    name: "get_spacing",
    description: "Get spacing scale tokens from the design system",
    inputSchema: { type: "object", properties: {}, required: [] }
  },
  {
    name: "get_breakpoints",
    description: "Get responsive breakpoint definitions",
    inputSchema: { type: "object", properties: {}, required: [] }
  },
  {
    name: "get_design_system_info",
    description: "Get overview information about the design system",
    inputSchema: { type: "object", properties: {}, required: [] }
  }
];

// Tool implementations
function executeTool(name: string, args: Record<string, unknown>): { content: Array<{ type: string; text: string }>; isError?: boolean } {
  switch (name) {
    case "list_components": {
      const componentList = designSystem.components.map((c) => ({
        name: c.name,
        category: c.category,
        description: c.description,
      }));
      const byCategory = componentList.reduce((acc, comp) => {
        if (!acc[comp.category]) acc[comp.category] = [];
        acc[comp.category].push({ name: comp.name, description: comp.description });
        return acc;
      }, {} as Record<string, { name: string; description: string }[]>);

      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            designSystemName: designSystem.name,
            version: designSystem.version,
            totalComponents: componentList.length,
            componentsByCategory: byCategory,
          }, null, 2),
        }],
      };
    }

    case "get_component": {
      const componentName = args.componentName as string;
      const component = designSystem.components.find(
        (c) => c.name.toLowerCase() === componentName.toLowerCase()
      );
      if (!component) {
        return {
          content: [{ type: "text", text: `Component "${componentName}" not found. Available: ${designSystem.components.map(c => c.name).join(", ")}` }],
          isError: true,
        };
      }
      return { content: [{ type: "text", text: JSON.stringify(component, null, 2) }] };
    }

    case "search_components": {
      const query = (args.query as string).toLowerCase();
      const category = args.category as string | undefined;
      let results = designSystem.components.filter((c) =>
        c.name.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query)
      );
      if (category) {
        results = results.filter((c) => c.category.toLowerCase() === category.toLowerCase());
      }
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            query: args.query,
            resultsCount: results.length,
            results: results.map((c) => ({
              name: c.name,
              category: c.category,
              description: c.description,
              importStatement: c.importStatement,
            })),
          }, null, 2),
        }],
      };
    }

    case "get_component_examples": {
      const componentName = args.componentName as string;
      const component = designSystem.components.find(
        (c) => c.name.toLowerCase() === componentName.toLowerCase()
      );
      if (!component) {
        return { content: [{ type: "text", text: `Component "${componentName}" not found.` }], isError: true };
      }
      const examplesText = component.examples
        .map((ex) => `### ${ex.title}\n\`\`\`tsx\n${ex.code}\n\`\`\``)
        .join("\n\n");
      return {
        content: [{ type: "text", text: `# ${component.name} Examples\n\nImport: \`${component.importStatement}\`\n\n${examplesText}` }],
      };
    }

    case "get_style_guide": {
      const section = (args.section as string) || "all";
      const styleGuide = designSystem.styleGuide;
      const result = section === "all" ? styleGuide : { [section]: (styleGuide as any)[section] };
      return {
        content: [{ type: "text", text: JSON.stringify({ designSystem: designSystem.name, section, data: result }, null, 2) }],
      };
    }

    case "get_colors": {
      const category = args.category as string | undefined;
      let colors = designSystem.styleGuide.colors;
      if (category) {
        colors = colors.filter((c) => c.name.toLowerCase() === category.toLowerCase());
      }
      return { content: [{ type: "text", text: JSON.stringify({ colors }, null, 2) }] };
    }

    case "get_typography":
      return { content: [{ type: "text", text: JSON.stringify({ typography: designSystem.styleGuide.typography }, null, 2) }] };

    case "get_spacing":
      return { content: [{ type: "text", text: JSON.stringify({ spacing: designSystem.styleGuide.spacing }, null, 2) }] };

    case "get_breakpoints":
      return { content: [{ type: "text", text: JSON.stringify({ breakpoints: designSystem.styleGuide.breakpoints }, null, 2) }] };

    case "get_design_system_info":
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            name: designSystem.name,
            version: designSystem.version,
            description: designSystem.description,
            stats: {
              totalComponents: designSystem.components.length,
              categories: [...new Set(designSystem.components.map((c) => c.category))],
              colorCategories: designSystem.styleGuide.colors.length,
              typographyStyles: designSystem.styleGuide.typography.length,
            },
          }, null, 2),
        }],
      };

    default:
      return { content: [{ type: "text", text: `Unknown tool: ${name}` }], isError: true };
  }
}

// Handle JSON-RPC requests
function handleJsonRpc(request: { jsonrpc: string; id?: string | number; method: string; params?: unknown }): unknown {
  const { method, params, id } = request;

  switch (method) {
    case "initialize":
      return {
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: "2024-11-05",
          capabilities: {
            tools: {},
          },
          serverInfo: {
            name: "design-system-mcp",
            version: "1.0.0",
          },
        },
      };

    case "notifications/initialized":
      // No response needed for notifications
      return null;

    case "tools/list":
      return {
        jsonrpc: "2.0",
        id,
        result: { tools },
      };

    case "tools/call": {
      const { name, arguments: args } = params as { name: string; arguments?: Record<string, unknown> };
      const result = executeTool(name, args || {});
      return {
        jsonrpc: "2.0",
        id,
        result,
      };
    }

    case "ping":
      return {
        jsonrpc: "2.0",
        id,
        result: {},
      };

    default:
      return {
        jsonrpc: "2.0",
        id,
        error: {
          code: -32601,
          message: `Method not found: ${method}`,
        },
      };
  }
}

// CORS headers
const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Apply CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  // Only accept POST for MCP
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed. Use POST for MCP requests." });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    // Handle batch requests
    if (Array.isArray(body)) {
      const responses = body
        .map((request) => handleJsonRpc(request))
        .filter((response) => response !== null);
      res.status(200).json(responses);
      return;
    }

    // Handle single request
    const response = handleJsonRpc(body);
    if (response === null) {
      // Notification - no response
      res.status(204).end();
      return;
    }

    res.status(200).json(response);
  } catch (error) {
    console.error("MCP handler error:", error);
    res.status(500).json({
      jsonrpc: "2.0",
      id: null,
      error: {
        code: -32700,
        message: "Parse error",
        data: error instanceof Error ? error.message : "Unknown error",
      },
    });
  }
}
