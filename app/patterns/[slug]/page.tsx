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
import { ClassVariationsTable } from '@/components/component-page/ClassVariationsTable';

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
    <div className="p-6 md:p-10 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link href="/patterns" className="text-muted hover:text-default transition-colors">
          Patterns
        </Link>
        <span className="text-subtle">/</span>
        <span className="text-muted">{component.category}</span>
        <span className="text-subtle">/</span>
        <span className="text-default font-medium">{component.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-default">{component.name}</h1>
        <p className="mt-3 text-muted text-lg">{component.description}</p>
        <div className="mt-4 flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-surface-hover text-default">
            {component.category}
          </span>
          {component.tailwind && (
            <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-info text-info-foreground">
              Tailwind CSS
            </span>
          )}
        </div>
      </div>

      {/* Section Tabs */}
      <SectionTabs />

      {/* Overview Section */}
      <section id="overview" className="mt-8 scroll-mt-24">
        <h2 className="text-xl font-semibold text-default mb-4">Overview</h2>

        {component.overview ? (
          <div className="space-y-6">
            <p className="text-muted">{component.overview.introduction}</p>

            {component.overview.whenToUse && component.overview.whenToUse.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-default mb-2">When to use</h3>
                <ul className="list-disc list-inside space-y-1 text-muted">
                  {component.overview.whenToUse.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p className="text-muted">{component.description}</p>
        )}

        {/* Primary Example */}
        {component.examples.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-default mb-4">Preview</h3>
            <LivePreview code={component.examples[0].code} />
          </div>
        )}

        {/* Usage Note */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-default mb-2">Usage</h3>
          <CodeBlock code={component.usageNote} language="html" />
        </div>
      </section>

      {/* Specs Section */}
      <section id="specs" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-semibold text-default mb-4">Class Variations</h2>
        <ClassVariationsTable specs={component.specs} />
      </section>

      {/* Guidelines Section */}
      <section id="guidelines" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-semibold text-default mb-4">Guidelines</h2>

        {component.guidelines ? (
          <div className="space-y-8">
            {/* Do's and Don'ts */}
            <div className="grid md:grid-cols-2 gap-6">
              {component.guidelines.dos && component.guidelines.dos.length > 0 && (
                <div className="p-5 bg-success rounded-xl border border-success-border">
                  <h3 className="text-sm font-semibold text-success-foreground mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Do
                  </h3>
                  <ul className="space-y-2 text-sm text-success-foreground">
                    {component.guidelines.dos.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {component.guidelines.donts && component.guidelines.donts.length > 0 && (
                <div className="p-5 bg-error rounded-xl border border-error-border">
                  <h3 className="text-sm font-semibold text-error-foreground mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Don't
                  </h3>
                  <ul className="space-y-2 text-sm text-error-foreground">
                    {component.guidelines.donts.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Accessibility */}
            {component.guidelines.accessibility && component.guidelines.accessibility.length > 0 && (
              <div className="p-5 bg-info rounded-xl border border-info-border">
                <h3 className="text-sm font-semibold text-info-foreground mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Accessibility
                </h3>
                <ul className="space-y-2 text-sm text-info-foreground">
                  {component.guidelines.accessibility.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p className="text-muted">No specific guidelines documented for this component yet.</p>
        )}
      </section>

      {/* Examples Section */}
      <section id="examples" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-semibold text-default mb-4">Examples</h2>

        <div className="space-y-8">
          {component.examples.map((example, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold text-default mb-2">{example.title}</h3>
              {example.description && (
                <p className="text-sm text-muted mb-4">{example.description}</p>
              )}
              <LivePreview code={example.code} />
            </div>
          ))}
        </div>
      </section>

      {/* Related Patterns */}
      {relatedComponents.length > 0 && (
        <section className="mt-12 pt-8 border-t border-default">
          <h2 className="text-sm font-semibold text-default mb-4">Related Patterns</h2>
          <div className="flex flex-wrap gap-2">
            {relatedComponents.map((related) => (
              <Link
                key={related.slug}
                href={`/patterns/${related.slug}`}
                className="px-3 py-2 text-sm bg-surface-hover text-default rounded-lg hover:bg-surface-sunken transition-colors"
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
