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
    if (isOpen) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-surface-overlay backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-72 bg-surface shadow-xl overflow-y-auto z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-default">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">M</span>
            </div>
            <span className="font-semibold text-default">mcpsystem.design</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-hover transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-6">
          {/* Components navigation */}
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
                          ? 'text-default font-medium bg-surface-hover'
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
      </div>
    </div>
  );
}
