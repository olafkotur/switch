import { useCallback } from 'react';

export const useValidateEmail = () => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return useCallback((value: string) => regex.test(value), [regex]);
};
