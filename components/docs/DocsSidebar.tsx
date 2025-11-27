'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const docsNavItems = [
  {
    title: 'Getting Started',
    href: '/docs/getting-started',
    sections: [
      { id: 'cursor', label: 'Cursor' },
      { id: 'claude-code', label: 'Claude Code' },
      { id: 'verification', label: 'Verification' },
      { id: 'tools', label: 'Available Tools' },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 dark:border-gray-800 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto hidden md:block bg-white dark:bg-gray-950">
      <nav className="p-4 space-y-6">
        {/* Back to home */}
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Docs navigation */}
        {docsNavItems.map((item) => (
          <div key={item.href}>
            <Link
              href={item.href}
              className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                pathname === item.href
                  ? 'text-gray-900 dark:text-gray-100 font-medium bg-gray-100 dark:bg-gray-800'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              {item.title}
            </Link>
            {pathname === item.href && item.sections && (
              <div className="mt-2 ml-3 space-y-1 border-l border-gray-200 dark:border-gray-700">
                {item.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="block w-full text-left px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Quick links */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="px-3 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            Quick Links
          </div>
          <div className="mt-1 space-y-1">
            <Link
              href="/components"
              className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 rounded-lg transition-colors"
            >
              Components
            </Link>
            <a
              href="/sse"
              className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 rounded-lg transition-colors"
            >
              MCP Server
            </a>
          </div>
        </div>
      </nav>
    </aside>
  );
}
