interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory store for rate limiting
// Note: This resets on cold starts and is not shared across serverless instances
// For stricter rate limiting, consider using Redis/Upstash
const store = new Map<string, RateLimitEntry>();

// Rate limit configuration
const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 100; // per window per IP
const MAX_STORE_SIZE = 10_000; // prevent memory issues

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Check if a client has exceeded the rate limit
 */
export function checkRateLimit(clientId: string): RateLimitResult {
  const now = Date.now();
  const entry = store.get(clientId);

  // Cleanup if store gets too large
  if (store.size > MAX_STORE_SIZE) {
    for (const [key, val] of store) {
      if (val.resetAt < now) {
        store.delete(key);
      }
    }
  }

  // New client or window expired
  if (!entry || entry.resetAt < now) {
    const resetAt = now + WINDOW_MS;
    store.set(clientId, { count: 1, resetAt });
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetAt };
  }

  // Rate limit exceeded
  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  // Increment count
  entry.count++;
  return {
    allowed: true,
    remaining: MAX_REQUESTS - entry.count,
    resetAt: entry.resetAt,
  };
}

/**
 * Extract client IP from request headers
 * Vercel provides x-forwarded-for for the real client IP
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || 'unknown';
}
