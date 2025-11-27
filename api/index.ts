import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "text/html");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Minimal Design System</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          },
        }
      }
    }
  </script>
  <style>
    * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
    .code-block { background: #0a0a0a; }
    .code-block::-webkit-scrollbar { height: 6px; }
    .code-block::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
  </style>
</head>
<body class="bg-white text-gray-900 font-sans">
  <!-- Header -->
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        </div>
        <span class="font-semibold tracking-tight">Minimal</span>
        <span class="text-xs text-gray-400 font-medium ml-1">v1.0</span>
      </div>
      <nav class="flex items-center gap-1">
        <a href="#components" class="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">Components</a>
        <a href="#colors" class="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">Colors</a>
        <a href="#setup" class="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">Setup</a>
        <a href="https://github.com" target="_blank" class="ml-2 p-2 text-gray-400 hover:text-gray-900 transition-colors">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        </a>
      </nav>
    </div>
  </header>

  <!-- Hero -->
  <section class="pt-32 pb-20 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="max-w-2xl">
        <h1 class="text-5xl font-semibold tracking-tight leading-[1.1]">
          Build faster with<br/>minimal components
        </h1>
        <p class="mt-6 text-lg text-gray-500 leading-relaxed">
          A clean, Vercel-inspired design system with Tailwind CSS.
          Accessible via MCP for AI-powered development.
        </p>
        <div class="mt-8 flex items-center gap-3">
          <a href="#components" class="h-10 px-5 bg-black text-white rounded-lg text-sm font-medium inline-flex items-center hover:bg-gray-800 transition-colors">
            View Components
          </a>
          <a href="#setup" class="h-10 px-5 bg-gray-100 text-gray-900 rounded-lg text-sm font-medium inline-flex items-center hover:bg-gray-200 transition-colors">
            MCP Setup
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Components -->
  <section id="components" class="py-20 px-6 bg-gray-50/50">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-2xl font-semibold tracking-tight">Components</h2>
      <p class="mt-2 text-gray-500">Minimal, accessible components built with Tailwind CSS.</p>

      <!-- Buttons -->
      <div class="mt-12">
        <h3 class="text-sm font-medium text-gray-400 uppercase tracking-wider">Buttons</h3>
        <div class="mt-4 p-8 bg-white rounded-2xl border border-gray-200">
          <div class="flex flex-wrap items-center gap-3">
            <button class="h-10 px-4 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">Primary</button>
            <button class="h-10 px-4 bg-white text-gray-900 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors">Secondary</button>
            <button class="h-10 px-4 bg-gray-100 text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Tertiary</button>
            <button class="h-10 px-4 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">Ghost</button>
            <button class="h-10 px-4 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">Danger</button>
          </div>
          <div class="mt-6 flex flex-wrap items-center gap-3">
            <button class="h-8 px-3 bg-black text-white rounded-md text-xs font-medium">Small</button>
            <button class="h-10 px-4 bg-black text-white rounded-lg text-sm font-medium">Medium</button>
            <button class="h-12 px-6 bg-black text-white rounded-lg text-base font-medium">Large</button>
          </div>
          <div class="mt-6">
            <button class="h-10 px-4 bg-black text-white rounded-lg text-sm font-medium inline-flex items-center gap-2" disabled style="opacity: 0.5; cursor: not-allowed;">
              <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Loading...
            </button>
          </div>
        </div>
        <div class="mt-4 code-block rounded-xl overflow-hidden">
          <pre class="p-4 text-sm text-gray-300 overflow-x-auto font-mono"><code>&lt;button class="h-10 px-4 bg-black text-white rounded-lg text-sm font-medium
  hover:bg-gray-800 transition-colors"&gt;
  Primary
&lt;/button&gt;</code></pre>
        </div>
      </div>

      <!-- Inputs -->
      <div class="mt-16">
        <h3 class="text-sm font-medium text-gray-400 uppercase tracking-wider">Inputs</h3>
        <div class="mt-4 p-8 bg-white rounded-2xl border border-gray-200">
          <div class="max-w-sm space-y-4">
            <input type="text" placeholder="Default input" class="h-10 w-full px-3 bg-white border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow" />
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700">Email address</label>
              <input type="email" placeholder="you@example.com" class="h-10 w-full px-3 bg-white border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700">With error</label>
              <input type="text" value="Invalid value" class="h-10 w-full px-3 bg-white border border-red-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-shadow" />
              <p class="text-sm text-red-500">This field is required</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Cards -->
      <div class="mt-16">
        <h3 class="text-sm font-medium text-gray-400 uppercase tracking-wider">Cards</h3>
        <div class="mt-4 grid md:grid-cols-3 gap-4">
          <div class="p-6 bg-white border border-gray-200 rounded-xl">
            <h4 class="font-semibold text-gray-900">Default Card</h4>
            <p class="mt-2 text-sm text-gray-500">A simple card with border.</p>
          </div>
          <div class="p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all cursor-pointer">
            <h4 class="font-semibold text-gray-900">Interactive Card</h4>
            <p class="mt-2 text-sm text-gray-500">Hover for shadow effect.</p>
          </div>
          <div class="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl text-white">
            <h4 class="font-semibold">Dark Card</h4>
            <p class="mt-2 text-sm text-gray-400">With gradient background.</p>
          </div>
        </div>
      </div>

      <!-- Badges -->
      <div class="mt-16">
        <h3 class="text-sm font-medium text-gray-400 uppercase tracking-wider">Badges</h3>
        <div class="mt-4 p-8 bg-white rounded-2xl border border-gray-200">
          <div class="flex flex-wrap items-center gap-2">
            <span class="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Default</span>
            <span class="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700">Success</span>
            <span class="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-amber-50 text-amber-700">Warning</span>
            <span class="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-red-50 text-red-700">Error</span>
            <span class="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-50 text-blue-700">Info</span>
          </div>
          <div class="mt-4 flex flex-wrap items-center gap-2">
            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700">
              <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              Online
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
              <span class="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
              Offline
            </span>
          </div>
        </div>
      </div>

      <!-- Avatars -->
      <div class="mt-16">
        <h3 class="text-sm font-medium text-gray-400 uppercase tracking-wider">Avatars</h3>
        <div class="mt-4 p-8 bg-white rounded-2xl border border-gray-200">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium">A</div>
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-sm font-medium">BC</div>
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-medium">DE</div>
            <div class="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-lg font-medium">FG</div>
          </div>
          <div class="mt-6 flex items-center -space-x-2">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium ring-2 ring-white">A</div>
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-sm font-medium ring-2 ring-white">B</div>
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-sm font-medium ring-2 ring-white">C</div>
            <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-medium ring-2 ring-white">+3</div>
          </div>
        </div>
      </div>

      <!-- Toggle & Tabs -->
      <div class="mt-16">
        <h3 class="text-sm font-medium text-gray-400 uppercase tracking-wider">Toggle & Tabs</h3>
        <div class="mt-4 p-8 bg-white rounded-2xl border border-gray-200">
          <div class="flex items-center gap-6">
            <button class="w-11 h-6 bg-gray-200 rounded-full relative transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2" onclick="this.classList.toggle('bg-gray-900'); this.classList.toggle('bg-gray-200'); this.querySelector('span').classList.toggle('translate-x-5')">
              <span class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform"></span>
            </button>
            <button class="w-11 h-6 bg-gray-900 rounded-full relative transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
              <span class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform translate-x-5"></span>
            </button>
          </div>
          <div class="mt-8">
            <div class="inline-flex bg-gray-100 rounded-lg p-1">
              <button class="px-4 py-2 text-sm font-medium bg-white text-gray-900 rounded-md shadow-sm">Overview</button>
              <button class="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Analytics</button>
              <button class="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Settings</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Colors -->
  <section id="colors" class="py-20 px-6">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-2xl font-semibold tracking-tight">Colors</h2>
      <p class="mt-2 text-gray-500">A minimal grayscale palette with semantic accents.</p>

      <div class="mt-12">
        <h3 class="text-sm font-medium text-gray-400 uppercase tracking-wider">Gray Scale</h3>
        <div class="mt-4 grid grid-cols-11 gap-2">
          <div class="space-y-2">
            <div class="h-16 rounded-lg bg-gray-50 border border-gray-100"></div>
            <p class="text-xs text-gray-500 font-mono">50</p>
          </div>
          <div class="space-y-2">
            <div class="h-16 rounded-lg bg-gray-100"></div>
            <p class="text-xs text-gray-500 font-mono">100</p>
          </div>
          <div class="space-y-2">
            <div class="h-16 rounded-lg bg-gray-200"></div>
            <p class="text-xs text-gray-500 font-mono">200</p>
          </div>
          <div class="space-y-2">
            <div class="h-16 rounded-lg bg-gray-300"></div>
            <p class="text-xs text-gray-500 font-mono">300</p>
          </div>
          <div class="space-y-2">
            <div class="h-16 rounded-lg bg-gray-400"></div>
            <p class="text-xs text-gray-500 font-mono">400</p>
          </div>
          <div class="space-y-2">
            <div class="h-16 rounded-lg bg-gray-500"></div>
            <p class="text-xs text-gray-500 font-mono">500</p>
          </div>
          <div class="space-y-2">
            <div class="h-16 rounded-lg bg-gray-600"></div>
            <p class="text-xs text-gray-500 font-mono">600</p>
          </div>
          <div class="space-y-2">
            <div class="h-16 rounded-lg bg-gray-700"></div>
            <p class="text-xs text-gray-500 font-mono">700</p>
          </div>
          <div class="space-y-2">
            <div class="h-16 rounded-lg bg-gray-800"></div>
            <p class="text-xs text-gray-500 font-mono">800</p>
          </div>
          <div class="space-y-2">
            <div class="h-16 rounded-lg bg-gray-900"></div>
            <p class="text-xs text-gray-500 font-mono">900</p>
          </div>
          <div class="space-y-2">
            <div class="h-16 rounded-lg bg-gray-950"></div>
            <p class="text-xs text-gray-500 font-mono">950</p>
          </div>
        </div>
      </div>

      <div class="mt-12">
        <h3 class="text-sm font-medium text-gray-400 uppercase tracking-wider">Semantic</h3>
        <div class="mt-4 grid grid-cols-4 gap-4">
          <div class="space-y-2">
            <div class="h-16 rounded-lg bg-blue-500"></div>
            <p class="text-sm font-medium">Blue</p>
            <p class="text-xs text-gray-500">Links, focus</p>
          </div>
          <div class="space-y-2">
            <div class="h-16 rounded-lg bg-emerald-500"></div>
            <p class="text-sm font-medium">Emerald</p>
            <p class="text-xs text-gray-500">Success</p>
          </div>
          <div class="space-y-2">
            <div class="h-16 rounded-lg bg-amber-500"></div>
            <p class="text-sm font-medium">Amber</p>
            <p class="text-xs text-gray-500">Warning</p>
          </div>
          <div class="space-y-2">
            <div class="h-16 rounded-lg bg-red-500"></div>
            <p class="text-sm font-medium">Red</p>
            <p class="text-xs text-gray-500">Error, danger</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Setup -->
  <section id="setup" class="py-20 px-6 bg-gray-50/50">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-2xl font-semibold tracking-tight">MCP Setup</h2>
      <p class="mt-2 text-gray-500">Connect your AI assistant to access the design system.</p>

      <div class="mt-12 grid md:grid-cols-2 gap-6">
        <div class="p-6 bg-white rounded-2xl border border-gray-200">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 22c-5.52 0-10-4.48-10-10S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z"/></svg>
            </div>
            <div>
              <h3 class="font-semibold">Cursor</h3>
              <p class="text-sm text-gray-500">Add to ~/.cursor/mcp.json</p>
            </div>
          </div>
          <div class="mt-4 code-block rounded-xl overflow-hidden">
            <pre class="p-4 text-sm text-gray-300 overflow-x-auto font-mono"><code>{
  "mcpServers": {
    "design-system": {
      "url": "https://aids-server.vercel.app/sse"
    }
  }
}</code></pre>
          </div>
        </div>

        <div class="p-6 bg-white rounded-2xl border border-gray-200">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <div>
              <h3 class="font-semibold">Claude</h3>
              <p class="text-sm text-gray-500">Add to config file</p>
            </div>
          </div>
          <div class="mt-4 code-block rounded-xl overflow-hidden">
            <pre class="p-4 text-sm text-gray-300 overflow-x-auto font-mono"><code>{
  "mcpServers": {
    "design-system": {
      "url": "https://aids-server.vercel.app/sse"
    }
  }
}</code></pre>
          </div>
        </div>
      </div>

      <div class="mt-8 p-6 bg-white rounded-2xl border border-gray-200">
        <h3 class="font-semibold">Available Tools</h3>
        <div class="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div class="p-3 bg-gray-50 rounded-lg">
            <code class="text-sm font-mono text-gray-700">list_components</code>
          </div>
          <div class="p-3 bg-gray-50 rounded-lg">
            <code class="text-sm font-mono text-gray-700">get_component</code>
          </div>
          <div class="p-3 bg-gray-50 rounded-lg">
            <code class="text-sm font-mono text-gray-700">search_components</code>
          </div>
          <div class="p-3 bg-gray-50 rounded-lg">
            <code class="text-sm font-mono text-gray-700">get_style_guide</code>
          </div>
          <div class="p-3 bg-gray-50 rounded-lg">
            <code class="text-sm font-mono text-gray-700">get_colors</code>
          </div>
          <div class="p-3 bg-gray-50 rounded-lg">
            <code class="text-sm font-mono text-gray-700">get_typography</code>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-12 px-6 border-t border-gray-100">
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <p class="text-sm text-gray-400">Built with Tailwind CSS</p>
      <div class="flex items-center gap-1">
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700">
          <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
          MCP Online
        </span>
      </div>
    </div>
  </footer>

  <script>
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  </script>
</body>
</html>`;

  res.status(200).send(html);
}
