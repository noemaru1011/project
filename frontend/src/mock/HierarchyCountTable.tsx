import { useState } from 'react';
import type { OrgNode } from './types';
import clsx from 'clsx';

type Props = {
  data: OrgNode[];
};

export const HierarchyCountTable = ({ data }: Props) => {
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

    const total = node.counts.rest + node.counts.trip + node.counts.annual + node.counts.other;

    return (
      <div key={node.id}>
        <div
          className={clsx(
            'grid grid-cols-[300px_repeat(5,1fr)] items-center border-b py-2',
            depth === 0 && 'bg-gray-50 font-semibold',
          )}
        >
          <div
            className="flex items-center gap-2 cursor-pointer"
            style={{ paddingLeft: depth * 16 }}
            onClick={() => hasChildren && toggle(node.id)}
          >
            {hasChildren && <span>{isOpen ? '▼' : '▶'}</span>}
            <span>{node.name}</span>
          </div>
          <div className="text-center">{node.counts.rest}</div>
          <div className="text-center">{node.counts.trip}</div>
          <div className="text-center">{node.counts.annual}</div>
          <div className="text-center">{node.counts.other}</div>
          <div className="text-center font-semibold">{total}</div>
        </div>

        {isOpen && node.children?.map((child) => renderRow(child, depth + 1))}
      </div>
    );
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="grid grid-cols-[300px_repeat(5,1fr)] bg-indigo-600 text-white font-semibold py-2">
        <div className="px-4">組織</div>
        <div className="text-center">休務</div>
        <div className="text-center">出張</div>
        <div className="text-center">年休</div>
        <div className="text-center">その他</div>
        <div className="text-center">合計</div>
      </div>

      {data.map((node) => renderRow(node))}
    </div>
  );
};
