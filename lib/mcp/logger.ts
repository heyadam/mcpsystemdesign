export interface LogContext {
  requestId: string;
  method?: string;
  ip?: string;
  timestamp: string;
}

export interface Logger {
  info: (message: string, data?: Record<string, unknown>) => void;
  warn: (message: string, data?: Record<string, unknown>) => void;
  error: (message: string, err?: Error, data?: Record<string, unknown>) => void;
}

/**
 * Generate a unique request ID for tracing
 */
export function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Create a structured logger that outputs JSON for Vercel logs
 */
export function createLogger(context: LogContext): Logger {
  const log = (level: string, message: string, data?: Record<string, unknown>) => {
    const entry = {
      level,
      message,
      ...context,
      ...data,
    };
    console.log(JSON.stringify(entry));
  };

  return {
    info: (message: string, data?: Record<string, unknown>) =>
      log('info', message, data),
    warn: (message: string, data?: Record<string, unknown>) =>
      log('warn', message, data),
    error: (message: string, err?: Error, data?: Record<string, unknown>) =>
      log('error', message, {
        ...data,
        ...(err && { errorMessage: err.message, errorStack: err.stack })
      }),
  };
}
