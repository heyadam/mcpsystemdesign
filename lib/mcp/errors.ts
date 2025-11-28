import type { ZodError } from 'zod';

// Standard JSON-RPC 2.0 error codes
export const JsonRpcErrorCodes = {
  PARSE_ERROR: -32700,
  INVALID_REQUEST: -32600,
  METHOD_NOT_FOUND: -32601,
  INVALID_PARAMS: -32602,
  INTERNAL_ERROR: -32603,
  // Custom error codes (server-defined, must be between -32000 and -32099)
  RATE_LIMITED: -32000,
} as const;

export interface JsonRpcError {
  code: number;
  message: string;
  data?: unknown;
}

export interface JsonRpcErrorResponse {
  jsonrpc: '2.0';
  id: string | number | null;
  error: JsonRpcError;
}

/**
 * Create a JSON-RPC error response
 */
export function createErrorResponse(
  id: string | number | null,
  code: number,
  message: string,
  data?: unknown
): Record<string, unknown> {
  return {
    jsonrpc: '2.0',
    id,
    error: { code, message, ...(data !== undefined && { data }) },
  };
}

/**
 * Format Zod validation errors into a readable string
 */
export function formatZodError(error: ZodError): string {
  return error.errors
    .map(e => `${e.path.join('.') || 'root'}: ${e.message}`)
    .join('; ');
}
