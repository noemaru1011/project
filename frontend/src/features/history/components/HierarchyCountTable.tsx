import { useState } from 'react';
import clsx from 'clsx';
import type { Status } from '@/features/status/types';

export type OrgNode = {
  id: string;
  name: string;
  counts: Record<string, number>;
  children?: OrgNode[];
};

type Props = {
  data: OrgNode[];
  statuses: Status[];
};

export const HierarchyCountTable = ({ data, statuses }: Props) => {
  const [open, setOpen] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const renderRow = (node: OrgNode, depth = 0) => {
    const isOpen = open.has(node.id);
    const hasChildren = node.children && node.children.length > 0;

    const total = Object.values(node.counts).reduce((acc, val) => acc + val, 0);

    return (
      <div key={node.id}>
        <div
          className={clsx(
            'grid items-center border-b py-2 px-4 transition-colors rounded-lg hover:bg-indigo-50',
            depth === 0 ? 'bg-indigo-100 font-semibold' : 'bg-white',
          )}
          style={{ gridTemplateColumns: `300px repeat(${statuses.length + 1}, 1fr)` }}
        >
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            style={{ paddingLeft: depth * 20 }}
            onClick={() => hasChildren && toggle(node.id)}
          >
            {hasChildren && (
              <span className="text-indigo-500 transition-transform duration-200">
                {isOpen ? '▼' : '▶'}
              </span>
            )}
            <span className={clsx(depth === 0 && 'text-indigo-800')}>{node.name}</span>
          </div>

          {statuses.map((status) => (
            <div
              key={status.statusId}
              className="text-center text-gray-700"
              title={`${node.name} - ${status.statusName}`}
            >
              {node.counts[status.statusId] || 0}
            </div>
          ))}
          <div className="text-center font-semibold text-indigo-600" title={`${node.name} - 合計`}>
            {total}
          </div>
        </div>

        <div className={clsx('overflow-hidden transition-all duration-300', !isOpen && 'max-h-0')}>
          {isOpen && node.children?.map((child) => renderRow(child, depth + 1))}
        </div>
      </div>
    );
  };

  return (
    <div className="border rounded-xl shadow-lg overflow-hidden bg-white overflow-x-auto">
      <div style={{ minWidth: 800 + statuses.length * 80 }}>
        <div
          className="grid bg-indigo-600 text-white font-bold py-3 px-4 sticky top-0 z-10"
          style={{ gridTemplateColumns: `300px repeat(${statuses.length + 1}, 1fr)` }}
        >
          <div>組織</div>
          {statuses.map((status) => (
            <div key={status.statusId} className="text-center whitespace-nowrap px-2">
              {status.statusName}
            </div>
          ))}
          <div className="text-center">合計</div>
        </div>

        <div>{data.map((node) => renderRow(node))}</div>
      </div>
    </div>
  );
};
