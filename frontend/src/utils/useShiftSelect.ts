import { useEffect, useState } from 'react';

export const useShiftSelect = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [lastIndex, setLastIndex] = useState<number | null>(null);

  useEffect(() => {
    const table = document.querySelector('table');
    if (!table) return;
    console.log(table);
    const handleClick = (e: MouseEvent) => {
      const td = (e.target as HTMLElement).closest('td');
      if (!td) return;
      console.log(td);

      const tr = td.parentElement;
      if (!tr) return;

      console.log(tr);
      const key = tr.getAttribute('data-key'); // trに data-key="studentId"
      const rows = Array.from(tr.parentElement!.children);
      const index = rows.indexOf(tr);
      if (!key) return;

      if (e.shiftKey && lastIndex !== null) {
        const start = Math.min(lastIndex, index);
        const end = Math.max(lastIndex, index);
        const newSelected = [...selectedIds];
        for (let i = start; i <= end; i++) {
          const k = rows[i].getAttribute('data-key');
          if (k && !newSelected.includes(k)) newSelected.push(k);
        }
        setSelectedIds(newSelected);
      } else {
        setSelectedIds((prev) =>
          prev.includes(key) ? prev.filter((v) => v !== key) : [...prev, key],
        );
        setLastIndex(index);
      }
    };

    // MutationObserver で tr が追加されるのを監視
    const observer = new MutationObserver(() => {
      table.removeEventListener('click', handleClick);
      table.addEventListener('click', handleClick);
    });
    observer.observe(table, { childList: true, subtree: true });

    // 初回バインド
    table.addEventListener('click', handleClick);

    return () => {
      table.removeEventListener('click', handleClick);
      observer.disconnect();
    };
  }, [lastIndex, selectedIds]);

  return { selectedIds };
};
