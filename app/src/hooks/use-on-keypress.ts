import { useCallback, useEffect } from 'react';

export const useOnKeyPress = (key: string, handler: () => Promise<void> | void) => {
  const handleKeyPress = useCallback(
    async (event: KeyboardEvent) => {
      if (event.code === key) {
        await handler();
      }
    },

    [key, handler],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
};
