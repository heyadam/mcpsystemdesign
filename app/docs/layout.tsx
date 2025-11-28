'use client';

import { useState } from 'react';
import { DocsHeader } from '@/components/docs/DocsHeader';
import { Sidebar } from '@/components/docs/Sidebar';
import { MobileDrawer } from '@/components/docs/MobileDrawer';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface">
      <DocsHeader onMenuClick={() => setMobileMenuOpen(true)} />
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
