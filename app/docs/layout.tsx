import { SectionLayout } from '@/components/docs/SectionLayout';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SectionLayout
      containerClassName="bg-surface"
      mainClassName="p-6 md:p-10"
    >
      {children}
    </SectionLayout>
  );
}
