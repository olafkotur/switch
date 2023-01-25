import { useCallback, useEffect } from 'react';

export const useOnKeyPress = (key: string, handler: () => Promise<void>) => {
  const handleKeyPress = useCallback(
    async (event: KeyboardEvent) => {
      if (event.code === key) {
        await handler();
      }
    },

    [key, handler],
  );

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [handleKeyPress]);
};
