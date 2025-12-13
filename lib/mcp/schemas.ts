import { z } from 'zod';

// JSON-RPC 2.0 request validation
export const JsonRpcRequestSchema = z.object({
  jsonrpc: z.literal('2.0'),
  id: z.union([z.string(), z.number()]).optional(),
  method: z.string().min(1).max(100),
  params: z.record(z.unknown()).optional(),
});

// Tool call parameters
export const ToolCallParamsSchema = z.object({
  name: z.string().min(1).max(100),
  arguments: z.record(z.unknown()).optional(),
});

// Pattern name argument (for get_pattern, get_pattern_examples)
export const PatternNameArgsSchema = z.object({
  componentName: z.string().min(1).max(100),
});

// Search query argument
export const SearchArgsSchema = z.object({
  query: z.string().min(1).max(200),
});

// Style guide section argument
export const StyleGuideSectionSchema = z.object({
  section: z.enum(['colors', 'typography', 'spacing', 'breakpoints', 'all']).optional(),
});

// Color category argument
export const ColorCategorySchema = z.object({
  category: z.string().max(100).optional(),
});

// Batch request validation (max 100 items to prevent abuse)
export const BatchRequestSchema = z.array(JsonRpcRequestSchema).max(100);

// Generate boilerplate arguments
export const GenerateBoilerplateArgsSchema = z.object({
  projectName: z.string().max(100).optional(),
  theme: z.enum(['light', 'dark']).optional(),
  includeExamples: z.boolean().optional(),
});
