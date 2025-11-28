'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getAllNavigation, NavSection } from '@/lib/design-system';

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

interface SidebarProps {
  onLinkClick?: () => void;
  isMobile?: boolean;
}

export function Sidebar({ onLinkClick, isMobile = false }: SidebarProps) {
  const pathname = usePathname();
  const navSections = useMemo(() => getAllNavigation(), []);

  // Both main sections (Docs and Components) expanded by default
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => {
    return new Set(navSections.map(s => s.id));
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  // Check if a path is active
  const isActivePath = (href: string) => pathname === href;

  // Check if section has active item
  const sectionHasActiveItem = (section: NavSection) => {
    if (section.items) {
      return section.items.some(item => pathname.startsWith(item.href));
    }
    if (section.categories) {
      return section.categories.some(cat =>
        cat.items.some(item => pathname.startsWith(item.href))
      );
    }
    return false;
  };

  return (
    <aside className={`${isMobile ? 'w-full' : 'w-64 shrink-0 border-r border-default h-[calc(100vh-64px)] sticky top-16 overflow-y-auto hidden md:block'} bg-surface`}>
      <nav className="p-4 space-y-2">
        {/* Home link (no accordion) */}
        <div className="mb-2">
          <Link
            href="/"
            onClick={onLinkClick}
            className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
              pathname === '/'
                ? 'text-default font-medium bg-surface-hover'
                : 'text-muted hover:bg-surface-hover hover:text-default'
            }`}
          >
            Home
          </Link>
        </div>

        {/* Accordion sections (skip home) */}
        {navSections.filter(s => s.id !== 'home').map((section) => {
          const isExpanded = expandedSections.has(section.id);
          const hasActiveItem = sectionHasActiveItem(section);

          return (
            <div key={section.id}>
              {/* Accordion header */}
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  hasActiveItem ? 'text-default' : 'text-subtle hover:text-muted'
                }`}
              >
                {section.title}
                <ChevronIcon expanded={isExpanded} />
              </button>

              {/* Collapsible content with smooth animation */}
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="mt-1 space-y-1">
                  {/* Direct items (for Docs section) */}
                  {section.items?.map((item) => {
                    const isActive = isActivePath(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onLinkClick}
                        className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                          isActive
                            ? 'text-default font-medium bg-surface-hover border-l-2 border-primary -ml-0.5 pl-[10px]'
                            : 'text-muted hover:bg-surface-hover hover:text-default'
                        }`}
                      >
                        {item.title}
                      </Link>
                    );
                  })}

                  {/* Nested categories (for Components section) */}
                  {section.categories?.map((category) => (
                    <div key={category.id} className="mt-3">
                      <div className="px-3 py-1 text-xs font-medium text-subtle">
                        {category.title}
                      </div>
                      <div className="mt-1 space-y-0.5">
                        {category.items.map((item) => {
                          const isActive = isActivePath(item.href);
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={onLinkClick}
                              className={`block px-3 py-1.5 text-sm rounded-lg transition-colors ${
                                isActive
                                  ? 'text-default font-medium bg-surface-hover border-l-2 border-primary -ml-0.5 pl-[10px]'
                                  : 'text-muted hover:bg-surface-hover hover:text-default'
                              }`}
                            >
                              {item.title}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
