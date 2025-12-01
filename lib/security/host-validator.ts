// Whitelist of allowed hosts for the SSE endpoint
const ALLOWED_HOSTS = new Set([
  'www.mcpsystem.design',
  'mcpsystem.design',
  'localhost:3000',
  'localhost',
  '127.0.0.1:3000',
  '127.0.0.1',
]);

// Pattern for Vercel preview deployments (e.g., project-name-git-branch-team.vercel.app)
const VERCEL_PREVIEW_PATTERN = /^[\w-]+-[\w-]+-[\w-]+\.vercel\.app$/;

// Default host to use when an invalid host is detected
const DEFAULT_HOST = 'www.mcpsystem.design';

/**
 * Validate the Host header against the whitelist.
 * Returns a safe host value (either the validated host or the default).
 */
export function validateHost(host: string | null): string {
  if (!host) {
    return DEFAULT_HOST;
  }

  const normalized = host.toLowerCase();

  // Check against explicit whitelist
  if (ALLOWED_HOSTS.has(normalized)) {
    return host;
  }

  // Allow Vercel preview deployments
  if (VERCEL_PREVIEW_PATTERN.test(normalized)) {
    return host;
  }

  // Log and reject invalid hosts (structured JSON for Vercel log aggregation)
  console.log(JSON.stringify({
    level: 'warn',
    message: 'Invalid host header rejected',
    host,
    timestamp: new Date().toISOString(),
  }));
  return DEFAULT_HOST;
}

/**
 * Build the full endpoint URL from a validated host
 */
export function buildEndpointUrl(validatedHost: string): string {
  const isLocal = validatedHost.includes('localhost') || validatedHost.includes('127.0.0.1');
  const protocol = isLocal ? 'http' : 'https';
  return `${protocol}://${validatedHost}/sse`;
}
