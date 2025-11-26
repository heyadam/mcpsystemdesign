import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "text/html");

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Design System MCP Server</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 16px;
      padding: 40px;
      max-width: 600px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    h1 { color: #1f2937; margin-bottom: 8px; }
    .version { color: #6b7280; margin-bottom: 24px; font-size: 14px; }
    .status {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #d1fae5;
      color: #065f46;
      padding: 6px 12px;
      border-radius: 9999px;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 24px;
    }
    .status::before {
      content: '';
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
    }
    h2 { color: #374151; font-size: 18px; margin-bottom: 12px; margin-top: 24px; }
    p { color: #4b5563; line-height: 1.6; margin-bottom: 16px; }
    .endpoint {
      background: #f3f4f6;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 12px;
    }
    .endpoint-method {
      display: inline-block;
      background: #3b82f6;
      color: white;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      margin-right: 8px;
    }
    .endpoint-method.post { background: #10b981; }
    .endpoint-path {
      font-family: 'SF Mono', Monaco, monospace;
      color: #1f2937;
    }
    .endpoint-desc {
      color: #6b7280;
      font-size: 14px;
      margin-top: 8px;
    }
    .tools {
      display: grid;
      gap: 8px;
      margin-top: 12px;
    }
    .tool {
      background: #faf5ff;
      border: 1px solid #e9d5ff;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 14px;
    }
    .tool-name {
      font-family: 'SF Mono', Monaco, monospace;
      color: #7c3aed;
      font-weight: 500;
    }
    .tool-desc {
      color: #6b7280;
      margin-top: 4px;
      font-size: 13px;
    }
    code {
      background: #f3f4f6;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'SF Mono', Monaco, monospace;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎨 Design System MCP Server</h1>
    <p class="version">v1.0.0</p>
    <div class="status">Running</div>

    <p>This is a Model Context Protocol (MCP) server that exposes design system components and style guides for AI assistants.</p>

    <h2>Endpoints</h2>
    <div class="endpoint">
      <span class="endpoint-method">GET</span>
      <span class="endpoint-path">/api/mcp</span>
      <p class="endpoint-desc">Establish SSE connection for MCP communication</p>
    </div>
    <div class="endpoint">
      <span class="endpoint-method post">POST</span>
      <span class="endpoint-path">/api/mcp?sessionId=...</span>
      <p class="endpoint-desc">Send messages to the MCP server</p>
    </div>
    <div class="endpoint">
      <span class="endpoint-method">GET</span>
      <span class="endpoint-path">/api/health</span>
      <p class="endpoint-desc">Health check endpoint</p>
    </div>

    <h2>Available Tools</h2>
    <div class="tools">
      <div class="tool">
        <div class="tool-name">list_components</div>
        <div class="tool-desc">List all design system components</div>
      </div>
      <div class="tool">
        <div class="tool-name">get_component</div>
        <div class="tool-desc">Get detailed component specification</div>
      </div>
      <div class="tool">
        <div class="tool-name">search_components</div>
        <div class="tool-desc">Search components by name or description</div>
      </div>
      <div class="tool">
        <div class="tool-name">get_component_examples</div>
        <div class="tool-desc">Get code examples for a component</div>
      </div>
      <div class="tool">
        <div class="tool-name">get_style_guide</div>
        <div class="tool-desc">Get style guide information</div>
      </div>
      <div class="tool">
        <div class="tool-name">get_colors</div>
        <div class="tool-desc">Get color tokens</div>
      </div>
      <div class="tool">
        <div class="tool-name">get_typography</div>
        <div class="tool-desc">Get typography styles</div>
      </div>
      <div class="tool">
        <div class="tool-name">get_spacing</div>
        <div class="tool-desc">Get spacing scale</div>
      </div>
      <div class="tool">
        <div class="tool-name">get_breakpoints</div>
        <div class="tool-desc">Get responsive breakpoints</div>
      </div>
      <div class="tool">
        <div class="tool-name">get_design_system_info</div>
        <div class="tool-desc">Get design system overview</div>
      </div>
    </div>

    <h2>Usage with Claude</h2>
    <p>Add this to your Claude MCP configuration:</p>
    <div class="endpoint">
      <code>{ "url": "https://your-deployment.vercel.app/api/mcp" }</code>
    </div>
  </div>
</body>
</html>
  `;

  res.status(200).send(html);
}
