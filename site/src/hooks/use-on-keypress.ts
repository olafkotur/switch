import { useCallback, useEffect } from 'react';

export const useOnKeyPress = ({ key, useMeta, onPress }: { key: string; useMeta?: boolean; onPress: Function }) => {
  const handleKeyPress = useCallback(
    async (event: KeyboardEvent) => {
      if (useMeta) {
        event.metaKey && event.code == key && onPress();
      } else {
        event.code === key && onPress();
      }
    },

    [key, useMeta, onPress],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
};
