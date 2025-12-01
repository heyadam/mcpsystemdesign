import { SectionLayout } from '@/components/docs/SectionLayout';

export default function PatternsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SectionLayout>{children}</SectionLayout>;
}
