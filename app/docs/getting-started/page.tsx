'use client';

import { useState } from 'react';

const cursorConfig = `{
  "mcpServers": {
    "mcpdesignsystem": {
      "url": "https://www.mcpsystem.design/sse"
    }
  }
}`;

const claudeCodeConfig = `{
  "mcpServers": {
    "mcpdesignsystem": {
      "url": "https://www.mcpsystem.design/sse"
    }
  }
}`;

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1"
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

function ConfigBlock({ config, filename }: { config: string; filename: string }) {
  return (
    <div className="bg-surface-raised border border-default rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-default">
        <span className="text-xs text-muted font-mono">{filename}</span>
        <CopyButton text={config} />
      </div>
      <pre className="p-4 text-sm text-default overflow-x-auto font-mono">
        <code>{config}</code>
      </pre>
    </div>
  );
}

const tools = [
  { name: 'list_components', description: 'List all components organized by category' },
  { name: 'get_component', description: 'Get detailed specs, props, and examples for a component' },
  { name: 'search_components', description: 'Search components by name or description' },
  { name: 'get_component_examples', description: 'Get code examples for a specific component' },
  { name: 'get_style_guide', description: 'Get colors, typography, spacing, and breakpoints' },
  { name: 'get_colors', description: 'Get color tokens, optionally filtered by category' },
  { name: 'get_typography', description: 'Get typography scale and font styles' },
  { name: 'get_spacing', description: 'Get spacing scale tokens' },
  { name: 'get_breakpoints', description: 'Get responsive breakpoint definitions' },
  { name: 'get_design_system_info', description: 'Get design system overview and statistics' },
];

export default function GettingStartedPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Getting Started</h1>
      <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
        Connect mcpsystem.design to your AI assistant via the Model Context Protocol (MCP).
      </p>

      {/* Cursor Section */}
      <section id="cursor" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-3">
          <span className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white dark:text-black" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </span>
          Cursor
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Add this configuration to your project's <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono">.cursor/mcp.json</code> file:
        </p>
        <div className="mt-4">
          <ConfigBlock config={cursorConfig} filename=".cursor/mcp.json" />
        </div>
      </section>

      {/* Claude Code Section */}
      <section id="claude-code" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-3">
          <span className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </span>
          Claude Code
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Add this configuration to your <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono">.claude/settings.json</code> file:
        </p>
        <div className="mt-4">
          <ConfigBlock config={claudeCodeConfig} filename=".claude/settings.json" />
        </div>
      </section>

      {/* Verification Section */}
      <section id="verification" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Verify Connection</h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          After adding the configuration, restart your editor. Then try asking your AI assistant:
        </p>
        <ul className="mt-4 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-gray-400 dark:text-gray-500 mt-1">•</span>
            <code className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">"List all available components"</code>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400 dark:text-gray-500 mt-1">•</span>
            <code className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">"Show me the Button component"</code>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400 dark:text-gray-500 mt-1">•</span>
            <code className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">"What colors are in the design system?"</code>
          </li>
        </ul>
      </section>

      {/* Available Tools Section */}
      <section id="tools" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Available Tools</h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          The MCP server exposes these tools to your AI assistant:
        </p>
        <div className="mt-4 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tool
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {tools.map((tool) => (
                <tr key={tool.name} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="px-4 py-3">
                    <code className="text-sm font-mono text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-1.5 py-0.5 rounded">
                      {tool.name}
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {tool.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
