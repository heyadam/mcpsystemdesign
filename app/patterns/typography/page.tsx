import { styleGuide } from '@/lib/design-system';
import { CodeBlock } from '@/components/code/CodeBlock';

export const metadata = {
  title: 'Typography - mcpsystem.design',
  description: 'Typography styles and text hierarchy for mcpsystem.design.',
};

export default function TypographyPage() {
  return (
    <div className="p-6 md:p-10 max-w-4xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Typography</h1>
        <p className="mt-3 text-gray-500 dark:text-gray-400">
          {styleGuide.typography.length} typography styles using Inter for UI and JetBrains Mono for code.
        </p>
      </div>

      {/* Font Families */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Font Families</h2>
        <div className="space-y-4">
          <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Sans Serif</p>
            <p className="text-2xl text-gray-900 dark:text-gray-100 mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Inter
            </p>
            <CodeBlock code="font-family: Inter, system-ui, sans-serif;" language="css" />
          </div>
          <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Monospace</p>
            <p className="text-2xl text-gray-900 dark:text-gray-100 mb-2" style={{ fontFamily: 'JetBrains Mono, Menlo, monospace' }}>
              JetBrains Mono
            </p>
            <CodeBlock code="font-family: JetBrains Mono, Menlo, monospace;" language="css" />
          </div>
        </div>
      </section>

      {/* Typography Styles */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Typography Styles</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Hierarchy of text styles for consistent typography across the design system.
        </p>
        <div className="space-y-6">
          {styleGuide.typography.map((style) => (
            <div
              key={style.name}
              className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{style.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{style.usage}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {style.fontSize} / {style.lineHeight} / {style.fontWeight}
                  </p>
                  {style.letterSpacing && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Tracking: {style.letterSpacing}
                    </p>
                  )}
                </div>
              </div>
              <p
                className="text-gray-900 dark:text-gray-100 mb-4"
                style={{
                  fontFamily: style.fontFamily,
                  fontSize: style.fontSize,
                  fontWeight: style.fontWeight,
                  lineHeight: style.lineHeight,
                  letterSpacing: style.letterSpacing || 'normal',
                }}
              >
                The quick brown fox jumps over the lazy dog
              </p>
              <CodeBlock
                code={`font-family: ${style.fontFamily};
font-size: ${style.fontSize};
font-weight: ${style.fontWeight};
line-height: ${style.lineHeight};${style.letterSpacing ? `\nletter-spacing: ${style.letterSpacing};` : ''}`}
                language="css"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Font Weights */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Font Weights</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { name: 'Regular', weight: '400', class: 'font-normal' },
            { name: 'Medium', weight: '500', class: 'font-medium' },
            { name: 'Semibold', weight: '600', class: 'font-semibold' },
            { name: 'Bold', weight: '700', class: 'font-bold' },
          ].map((weight) => (
            <div
              key={weight.weight}
              className="p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {weight.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{weight.weight}</span>
              </div>
              <p className={`text-lg text-gray-900 dark:text-gray-100 mb-2 ${weight.class}`}>
                The quick brown fox jumps over the lazy dog
              </p>
              <CodeBlock code={`${weight.class} /* ${weight.weight} */`} language="css" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
