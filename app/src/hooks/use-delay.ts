import { useCallback } from 'react';

export const useDelay = () => {
  return useCallback((ms: number) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), ms);
    });
  }, []);
};
