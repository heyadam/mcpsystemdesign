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
                <div key={color.name}>
                  {color.darkValue ? (
                    // Semantic color with light/dark variants
                    <div className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-medium text-gray-900 dark:text-gray-100">
                              {color.name}
                            </h3>
                            {color.role === 'background' && (
                              <code className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded">
                                bg-{color.name}
                              </code>
                            )}
                            {color.role === 'foreground' && (
                              <code className="text-xs font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">
                                text-{color.name}
                              </code>
                            )}
                            {color.role === 'border' && (
                              <code className="text-xs font-mono text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-0.5 rounded">
                                border-{color.name}
                              </code>
                            )}
                            {color.role === 'emphasis' && (
                              <>
                                <code className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded">
                                  bg-{color.name}
                                </code>
                                <code className="text-xs font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">
                                  text-{color.name}
                                </code>
                              </>
                            )}
                            {color.cssVar && (
                              <code className="text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                                {color.cssVar}
                              </code>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {color.usage}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {/* Light mode variant */}
                        <button
                          type="button"
                          onClick={() => copyToClipboard(color.value, `${color.name}-light`)}
                          className="group flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div
                            className="w-12 h-12 rounded-md border border-gray-300 dark:border-gray-600 flex-shrink-0"
                            style={{ backgroundColor: color.value }}
                          />
                          <div className="flex-1 text-left min-w-0">
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Light mode</p>
                            <code className="text-xs font-mono text-gray-900 dark:text-gray-100 block truncate">
                              {color.value}
                            </code>
                            {copiedColor === `${color.name}-light` && (
                              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                                Copied!
                              </span>
                            )}
                          </div>
                        </button>

                        {/* Dark mode variant */}
                        <button
                          type="button"
                          onClick={() => copyToClipboard(color.darkValue!, `${color.name}-dark`)}
                          className="group flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div
                            className="w-12 h-12 rounded-md border border-gray-300 dark:border-gray-600 flex-shrink-0"
                            style={{ backgroundColor: color.darkValue! }}
                          />
                          <div className="flex-1 text-left min-w-0">
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Dark mode</p>
                            <code className="text-xs font-mono text-gray-900 dark:text-gray-100 block truncate">
                              {color.darkValue!}
                            </code>
                            {copiedColor === `${color.name}-dark` && (
                              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                                Copied!
                              </span>
                            )}
                          </div>
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Regular color (no dark variant)
                    <button
                      type="button"
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
                  )}
                </div>
              ))}
            </div>

            {/* Code Example */}
            <div className="mt-6 p-5 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Using {category.name} Colors
              </h3>
              {category.colors[0].cssVar ? (
                <CodeBlock
                  code={`<!-- Tailwind CSS (Recommended) -->
${category.colors.filter(c => c.role === 'background').slice(0, 2).map(c => `<div class="bg-${c.name}">...</div>`).join('\n')}
${category.colors.filter(c => c.role === 'foreground').slice(0, 2).map(c => `<p class="text-${c.name}">...</p>`).join('\n')}
${category.colors.filter(c => c.role === 'border').slice(0, 1).map(c => `<div class="border border-${c.name}">...</div>`).join('\n')}

/* CSS Custom Properties */
.element {
  background-color: var(${category.colors[0].cssVar});
}

/* Colors automatically adapt to light/dark mode */`}
                  language="html"
                />
              ) : (
                <CodeBlock
                  code={`<!-- Tailwind CSS -->
<div class="bg-${category.colors[0].name}">${category.name} background</div>
<p class="text-${category.colors[0].name}">${category.name} text</p>

/* CSS */
.element {
  background-color: ${category.colors[0].value};
}`}
                  language="html"
                />
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Usage Guidelines */}
      <section className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          Tailwind Class Reference
        </h2>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• <strong>Backgrounds:</strong> <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">bg-surface</code>, <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">bg-surface-raised</code>, <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">bg-primary</code>, <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">bg-success</code>, etc.</li>
          <li>• <strong>Text:</strong> <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">text-default</code>, <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">text-muted</code>, <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">text-subtle</code>, <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">text-primary-foreground</code></li>
          <li>• <strong>Borders:</strong> <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">border-default</code>, <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">border-muted</code>, <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">border-emphasis</code></li>
          <li>• <strong>States:</strong> <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">bg-success</code> / <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">text-success-foreground</code>, <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">bg-error</code> / <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">text-error-foreground</code></li>
          <li>• All semantic tokens automatically adapt to light/dark mode</li>
          <li>• Maintain sufficient contrast ratios (WCAG AA minimum: 4.5:1 for text)</li>
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
