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
    <div className="p-6 md:p-10 max-w-5xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Components</h1>
        <p className="mt-3 text-gray-500 dark:text-gray-400">
          {stats.totalComponents} components across {stats.totalCategories} categories.
          Built with Tailwind CSS for consistency and flexibility.
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-12">
        {navItems.map(({ category, components }) => (
          <section key={category.slug}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {category.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              {category.description}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {components.map((component) => (
                <Link
                  key={component.slug}
                  href={`/components/${component.slug}`}
                  className="group p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md dark:hover:shadow-gray-900/50 transition-all"
                >
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white">
                    {component.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
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
