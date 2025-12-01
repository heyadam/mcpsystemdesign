'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/docs/Sidebar';
import { MobileDrawer } from '@/components/docs/MobileDrawer';
import { DocsHeader } from '@/components/docs/DocsHeader';

interface SectionLayoutProps {
  children: React.ReactNode;
  /** Additional className for the main content area */
  mainClassName?: string;
  /** Additional className for the outer container */
  containerClassName?: string;
}

/**
 * Shared layout component for docs, patterns, and components sections.
 * Provides consistent header, sidebar, and mobile drawer navigation.
 */
export function SectionLayout({
  children,
  mainClassName = '',
  containerClassName = '',
}: SectionLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen ${containerClassName}`.trim()}>
      <DocsHeader onMenuClick={() => setIsMobileMenuOpen(true)} />
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <div className="pt-16 flex">
        <Sidebar />
        <main className={`flex-1 min-w-0 ${mainClassName}`.trim()}>
          {children}
        </main>
      </div>
    </div>
  );
}
