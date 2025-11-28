'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/docs/Sidebar';
import { MobileDrawer } from '@/components/docs/MobileDrawer';
import { DocsHeader } from '@/components/docs/DocsHeader';

export default function ColorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <DocsHeader onMenuClick={() => setIsMobileMenuOpen(true)} />
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <div className="pt-16 flex">
        <Sidebar />
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
