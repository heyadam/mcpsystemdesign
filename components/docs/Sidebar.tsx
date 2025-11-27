'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getNavigationItems } from '@/lib/design-system';

export function Sidebar() {
  const pathname = usePathname();
  const navItems = getNavigationItems();

  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 dark:border-gray-800 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto hidden md:block bg-white dark:bg-gray-950">
      <nav className="p-4 space-y-6">
        {/* Overview links */}
        <div>
          <Link
            href="/components"
            className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
              pathname === '/components'
                ? 'text-gray-900 dark:text-gray-100 font-medium bg-gray-100 dark:bg-gray-800'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            All Components
          </Link>
        </div>

        {/* Component categories */}
        {navItems.map(({ category, components }) => (
          <div key={category.slug}>
            <div className="px-3 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
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
                        ? 'text-gray-900 dark:text-gray-100 font-medium bg-gray-100 dark:bg-gray-800 border-l-2 border-gray-900 dark:border-gray-100 -ml-0.5 pl-[10px]'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
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
