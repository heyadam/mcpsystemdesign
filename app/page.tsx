import Link from 'next/link';
import { designSystem, getDesignSystemStats, getAllCategories } from '@/lib/design-system';

export default function HomePage() {
  const stats = getDesignSystemStats();
  const categories = getAllCategories();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="font-semibold text-gray-900">AIDS</span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link href="/docs/getting-started" className="nav-link">Getting Started</Link>
            <Link href="/components" className="nav-link">Components</Link>
            <a
              href="https://github.com/heyadam/aids-server"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
              </svg>
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-semibold tracking-tight text-gray-900 max-w-3xl">
            {designSystem.name}
          </h1>
          <p className="mt-6 text-xl text-gray-500 max-w-2xl">
            {designSystem.description}
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link
              href="/components"
              className="h-12 px-6 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors inline-flex items-center"
            >
              Browse Components
            </Link>
            <Link
              href="/docs/getting-started"
              className="h-12 px-6 bg-white text-gray-900 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors inline-flex items-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      </main>

      {/* MCP Setup */}
      <section className="py-20 px-6 bg-gray-50/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900">MCP Server Setup</h2>
          <p className="mt-4 text-gray-500 max-w-2xl">
            Connect this design system to your AI assistant (Claude, Cursor) via the Model Context Protocol.
          </p>
          <div className="mt-8 p-6 bg-gray-950 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-gray-500">MCP Configuration</span>
            </div>
            <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
{`{
  "mcpServers": {
    "aids": {
      "url": "https://aids-server.vercel.app/sse"
    }
  }
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900">Design System Overview</h2>
          <div className="mt-8 grid md:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-xl border border-gray-200">
              <p className="text-3xl font-semibold text-gray-900">{stats.totalComponents}</p>
              <p className="mt-1 text-sm text-gray-500">Components</p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-gray-200">
              <p className="text-3xl font-semibold text-gray-900">{stats.totalCategories}</p>
              <p className="mt-1 text-sm text-gray-500">Categories</p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-gray-200">
              <p className="text-3xl font-semibold text-gray-900">{stats.totalColors}</p>
              <p className="mt-1 text-sm text-gray-500">Color Tokens</p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-gray-200">
              <p className="text-3xl font-semibold text-gray-900">{stats.totalTypographyStyles}</p>
              <p className="mt-1 text-sm text-gray-500">Typography Styles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-6 bg-gray-50/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900">Component Categories</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/components?category=${encodeURIComponent(category)}`}
                className="p-6 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900">{category}</h3>
                <p className="mt-2 text-sm text-gray-500">
                  {designSystem.components.filter(c => c.category === category).length} components
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p className="text-sm text-gray-500">
            AIDS v{designSystem.version}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/docs/getting-started" className="text-sm text-gray-500 hover:text-gray-900">
              Getting Started
            </Link>
            <Link href="/components" className="text-sm text-gray-500 hover:text-gray-900">
              Components
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
