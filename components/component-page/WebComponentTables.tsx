import type {
  WebComponentProp,
  WebComponentSlot,
  WebComponentCssPart,
  WebComponentCssProp,
  WebComponentEvent,
} from '@/lib/design-system/web-components';

interface PropsTableProps {
  props: WebComponentProp[];
}

export function PropsTable({ props }: PropsTableProps) {
  if (props.length === 0) {
    return <p className="text-sm text-muted">This component has no properties.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-default">
            <th className="text-left py-3 px-4 font-medium text-default">Property</th>
            <th className="text-left py-3 px-4 font-medium text-default">Attribute</th>
            <th className="text-left py-3 px-4 font-medium text-default">Type</th>
            <th className="text-left py-3 px-4 font-medium text-default hidden md:table-cell">Default</th>
            <th className="text-left py-3 px-4 font-medium text-default hidden lg:table-cell">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-b border-default">
              <td className="py-3 px-4">
                <code className="text-xs font-mono text-primary">{prop.name}</code>
              </td>
              <td className="py-3 px-4">
                <code className="text-xs font-mono text-muted">
                  {prop.attribute || prop.name}
                </code>
              </td>
              <td className="py-3 px-4">
                <code className="text-xs font-mono text-muted">{prop.type}</code>
              </td>
              <td className="py-3 px-4 hidden md:table-cell">
                {prop.default ? (
                  <code className="text-xs font-mono text-muted">{prop.default}</code>
                ) : (
                  <span className="text-muted">-</span>
                )}
              </td>
              <td className="py-3 px-4 hidden lg:table-cell text-muted">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface SlotsTableProps {
  slots: WebComponentSlot[];
}

export function SlotsTable({ slots }: SlotsTableProps) {
  if (slots.length === 0) {
    return <p className="text-sm text-muted">This component has no slots.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-default">
            <th className="text-left py-3 px-4 font-medium text-default">Slot</th>
            <th className="text-left py-3 px-4 font-medium text-default">Description</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot) => (
            <tr key={slot.name} className="border-b border-default">
              <td className="py-3 px-4">
                <code className="text-xs font-mono text-primary">
                  {slot.name === 'default' ? '(default)' : slot.name}
                </code>
              </td>
              <td className="py-3 px-4 text-muted">{slot.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface EventsTableProps {
  events: WebComponentEvent[];
}

export function EventsTable({ events }: EventsTableProps) {
  if (events.length === 0) {
    return <p className="text-sm text-muted">This component does not emit any events.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-default">
            <th className="text-left py-3 px-4 font-medium text-default">Event</th>
            <th className="text-left py-3 px-4 font-medium text-default">Detail</th>
            <th className="text-left py-3 px-4 font-medium text-default hidden md:table-cell">Description</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.name} className="border-b border-default">
              <td className="py-3 px-4">
                <code className="text-xs font-mono text-primary">{event.name}</code>
              </td>
              <td className="py-3 px-4">
                {event.detail ? (
                  <code className="text-xs font-mono text-muted">{event.detail}</code>
                ) : (
                  <span className="text-muted">-</span>
                )}
              </td>
              <td className="py-3 px-4 hidden md:table-cell text-muted">
                {event.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface CssPartsTableProps {
  parts: WebComponentCssPart[];
}

export function CssPartsTable({ parts }: CssPartsTableProps) {
  if (parts.length === 0) {
    return <p className="text-sm text-muted">This component has no CSS parts.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-default">
            <th className="text-left py-3 px-4 font-medium text-default">Part</th>
            <th className="text-left py-3 px-4 font-medium text-default">Description</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((part) => (
            <tr key={part.name} className="border-b border-default">
              <td className="py-3 px-4">
                <code className="text-xs font-mono text-primary">::part({part.name})</code>
              </td>
              <td className="py-3 px-4 text-muted">{part.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface CssPropsTableProps {
  props: WebComponentCssProp[];
}

export function CssPropsTable({ props }: CssPropsTableProps) {
  if (props.length === 0) {
    return <p className="text-sm text-muted">This component has no CSS custom properties.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-default">
            <th className="text-left py-3 px-4 font-medium text-default">Property</th>
            <th className="text-left py-3 px-4 font-medium text-default hidden md:table-cell">Default</th>
            <th className="text-left py-3 px-4 font-medium text-default">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-b border-default">
              <td className="py-3 px-4">
                <code className="text-xs font-mono text-primary">{prop.name}</code>
              </td>
              <td className="py-3 px-4 hidden md:table-cell">
                {prop.default ? (
                  <code className="text-xs font-mono text-muted">{prop.default}</code>
                ) : (
                  <span className="text-muted">-</span>
                )}
              </td>
              <td className="py-3 px-4 text-muted">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
