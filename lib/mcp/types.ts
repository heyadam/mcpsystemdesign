import { z } from 'zod';
import {
  JsonRpcRequestSchema,
  ToolCallParamsSchema,
  ComponentNameArgsSchema,
  SearchArgsSchema,
  StyleGuideSectionSchema,
  ColorCategorySchema,
} from './schemas';

// Types derived from Zod schemas
export type JsonRpcRequest = z.infer<typeof JsonRpcRequestSchema>;
export type ToolCallParams = z.infer<typeof ToolCallParamsSchema>;
export type ComponentNameArgs = z.infer<typeof ComponentNameArgsSchema>;
export type SearchArgs = z.infer<typeof SearchArgsSchema>;
export type StyleGuideSectionArgs = z.infer<typeof StyleGuideSectionSchema>;
export type ColorCategoryArgs = z.infer<typeof ColorCategorySchema>;

// Tool execution result
export interface ToolResult {
  content: Array<{ type: string; text: string }>;
  isError?: boolean;
}

// JSON-RPC response types
export interface JsonRpcSuccessResponse {
  jsonrpc: '2.0';
  id?: string | number;
  result: unknown;
}

export interface JsonRpcResponse {
  jsonrpc: '2.0';
  id?: string | number | null;
  result?: unknown;
  error?: { code: number; message: string; data?: unknown };
}
