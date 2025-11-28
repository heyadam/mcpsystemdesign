'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getNavigationItems } from '@/lib/design-system';

export function Sidebar() {
  const pathname = usePathname();
  const navItems = getNavigationItems();

  return (
    <aside className="w-64 shrink-0 border-r border-default h-[calc(100vh-64px)] sticky top-16 overflow-y-auto hidden md:block bg-surface">
      <nav className="p-4 space-y-6">
        {/* Overview links */}
        <div>
          <Link
            href="/components"
            className={pathname === '/components' ? 'nav-link-active' : 'nav-link'}
          >
            All Components
          </Link>
        </div>

        {/* Component categories */}
        {navItems.map(({ category, components }) => (
          <div key={category.slug}>
            <div className="sidebar-category">
              {category.name}
            </div>
            <div className="mt-1 space-y-1">
              {components.map((component) => {
                const isActive = pathname === `/components/${component.slug}`;
                return (
                  <Link
                    key={component.slug}
                    href={`/components/${component.slug}`}
                    className={isActive ? 'nav-link-active' : 'nav-link'}
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
