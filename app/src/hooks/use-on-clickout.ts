import { RefObject, useCallback, useEffect } from 'react';

export const useOnClickout = (ignoredRefs: RefObject<Element>[], handler: Function) => {
  const onMouseDown = useCallback(
    (event: MouseEvent) => {
      const containsIgnored = ignoredRefs.map((ref) => ref.current?.contains(event.target as Element));
      const isIgnored = containsIgnored.some(Boolean);
      if (!isIgnored) {
        handler();
      }
    },
    [ignoredRefs, handler],
  );

  useEffect(() => {
    window.addEventListener('mousedown', onMouseDown);
    return () => {
      window.removeEventListener('mousedown', onMouseDown);
    };
  }, [onMouseDown]);
};
