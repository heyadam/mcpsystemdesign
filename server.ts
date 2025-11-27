import http from "node:http";

// Import the handlers
import indexHandler from "./api/index.js";
import sseHandler from "./api/sse.js";

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
      await sseHandler(vercelReq, vercelRes);
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
    "design-system": {
      "url": "http://localhost:${PORT}/sse"
    }
  }
}
`);
});
