'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getNavigationItems } from '@/lib/design-system';

export function Sidebar() {
  const pathname = usePathname();
  const navItems = getNavigationItems();

  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto hidden md:block">
      <nav className="p-4 space-y-6">
        {/* Overview links */}
        <div>
          <Link
            href="/components"
            className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
              pathname === '/components'
                ? 'text-gray-900 font-medium bg-gray-100'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            All Components
          </Link>
        </div>

        {/* Component categories */}
        {navItems.map(({ category, components }) => (
          <div key={category.slug}>
            <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
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
                        ? 'text-gray-900 font-medium bg-gray-100 border-l-2 border-gray-900 -ml-0.5 pl-[10px]'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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
