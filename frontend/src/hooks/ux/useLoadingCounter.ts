import { useState, useCallback } from 'react';

export const useLoadingCounter = () => {
  const [count, setCount] = useState(0);

  const start = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  const end = useCallback(() => {
    setCount((c) => c - 1);
  }, []);

  const loading = count > 0;

  return { loading, start, end };
};
