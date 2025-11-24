import { useState, useCallback } from 'react';

export const useLoadingCounter = () => {
  const [loadingCount, setLoadingCount] = useState(0);
  const loading = loadingCount > 0;

  const start = useCallback(() => setLoadingCount((v) => v + 1), []);

  const end = useCallback(() => setLoadingCount((v) => Math.max(0, v - 1)), []);

  return { loading, start, end };
};
