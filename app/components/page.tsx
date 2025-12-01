import Link from 'next/link';
import { getAllWebComponents } from '@/lib/design-system';

export const metadata = {
  title: 'Components - mcpsystem.design',
  description: 'Browse all @mcpsystem/ui Web Components for AI chat interfaces.',
};

export default function ComponentsPage() {
  const components = getAllWebComponents();

  return (
    <div className="p-6 md:p-10 max-w-4xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-default">Web Components</h1>
        <p className="mt-3 text-muted">
          {components.length} components for building AI chat interfaces.
          Import from <code className="px-1.5 py-0.5 bg-surface-hover rounded text-sm font-mono">@mcpsystem/ui</code> and use as custom HTML elements.
        </p>
      </div>

      {/* Installation */}
      <div className="mb-10 p-5 bg-surface-raised border border-default rounded-xl">
        <h2 className="text-sm font-semibold text-default mb-3">Installation</h2>
        <pre className="bg-surface-sunken rounded-lg p-4 overflow-x-auto">
          <code className="text-sm font-mono text-default">npm install @mcpsystem/ui</code>
        </pre>
        <p className="mt-3 text-sm text-muted">
          Then import and use components directly in HTML or any framework.
        </p>
      </div>

      {/* Components Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {components.map((component) => (
          <Link
            key={component.tagName}
            href={`/components/${component.tagName}`}
            className="group p-5 bg-surface-raised border border-default rounded-xl hover:border-emphasis hover:shadow-md dark:hover:shadow-black/50 transition-all"
          >
            <h3 className="font-medium text-default group-hover:text-primary">
              {component.name}
            </h3>
            <code className="text-xs text-muted font-mono">
              &lt;{component.tagName}&gt;
            </code>
            <p className="mt-2 text-sm text-muted line-clamp-2">
              {component.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Features */}
      <div className="mt-12 grid sm:grid-cols-3 gap-6">
        <div className="p-5 bg-surface-raised border border-default rounded-xl">
          <h3 className="font-medium text-default mb-2">Framework Agnostic</h3>
          <p className="text-sm text-muted">
            Works with React, Vue, Svelte, or plain HTML. Built with Lit for native Web Component support.
          </p>
        </div>
        <div className="p-5 bg-surface-raised border border-default rounded-xl">
          <h3 className="font-medium text-default mb-2">Themeable</h3>
          <p className="text-sm text-muted">
            Customize with CSS custom properties. Automatic dark mode support with prefers-color-scheme.
          </p>
        </div>
        <div className="p-5 bg-surface-raised border border-default rounded-xl">
          <h3 className="font-medium text-default mb-2">Accessible</h3>
          <p className="text-sm text-muted">
            ARIA labels, keyboard navigation, and screen reader support built-in.
          </p>
        </div>
      </div>
    </div>
  );
}
