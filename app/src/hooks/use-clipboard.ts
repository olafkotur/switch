import { useCallback } from 'react';
import { useToast } from './use-toast';

export const useClipboardCopy = () => {
  const successToast = useToast('success', 2500);

  return useCallback(
    (value: string) => {
      navigator.clipboard.writeText(value);
      successToast('URL copied to clipboard');
    },
    [successToast],
  );
};
