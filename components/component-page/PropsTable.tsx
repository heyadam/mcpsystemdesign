import type { ComponentProp } from '@/lib/design-system/types';

interface PropsTableProps {
  props: ComponentProp[];
}

export function PropsTable({ props }: PropsTableProps) {
  if (props.length === 0) {
    return <p className="text-sm text-muted">No props defined for this component.</p>;
  }

  return (
    <div className="border border-default rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-surface-sunken border-b border-default">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
              Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
              Type
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider hidden sm:table-cell">
              Default
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider hidden md:table-cell">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-default">
          {props.map((prop) => (
            <tr key={prop.name} className="hover:bg-surface-hover">
              <td className="px-4 py-3">
                <code className="text-sm font-mono text-default">{prop.name}</code>
                {prop.required && (
                  <span className="ml-1 text-error-emphasis text-xs">*</span>
                )}
              </td>
              <td className="px-4 py-3">
                <code className="text-sm font-mono text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-1.5 py-0.5 rounded">
                  {prop.type}
                </code>
              </td>
              <td className="px-4 py-3 hidden sm:table-cell">
                {prop.default ? (
                  <code className="text-sm font-mono text-muted">{prop.default}</code>
                ) : (
                  <span className="text-subtle text-sm">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-sm text-muted hidden md:table-cell">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
