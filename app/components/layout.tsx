import { SectionLayout } from '@/components/docs/SectionLayout';

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SectionLayout>{children}</SectionLayout>;
}
