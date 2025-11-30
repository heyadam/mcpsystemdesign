import type { ClassVariation, ComponentSpecs } from '@/lib/design-system/types';

interface ClassVariationsTableProps {
  specs?: ComponentSpecs;
}

function VariationTable({ title, variations }: { title: string; variations: ClassVariation[] }) {
  if (variations.length === 0) return null;

  return (
    <div className="mb-6">
      <h4 className="text-sm font-medium text-default mb-3">{title}</h4>
      <div className="border border-default rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface-sunken border-b border-default">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider w-32">
                Variation
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                Tailwind Classes
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-default">
            {variations.map((variation) => (
              <tr key={variation.name} className="hover:bg-surface-hover">
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-default">{variation.name}</span>
                </td>
                <td className="px-4 py-3">
                  <code className="text-xs font-mono text-muted bg-surface-sunken px-2 py-1 rounded break-all">
                    {variation.classes}
                  </code>
                  {variation.description && (
                    <p className="text-xs text-subtle mt-1">{variation.description}</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ClassVariationsTable({ specs }: ClassVariationsTableProps) {
  if (!specs) {
    return <p className="text-sm text-muted">No class variations documented for this pattern.</p>;
  }

  const hasVariants = specs.variants && specs.variants.length > 0;
  const hasSizes = specs.sizes && specs.sizes.length > 0;
  const hasStates = specs.states && specs.states.length > 0;

  if (!hasVariants && !hasSizes && !hasStates) {
    return <p className="text-sm text-muted">No class variations documented for this pattern.</p>;
  }

  return (
    <div>
      <p className="text-sm text-muted mb-4">
        Swap these Tailwind classes to change the pattern&apos;s appearance:
      </p>
      {hasVariants && <VariationTable title="Variants" variations={specs.variants!} />}
      {hasSizes && <VariationTable title="Sizes" variations={specs.sizes!} />}
      {hasStates && <VariationTable title="States" variations={specs.states!} />}
    </div>
  );
}
