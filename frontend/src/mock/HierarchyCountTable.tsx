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

    const total =
      node.counts.rest + node.counts.trip + node.counts.annual + node.counts.other;

    return (
      <div key={node.id}>
        <div
          className={clsx(
            'grid grid-cols-[300px_repeat(5,1fr)] items-center border-b py-2 px-4 transition-colors rounded-lg hover:bg-indigo-50',
            depth === 0 ? 'bg-indigo-100 font-semibold' : 'bg-white'
          )}
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

          <div className="text-center text-gray-700">{node.counts.rest}</div>
          <div className="text-center text-gray-700">{node.counts.trip}</div>
          <div className="text-center text-gray-700">{node.counts.annual}</div>
          <div className="text-center text-gray-700">{node.counts.other}</div>
          <div className="text-center font-semibold text-indigo-600">{total}</div>
        </div>

        {/* 子要素アニメーション */}
        <div
          className={clsx('overflow-hidden transition-all duration-300', !isOpen && 'max-h-0')}
        >
          {isOpen &&
            node.children?.map((child) => renderRow(child, depth + 1))}
        </div>
      </div>
    );
  };

  return (
    <div className="border rounded-xl shadow-lg overflow-hidden bg-white">
      {/* ヘッダー */}
      <div className="grid grid-cols-[300px_repeat(5,1fr)] bg-indigo-600 text-white font-bold py-3 px-4 sticky top-0 z-10">
        <div>組織</div>
        <div className="text-center">休務</div>
        <div className="text-center">出張</div>
        <div className="text-center">年休</div>
        <div className="text-center">その他</div>
        <div className="text-center">合計</div>
      </div>

      {/* データ行 */}
      <div>{data.map((node) => renderRow(node))}</div>
    </div>
  );
};
