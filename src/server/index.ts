import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { designSystem } from "../data/design-system.js";
import type { Component, StyleGuide } from "../data/types.js";

export function createMcpServer(): McpServer {
  const server = new McpServer({
    name: "mcpdesignsystem",
    version: "1.0.0",
  });

  // Tool: List all components
  server.tool(
    "list_components",
    "List all available design system components with their categories",
    {},
    async () => {
      const componentList = designSystem.components.map((c) => ({
        name: c.name,
        category: c.category,
        description: c.description,
      }));

      const byCategory = componentList.reduce(
        (acc, comp) => {
          if (!acc[comp.category]) {
            acc[comp.category] = [];
          }
          acc[comp.category].push({ name: comp.name, description: comp.description });
          return acc;
        },
        {} as Record<string, { name: string; description: string }[]>
      );

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                designSystemName: designSystem.name,
                version: designSystem.version,
                totalComponents: componentList.length,
                componentsByCategory: byCategory,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // Tool: Get component details
  server.tool(
    "get_component",
    "Get detailed specification for a specific component including props, examples, and usage",
    {
      componentName: z.string().describe("Name of the component (case-insensitive)"),
    },
    async ({ componentName }) => {
      const component = designSystem.components.find(
        (c) => c.name.toLowerCase() === componentName.toLowerCase()
      );

      if (!component) {
        const availableComponents = designSystem.components.map((c) => c.name).join(", ");
        return {
          content: [
            {
              type: "text" as const,
              text: `Component "${componentName}" not found. Available components: ${availableComponents}`,
            },
          ],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(component, null, 2),
          },
        ],
      };
    }
  );

  // Tool: Search components
  server.tool(
    "search_components",
    "Search for components by name, description, or category",
    {
      query: z.string().describe("Search query"),
      category: z.string().optional().describe("Filter by category"),
    },
    async ({ query, category }) => {
      const queryLower = query.toLowerCase();
      let results = designSystem.components.filter((c) => {
        const matchesQuery =
          c.name.toLowerCase().includes(queryLower) ||
          c.description.toLowerCase().includes(queryLower) ||
          c.category.toLowerCase().includes(queryLower);
        return matchesQuery;
      });

      if (category) {
        results = results.filter(
          (c) => c.category.toLowerCase() === category.toLowerCase()
        );
      }

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                query,
                category: category || "all",
                resultsCount: results.length,
                results: results.map((c) => ({
                  name: c.name,
                  category: c.category,
                  description: c.description,
                  importStatement: c.importStatement,
                })),
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // Tool: Get component code examples
  server.tool(
    "get_component_examples",
    "Get code examples for a specific component",
    {
      componentName: z.string().describe("Name of the component"),
    },
    async ({ componentName }) => {
      const component = designSystem.components.find(
        (c) => c.name.toLowerCase() === componentName.toLowerCase()
      );

      if (!component) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Component "${componentName}" not found.`,
            },
          ],
          isError: true,
        };
      }

      const examplesText = component.examples
        .map(
          (ex) =>
            `### ${ex.title}\n${ex.description ? ex.description + "\n" : ""}\n\`\`\`tsx\n${ex.code}\n\`\`\``
        )
        .join("\n\n");

      return {
        content: [
          {
            type: "text" as const,
            text: `# ${component.name} Examples\n\nImport: \`${component.importStatement}\`\n\n${examplesText}`,
          },
        ],
      };
    }
  );

  // Tool: Get style guide (all or specific section)
  server.tool(
    "get_style_guide",
    "Get style guide information (colors, typography, spacing, breakpoints)",
    {
      section: z
        .enum(["colors", "typography", "spacing", "breakpoints", "all"])
        .optional()
        .describe("Which section of the style guide to retrieve"),
    },
    async ({ section = "all" }) => {
      const styleGuide = designSystem.styleGuide;
      let result: Partial<StyleGuide> | StyleGuide;

      if (section === "all") {
        result = styleGuide;
      } else {
        result = { [section]: styleGuide[section] };
      }

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                designSystem: designSystem.name,
                section,
                data: result,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // Tool: Get colors
  server.tool(
    "get_colors",
    "Get color tokens from the design system",
    {
      category: z
        .string()
        .optional()
        .describe("Color category (e.g., 'Primary', 'Neutral', 'Semantic')"),
    },
    async ({ category }) => {
      let colors = designSystem.styleGuide.colors;

      if (category) {
        colors = colors.filter(
          (c) => c.name.toLowerCase() === category.toLowerCase()
        );
        if (colors.length === 0) {
          const availableCategories = designSystem.styleGuide.colors
            .map((c) => c.name)
            .join(", ");
          return {
            content: [
              {
                type: "text" as const,
                text: `Color category "${category}" not found. Available categories: ${availableCategories}`,
              },
            ],
            isError: true,
          };
        }
      }

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({ colors }, null, 2),
          },
        ],
      };
    }
  );

  // Tool: Get typography
  server.tool(
    "get_typography",
    "Get typography styles from the design system",
    {},
    async () => {
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              { typography: designSystem.styleGuide.typography },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // Tool: Get spacing scale
  server.tool(
    "get_spacing",
    "Get spacing scale tokens from the design system",
    {},
    async () => {
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              { spacing: designSystem.styleGuide.spacing },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // Tool: Get breakpoints
  server.tool(
    "get_breakpoints",
    "Get responsive breakpoint definitions",
    {},
    async () => {
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              { breakpoints: designSystem.styleGuide.breakpoints },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // Tool: Get design system overview
  server.tool(
    "get_design_system_info",
    "Get overview information about the design system",
    {},
    async () => {
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                name: designSystem.name,
                version: designSystem.version,
                description: designSystem.description,
                stats: {
                  totalComponents: designSystem.components.length,
                  categories: [
                    ...new Set(designSystem.components.map((c) => c.category)),
                  ],
                  colorCategories: designSystem.styleGuide.colors.length,
                  typographyStyles: designSystem.styleGuide.typography.length,
                  spacingTokens: designSystem.styleGuide.spacing.length,
                  breakpoints: designSystem.styleGuide.breakpoints.length,
                },
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  return server;
}

// For local stdio testing
async function main() {
  const { StdioServerTransport } = await import(
    "@modelcontextprotocol/sdk/server/stdio.js"
  );
  const server = createMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Design System MCP Server running on stdio");
}

// Only run if this is the main module
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  main().catch(console.error);
}
