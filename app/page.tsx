import Link from 'next/link';
import { designSystem, getDesignSystemStats, getAllCategories } from '@/lib/design-system';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function HomePage() {
  const stats = getDesignSystemStats();
  const categories = getAllCategories();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-sm border-b border-muted">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">M</span>
            </div>
            <span className="font-semibold text-default">mcpsystem.design</span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link href="/docs/getting-started" className="nav-link">Getting Started</Link>
            <Link href="/components" className="nav-link">Components</Link>
            <a
              href="https://github.com/heyadam/aids-server"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-hover transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5 text-muted" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
              </svg>
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h1 className="text-5xl font-semibold tracking-tight text-default max-w-3xl">
            {designSystem.name}
          </h1>
          <p className="mt-6 text-xl text-muted max-w-2xl">
            {designSystem.description}
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link
              href="/components"
              className="h-12 px-6 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center"
            >
              Browse Components
            </Link>
            <Link
              href="/docs/getting-started"
              className="h-12 px-6 bg-surface-raised text-default border border-default rounded-lg text-sm font-medium hover:bg-surface-hover transition-colors inline-flex items-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      </main>

      {/* MCP Setup */}
      <section className="py-20 bg-surface-sunken">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-semibold text-default">MCP Server Setup</h2>
          <p className="mt-4 text-muted max-w-2xl">
            Connect this design system to your AI assistant (Claude, Cursor) via the Model Context Protocol.
          </p>
          <div className="mt-8 p-6 bg-surface-raised border border-default rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-muted">MCP Configuration</span>
            </div>
            <pre className="text-sm text-default font-mono overflow-x-auto">
{`{
  "mcpServers": {
    "mcpdesignsystem": {
      "url": "https://www.mcpsystem.design/sse"
    }
  }
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-semibold text-default">Design System Overview</h2>
          <div className="mt-8 grid md:grid-cols-4 gap-6">
            <div className="p-6 bg-surface-raised rounded-xl border border-default">
              <p className="text-3xl font-semibold text-default">{stats.totalComponents}</p>
              <p className="mt-1 text-sm text-muted">Components</p>
            </div>
            <div className="p-6 bg-surface-raised rounded-xl border border-default">
              <p className="text-3xl font-semibold text-default">{stats.totalCategories}</p>
              <p className="mt-1 text-sm text-muted">Categories</p>
            </div>
            <div className="p-6 bg-surface-raised rounded-xl border border-default">
              <p className="text-3xl font-semibold text-default">{stats.totalColors}</p>
              <p className="mt-1 text-sm text-muted">Color Tokens</p>
            </div>
            <div className="p-6 bg-surface-raised rounded-xl border border-default">
              <p className="text-3xl font-semibold text-default">{stats.totalTypographyStyles}</p>
              <p className="mt-1 text-sm text-muted">Typography Styles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-surface-sunken">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-semibold text-default">Component Categories</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/components?category=${encodeURIComponent(category)}`}
                className="p-6 bg-surface-raised rounded-xl border border-default hover:border-emphasis hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-default">{category}</h3>
                <p className="mt-2 text-sm text-muted">
                  {designSystem.components.filter(c => c.category === category).length} components
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-default">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <p className="text-sm text-muted">
            mcpsystem.design v{designSystem.version}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/docs/getting-started" className="text-sm text-muted hover:text-default">
              Getting Started
            </Link>
            <Link href="/components" className="text-sm text-muted hover:text-default">
              Components
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
