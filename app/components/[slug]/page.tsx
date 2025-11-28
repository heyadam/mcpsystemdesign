import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  components,
  getComponentBySlug,
  getRelatedComponents,
  getCategoryBySlug,
  categories
} from '@/lib/design-system';
import { CodeBlock } from '@/components/code/CodeBlock';
import { LivePreview } from '@/components/code/LivePreview';
import { SectionTabs } from '@/components/component-page/SectionTabs';
import { PropsTable } from '@/components/component-page/PropsTable';

// Generate static params for all components
export async function generateStaticParams() {
  return components.map((component) => ({
    slug: component.slug,
  }));
}

// Generate metadata
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const component = getComponentBySlug(params.slug);
  if (!component) return { title: 'Not Found' };

  return {
    title: `${component.name} - mcpsystem.design`,
    description: component.description,
  };
}

export default function ComponentPage({ params }: { params: { slug: string } }) {
  const component = getComponentBySlug(params.slug);

  if (!component) {
    notFound();
  }

  const relatedComponents = getRelatedComponents(component);
  const category = categories.find(c => c.name === component.category);

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link href="/components" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          Components
        </Link>
        <span className="text-gray-300 dark:text-gray-600">/</span>
        <span className="text-gray-500 dark:text-gray-400">{component.category}</span>
        <span className="text-gray-300 dark:text-gray-600">/</span>
        <span className="text-gray-900 dark:text-gray-100 font-medium">{component.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">{component.name}</h1>
        <p className="mt-3 text-gray-500 dark:text-gray-400 text-lg">{component.description}</p>
        <div className="mt-4 flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            {component.category}
          </span>
          {component.tailwind && (
            <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
              Tailwind CSS
            </span>
          )}
        </div>
      </div>

      {/* Section Tabs */}
      <SectionTabs />

      {/* Overview Section */}
      <section id="overview" className="mt-8 scroll-mt-24">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Overview</h2>

        {component.overview ? (
          <div className="space-y-6">
            <p className="text-gray-600 dark:text-gray-400">{component.overview.introduction}</p>

            {component.overview.whenToUse && component.overview.whenToUse.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">When to use</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  {component.overview.whenToUse.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">{component.description}</p>
        )}

        {/* Primary Example */}
        {component.examples.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Preview</h3>
            <LivePreview code={component.examples[0].code} />
          </div>
        )}

        {/* Import */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Import</h3>
          <CodeBlock code={component.importStatement} language="tsx" />
        </div>
      </section>

      {/* Specs Section */}
      <section id="specs" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Specifications</h2>

        {/* Props Table */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Props</h3>
          <PropsTable props={component.props} />
        </div>

        {/* Specs details */}
        {component.specs && (
          <div className="grid sm:grid-cols-3 gap-6">
            {component.specs.variants && component.specs.variants.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Variants</h3>
                <div className="flex flex-wrap gap-2">
                  {component.specs.variants.map((v) => (
                    <span key={v} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {component.specs.sizes && component.specs.sizes.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {component.specs.sizes.map((s) => (
                    <span key={s} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {component.specs.states && component.specs.states.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">States</h3>
                <div className="flex flex-wrap gap-2">
                  {component.specs.states.map((s) => (
                    <span key={s} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Guidelines Section */}
      <section id="guidelines" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Guidelines</h2>

        {component.guidelines ? (
          <div className="space-y-8">
            {/* Do's and Don'ts */}
            <div className="grid md:grid-cols-2 gap-6">
              {component.guidelines.dos && component.guidelines.dos.length > 0 && (
                <div className="p-5 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  <h3 className="text-sm font-semibold text-emerald-800 dark:text-emerald-300 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Do
                  </h3>
                  <ul className="space-y-2 text-sm text-emerald-700 dark:text-emerald-400">
                    {component.guidelines.dos.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {component.guidelines.donts && component.guidelines.donts.length > 0 && (
                <div className="p-5 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                  <h3 className="text-sm font-semibold text-red-800 dark:text-red-300 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Don't
                  </h3>
                  <ul className="space-y-2 text-sm text-red-700 dark:text-red-400">
                    {component.guidelines.donts.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Accessibility */}
            {component.guidelines.accessibility && component.guidelines.accessibility.length > 0 && (
              <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Accessibility
                </h3>
                <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
                  {component.guidelines.accessibility.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No specific guidelines documented for this component yet.</p>
        )}
      </section>

      {/* Examples Section */}
      <section id="examples" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Examples</h2>

        <div className="space-y-8">
          {component.examples.map((example, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">{example.title}</h3>
              {example.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{example.description}</p>
              )}
              <LivePreview code={example.code} />
            </div>
          ))}
        </div>
      </section>

      {/* Related Components */}
      {relatedComponents.length > 0 && (
        <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Related Components</h2>
          <div className="flex flex-wrap gap-2">
            {relatedComponents.map((related) => (
              <Link
                key={related.slug}
                href={`/components/${related.slug}`}
                className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {related.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
