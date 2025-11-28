'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getNavigationItems } from '@/lib/design-system';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: 'components' | 'docs';
}

const docsNavItems = [
  {
    title: 'Getting Started',
    href: '/docs/getting-started',
  },
];

export function MobileDrawer({ isOpen, onClose, variant = 'components' }: MobileDrawerProps) {
  const pathname = usePathname();
  const navItems = getNavigationItems();

  // Close drawer on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-64 bg-surface shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-default">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-contrast font-bold text-sm">M</span>
            </div>
            <span className="font-semibold text-default">mcpsystem.design</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-sunken transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-6">
          {variant === 'docs' ? (
            <>
              {/* Docs navigation */}
              <div>
                <Link
                  href="/"
                  className="flex items-center gap-2 px-3 py-2 text-small text-muted hover:text-default transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Home
                </Link>
              </div>
              {docsNavItems.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className={pathname === item.href ? 'nav-link-active' : 'nav-link'}
                  >
                    {item.title}
                  </Link>
                </div>
              ))}
              <div className="pt-4 border-t border-default">
                <div className="sidebar-category">
                  Quick Links
                </div>
                <div className="mt-1 space-y-1">
                  <Link href="/components" className="nav-link">
                    Components
                  </Link>
                  <a href="/sse" className="nav-link">
                    MCP Server
                  </a>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Components navigation */}
              <div>
                <Link
                  href="/components"
                  className={pathname === '/components' ? 'nav-link-active' : 'nav-link'}
                >
                  All Components
                </Link>
              </div>

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
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
