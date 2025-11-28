'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getNavigationItems } from '@/lib/design-system';

export function Sidebar() {
  const pathname = usePathname();
  const navItems = getNavigationItems();

  // Determine which section we're in
  const isComponentsSection = pathname.startsWith('/components');
  const isDocsSection = pathname.startsWith('/docs');

  return (
    <aside className="w-64 shrink-0 border-r border-default h-[calc(100vh-64px)] sticky top-16 overflow-y-auto hidden md:block bg-surface">
      <nav className="p-4 space-y-6">
        {/* Back to home */}
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-sm text-muted hover:text-default transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Overview links */}
        <div>
          <Link
            href="/components"
            className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
              pathname === '/components'
                ? 'text-default font-medium bg-surface-hover'
                : 'text-muted hover:bg-surface-hover hover:text-default'
            }`}
          >
            All Components
          </Link>
        </div>

        {/* Component categories */}
        {navItems.map(({ category, components }) => (
          <div key={category.slug}>
            <div className="px-3 py-2 text-xs font-semibold text-subtle uppercase tracking-wider">
              {category.name}
            </div>
            <div className="mt-1 space-y-1">
              {components.map((component) => {
                const isActive = pathname === `/components/${component.slug}`;
                return (
                  <Link
                    key={component.slug}
                    href={`/components/${component.slug}`}
                    className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                      isActive
                        ? 'text-default font-medium bg-surface-hover border-l-2 border-primary -ml-0.5 pl-[10px]'
                        : 'text-muted hover:bg-surface-hover hover:text-default'
                    }`}
                  >
                    {component.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
