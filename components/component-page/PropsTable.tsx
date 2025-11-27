import type { ComponentProp } from '@/lib/design-system/types';

interface PropsTableProps {
  props: ComponentProp[];
}

export function PropsTable({ props }: PropsTableProps) {
  if (props.length === 0) {
    return <p className="text-sm text-gray-500 dark:text-gray-400">No props defined for this component.</p>;
  }

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Type
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
              Default
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          {props.map((prop) => (
            <tr key={prop.name} className="hover:bg-gray-50 dark:hover:bg-gray-900">
              <td className="px-4 py-3">
                <code className="text-sm font-mono text-gray-900 dark:text-gray-100">{prop.name}</code>
                {prop.required && (
                  <span className="ml-1 text-red-500 text-xs">*</span>
                )}
              </td>
              <td className="px-4 py-3">
                <code className="text-sm font-mono text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-1.5 py-0.5 rounded">
                  {prop.type}
                </code>
              </td>
              <td className="px-4 py-3 hidden sm:table-cell">
                {prop.default ? (
                  <code className="text-sm font-mono text-gray-600 dark:text-gray-400">{prop.default}</code>
                ) : (
                  <span className="text-gray-400 dark:text-gray-500 text-sm">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hidden md:table-cell">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
