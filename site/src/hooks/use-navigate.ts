import { useCallback } from 'react';

export const useNavigate = () => {
  return useCallback((value: string) => {
    if (window.location.pathname === value) return;

    window.location.href = value;
  }, []);
};
