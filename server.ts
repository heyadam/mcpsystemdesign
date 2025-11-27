import http from "node:http";

// Import the handlers
import indexHandler from "./api/index.js";
// Note: SSE endpoint is now at app/api/sse/route.ts (Next.js App Router)
// Use `npm run dev` for local development with the full Next.js server

const PORT = process.env.PORT || 3000;

// Create a mock request/response that matches Vercel's API
function createMockReqRes(req: http.IncomingMessage, res: http.ServerResponse) {
  const url = new URL(req.url || "/", `http://localhost:${PORT}`);

  // Mock VercelRequest
  const vercelReq: any = req;
  vercelReq.query = Object.fromEntries(url.searchParams);
  vercelReq.body = null;

  // Mock VercelResponse
  const vercelRes: any = res;
  vercelRes.status = (code: number) => {
    res.statusCode = code;
    return vercelRes;
  };
  vercelRes.json = (data: any) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  };
  vercelRes.send = (data: string) => {
    res.end(data);
  };

  return { vercelReq, vercelRes };
}

// Parse JSON body
async function parseBody(req: http.IncomingMessage): Promise<any> {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : null);
      } catch {
        resolve(body);
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://localhost:${PORT}`);
  const { vercelReq, vercelRes } = createMockReqRes(req, res);

  // Parse body for POST requests
  if (req.method === "POST") {
    vercelReq.body = await parseBody(req);
  }

  // Route handling
  const path = url.pathname;

  try {
    if (path === "/" || path === "/api/index") {
      await indexHandler(vercelReq, vercelRes);
    } else if (path === "/sse" || path === "/api/sse") {
      // SSE endpoint is now handled by Next.js App Router
      res.statusCode = 301;
      res.setHeader("Location", "http://localhost:3000/api/sse");
      res.end("Redirecting to Next.js server");
    } else {
      res.statusCode = 404;
      res.end("Not found");
    }
  } catch (error) {
    console.error("Error:", error);
    res.statusCode = 500;
    res.end("Internal server error");
  }
});

server.listen(PORT, () => {
  console.log(`
🚀 Local server running at http://localhost:${PORT}

Routes:
  • Landing page: http://localhost:${PORT}/
  • SSE endpoint:  http://localhost:${PORT}/sse

MCP config for local testing:
{
  "mcpServers": {
    "aids": {
      "url": "http://localhost:${PORT}/sse"
    }
  }
}
`);
});
