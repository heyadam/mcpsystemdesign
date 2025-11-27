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
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DS</span>
            </div>
            <span className="font-semibold text-gray-900">AI Design System</span>
          </div>
          <nav className="flex items-center gap-1">
            <Link href="/docs" className="nav-link">Docs</Link>
            <Link href="/components" className="nav-link">Components</Link>
            <a href="/sse" className="nav-link">MCP Server</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="nav-link">
              GitHub
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

      {/* Stats */}
      <section className="py-20 px-6 bg-gray-50/50">
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
      <section className="py-20 px-6">
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
    "design-system": {
      "url": "https://aids-server.vercel.app/sse"
    }
  }
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p className="text-sm text-gray-500">
            AI Design System v{designSystem.version}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/docs" className="text-sm text-gray-500 hover:text-gray-900">
              Docs
            </Link>
            <Link href="/components" className="text-sm text-gray-500 hover:text-gray-900">
              Components
            </Link>
            <a href="/sse" className="text-sm text-gray-500 hover:text-gray-900">
              MCP
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
