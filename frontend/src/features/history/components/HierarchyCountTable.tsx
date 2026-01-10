import React, { useState } from 'react';
import clsx from 'clsx';
import type { Status } from '@/features/status/types';

export type OrgNode = {
  id: string;
  name: string;
  counts: Record<string, number>;
  children?: OrgNode[];
};

interface HierarchyCountTableProps {
  data: OrgNode[];
  statuses: Status[];
}

export const HierarchyCountTable: React.FC<HierarchyCountTableProps> = ({ data, statuses }) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    const next = new Set(expandedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setExpandedIds(next);
  };

  const getIndentClass = (depth: number) => {
    switch (depth) {
      case 0:
        return 'pl-3';
      case 1:
        return 'pl-6';
      case 2:
        return 'pl-9';
      default:
        return 'pl-12';
    }
  };

  const renderRow = (node: OrgNode, depth: number = 0) => {
    const isExpanded = expandedIds.has(node.id);
    const hasChildren = node.children && node.children.length > 0;

    // 背景色を不透明な色に変更（透過 /50 を削除）
    const rowBgClass = depth === 0 ? 'bg-slate-100' : 'bg-white';

    const total = Object.values(node.counts).reduce((acc, val) => acc + val, 0);

    return (
      <React.Fragment key={node.id}>
        <div
          className={clsx(
            'grid items-center border-b border-gray-100 py-1.5 transition-colors hover:bg-indigo-50',
            rowBgClass,
            depth === 0 && 'font-semibold',
          )}
          style={{
            gridTemplateColumns: `160px repeat(${statuses.length + 1}, 48px) 1fr`,
            minWidth: `${160 + (statuses.length + 1) * 48 + 50}px`,
          }}
        >
          {/* 組織名カラム - 左端に固定 */}
          <div
            className={clsx(
              'flex items-center gap-1 cursor-pointer select-none sticky left-0 z-20 pr-2 h-full',
              rowBgClass, // 不透明な背景色
              getIndentClass(depth),
            )}
            onClick={() => hasChildren && toggle(node.id)}
          >
            {hasChildren && (
              <span className="text-indigo-500 text-[10px] w-3 flex-shrink-0">
                {isExpanded ? '▼' : '▶'}
              </span>
            )}
            {!hasChildren && <span className="w-3 flex-shrink-0" />}
            <span
              className={clsx(
                'truncate text-[13px]',
                depth === 0 ? 'text-indigo-900' : 'text-gray-700',
              )}
            >
              {node.name}
            </span>
          </div>

          {/* 各ステータスの数値 */}
          {statuses.map((status) => (
            <div
              key={status.statusId}
              className="text-center text-[13px] text-gray-600 border-l border-gray-50 flex items-center justify-center h-full"
              title={`${node.name} - ${status.statusName}`}
            >
              {node.counts[status.statusId] || 0}
            </div>
          ))}

          {/* 合計カラム */}
          <div
            className="text-center text-[13px] font-bold text-indigo-600 border-l border-indigo-100 bg-indigo-50/20 h-full flex items-center justify-center"
            title={`${node.name} - 合計`}
          >
            {total}
          </div>

          {/* 右側の余白埋め */}
          <div className="border-l border-gray-50 h-full" />
        </div>

        {/* 子ノードの再帰描画 */}
        {isExpanded && hasChildren && node.children!.map((child) => renderRow(child, depth + 1))}
      </React.Fragment>
    );
  };

  return (
    <div className="border border-indigo-200 rounded-lg overflow-x-auto shadow-sm bg-white">
      <div className="min-w-fit">
        {/* ヘッダー */}
        <div
          className="grid bg-indigo-600 text-white font-bold py-2.5 sticky top-0 z-30"
          style={{
            gridTemplateColumns: `160px repeat(${statuses.length + 1}, 48px) 1fr`,
            minWidth: `${160 + (statuses.length + 1) * 48 + 50}px`,
          }}
        >
          <div className="sticky left-0 bg-indigo-600 z-10 pl-3 flex items-center text-[13px]">
            組織
          </div>
          {statuses.map((status) => (
            <div
              key={status.statusId}
              className="text-center text-[10px] leading-tight flex items-center justify-center px-0.5 border-l border-indigo-500/50"
            >
              {status.statusName}
            </div>
          ))}
          <div className="text-center text-[10px] border-l border-indigo-500/50 flex items-center justify-center px-0.5">
            合計
          </div>
          <div className="border-l border-indigo-500/50" />
        </div>

        {/* データ本体 */}
        <div>
          {data.length > 0 ? (
            data.map((node) => renderRow(node))
          ) : (
            <div className="py-8 text-center text-gray-500 text-sm">データがありません</div>
          )}
        </div>
      </div>
    </div>
  );
};
