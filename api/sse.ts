import type { VercelRequest, VercelResponse } from "@vercel/node";

// CORS headers
const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization, Cache-Control",
  "Access-Control-Expose-Headers": "Content-Type",
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

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // Generate session ID
  const sessionId = crypto.randomUUID();

  // Set SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");

  // Send the endpoint event - tell client where to POST messages
  const messageEndpoint = `https://aids-server.vercel.app/api/mcp?sessionId=${sessionId}`;
  res.write(`event: endpoint\ndata: ${messageEndpoint}\n\n`);

  // Keep connection alive with periodic pings
  const keepAlive = setInterval(() => {
    res.write(`: ping\n\n`);
  }, 15000);

  // Handle client disconnect
  req.on("close", () => {
    clearInterval(keepAlive);
  });

  // Note: In a stateless serverless environment, we can't maintain
  // persistent SSE connections for server-initiated messages.
  // The client will receive responses via the POST endpoint.
  // This SSE connection is mainly for initialization and keep-alive.
}
