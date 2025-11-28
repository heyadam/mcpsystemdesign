import Link from 'next/link';
import { getNavigationItems, getDesignSystemStats } from '@/lib/design-system';

export const metadata = {
  title: 'Components - mcpsystem.design',
  description: 'Browse all components in mcpsystem.design.',
};

export default function ComponentsPage() {
  const navItems = getNavigationItems();
  const stats = getDesignSystemStats();

  return (
    <div className="p-6 md:p-10 max-w-4xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-default">Components</h1>
        <p className="mt-3 text-muted">
          {stats.totalComponents} components across {stats.totalCategories} categories.
          Built with Tailwind CSS for consistency and flexibility.
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-12">
        {navItems.map(({ category, components }) => (
          <section key={category.slug}>
            <h2 className="text-xl font-semibold text-default mb-2">
              {category.name}
            </h2>
            <p className="text-sm text-muted mb-6">
              {category.description}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {components.map((component) => (
                <Link
                  key={component.slug}
                  href={`/components/${component.slug}`}
                  className="group p-5 bg-surface-raised border border-default rounded-xl hover:border-emphasis hover:shadow-md dark:hover:shadow-black/50 transition-all"
                >
                  <h3 className="font-medium text-default group-hover:text-primary">
                    {component.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted line-clamp-2">
                    {component.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
