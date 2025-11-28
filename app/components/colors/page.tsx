'use client';

import { useState } from 'react';
import { styleGuide } from '@/lib/design-system';
import { CodeBlock } from '@/components/code/CodeBlock';

export default function ColorsPage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = async (value: string, name: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedColor(name);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const totalColors = styleGuide.colors.reduce((acc, category) => acc + category.colors.length, 0);

  return (
    <div className="p-6 md:p-10 max-w-4xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Colors</h1>
        <p className="mt-3 text-gray-500 dark:text-gray-400">
          {totalColors} color tokens organized into {styleGuide.colors.length} categories.
        </p>
      </div>

      {/* Color Categories */}
      <div className="space-y-12">
        {styleGuide.colors.map((category) => (
          <section key={category.name}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {category.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              {category.description}
            </p>
            <div className="space-y-3">
              {category.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => copyToClipboard(color.value, color.name)}
                  className="w-full group"
                >
                  <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md dark:hover:shadow-gray-900/50 transition-all">
                    {/* Color Swatch */}
                    <div
                      className="w-16 h-16 rounded-lg border border-gray-200 dark:border-gray-700 flex-shrink-0"
                      style={{ backgroundColor: color.value }}
                    />

                    {/* Color Info */}
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">
                          {color.name}
                        </h3>
                        {copiedColor === color.name && (
                          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                            Copied!
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {color.usage}
                      </p>
                    </div>

                    {/* Color Value */}
                    <div className="text-right">
                      <code className="text-sm font-mono text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {color.value}
                      </code>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Click to copy
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Code Example */}
            <div className="mt-6 p-5 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Using {category.name} Colors
              </h3>
              <CodeBlock
                code={`<!-- Tailwind CSS -->
<div class="${category.colors[0].name.replace('-', '-')}">${category.name} background</div>
<p class="text-${category.colors[0].name.replace('-', '-')}">${category.name} text</p>

/* CSS Custom Properties */
.element {
  background-color: var(--${category.colors[0].name});
  color: ${category.colors[0].value};
}`}
                language="html"
              />
            </div>
          </section>
        ))}
      </div>

      {/* Usage Guidelines */}
      <section className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          Color Usage Guidelines
        </h2>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• Use gray scale for text hierarchy, backgrounds, and borders</li>
          <li>• Apply accent colors for interactive elements and semantic states</li>
          <li>• Maintain sufficient contrast ratios (WCAG AA minimum: 4.5:1 for text)</li>
          <li>• Consider dark mode when choosing color combinations</li>
          <li>• Use color consistently across similar UI patterns</li>
        </ul>
      </section>

      {/* Accessibility */}
      <section className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
        <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-3">
          Accessibility
        </h2>
        <ul className="space-y-2 text-sm text-emerald-800 dark:text-emerald-200">
          <li>• All color combinations meet WCAG 2.1 AA standards</li>
          <li>• Don't rely on color alone to convey information</li>
          <li>• Provide text labels alongside colored indicators</li>
          <li>• Test color combinations in both light and dark modes</li>
        </ul>
      </section>
    </div>
  );
}
