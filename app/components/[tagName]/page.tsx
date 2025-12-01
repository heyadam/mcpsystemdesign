import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getAllWebComponents,
  getWebComponentByTag,
} from '@/lib/design-system';
import { CodeBlock } from '@/components/code/CodeBlock';
import { SectionTabs } from '@/components/component-page/SectionTabs';
import { WebComponentPreview } from '@/components/component-page/WebComponentPreview';
import {
  PropsTable,
  SlotsTable,
  EventsTable,
  CssPartsTable,
  CssPropsTable,
} from '@/components/component-page/WebComponentTables';

// Generate static params for all web components
export async function generateStaticParams() {
  const components = getAllWebComponents();
  return components.map((component) => ({
    tagName: component.tagName,
  }));
}

// Generate metadata
export async function generateMetadata({ params }: { params: { tagName: string } }) {
  const component = getWebComponentByTag(params.tagName);
  if (!component) return { title: 'Not Found' };

  return {
    title: `${component.name} - mcpsystem.design`,
    description: component.description,
  };
}

const webComponentSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'api', label: 'API' },
  { id: 'examples', label: 'Examples' },
];

export default function WebComponentPage({ params }: { params: { tagName: string } }) {
  const component = getWebComponentByTag(params.tagName);

  if (!component) {
    notFound();
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link href="/components" className="text-muted hover:text-default transition-colors">
          Components
        </Link>
        <span className="text-subtle">/</span>
        <span className="text-default font-medium">{component.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-default">{component.name}</h1>
        <code className="text-sm text-muted font-mono mt-1 block">
          &lt;{component.tagName}&gt;
        </code>
        <p className="mt-3 text-muted text-lg">{component.description}</p>
        <div className="mt-4 flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-surface-hover text-default">
            {component.category}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary text-primary-foreground">
            Web Component
          </span>
        </div>
      </div>

      {/* Section Tabs */}
      <SectionTabs sections={webComponentSections} />

      {/* Overview Section */}
      <section id="overview" className="mt-8 scroll-mt-24">
        <h2 className="text-xl font-semibold text-default mb-4">Overview</h2>
        <p className="text-muted mb-6">{component.description}</p>

        {/* Primary Example Preview */}
        {component.examples.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-default mb-4">Preview</h3>
            <WebComponentPreview code={component.examples[0].code} />
          </div>
        )}

        {/* Usage */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-default mb-2">Import</h3>
          <CodeBlock
            code={`import '@mcpsystem/ui';

// Or import specific component
import '@mcpsystem/ui/components/${component.tagName.replace('mcp-', '')}';`}
            language="javascript"
          />
        </div>

        {/* Basic Usage */}
        {component.examples.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-default mb-2">Basic Usage</h3>
            <CodeBlock code={component.examples[0].code} language="html" />
          </div>
        )}
      </section>

      {/* API Section */}
      <section id="api" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-semibold text-default mb-6">API Reference</h2>

        {/* Properties */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-default mb-4 flex items-center gap-2">
            Properties
            <span className="text-xs font-normal text-muted">({component.props.length})</span>
          </h3>
          <div className="border border-default rounded-xl overflow-hidden">
            <PropsTable props={component.props} />
          </div>
        </div>

        {/* Slots */}
        {component.slots.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-default mb-4 flex items-center gap-2">
              Slots
              <span className="text-xs font-normal text-muted">({component.slots.length})</span>
            </h3>
            <div className="border border-default rounded-xl overflow-hidden">
              <SlotsTable slots={component.slots} />
            </div>
          </div>
        )}

        {/* Events */}
        {component.events.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-default mb-4 flex items-center gap-2">
              Events
              <span className="text-xs font-normal text-muted">({component.events.length})</span>
            </h3>
            <div className="border border-default rounded-xl overflow-hidden">
              <EventsTable events={component.events} />
            </div>
          </div>
        )}

        {/* CSS Parts */}
        {component.cssParts.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-default mb-4 flex items-center gap-2">
              CSS Parts
              <span className="text-xs font-normal text-muted">({component.cssParts.length})</span>
            </h3>
            <p className="text-sm text-muted mb-4">
              Style internal elements using <code className="px-1 py-0.5 bg-surface-hover rounded text-xs">::part()</code> selector.
            </p>
            <div className="border border-default rounded-xl overflow-hidden">
              <CssPartsTable parts={component.cssParts} />
            </div>
          </div>
        )}

        {/* CSS Custom Properties */}
        {component.cssProps.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-default mb-4 flex items-center gap-2">
              CSS Custom Properties
              <span className="text-xs font-normal text-muted">({component.cssProps.length})</span>
            </h3>
            <p className="text-sm text-muted mb-4">
              Customize appearance by setting these CSS variables.
            </p>
            <div className="border border-default rounded-xl overflow-hidden">
              <CssPropsTable props={component.cssProps} />
            </div>
          </div>
        )}
      </section>

      {/* Examples Section */}
      <section id="examples" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-semibold text-default mb-4">Examples</h2>

        <div className="space-y-8">
          {component.examples.map((example, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold text-default mb-4">{example.title}</h3>
              <WebComponentPreview code={example.code} className="mb-4" />
              <CodeBlock code={example.code} language="html" />
            </div>
          ))}
        </div>
      </section>

      {/* Related Components */}
      <section className="mt-12 pt-8 border-t border-default">
        <h2 className="text-sm font-semibold text-default mb-4">More Components</h2>
        <div className="flex flex-wrap gap-2">
          {getAllWebComponents()
            .filter(c => c.tagName !== component.tagName)
            .map((related) => (
              <Link
                key={related.tagName}
                href={`/components/${related.tagName}`}
                className="px-3 py-2 text-sm bg-surface-hover text-default rounded-lg hover:bg-surface-sunken transition-colors"
              >
                {related.name}
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
