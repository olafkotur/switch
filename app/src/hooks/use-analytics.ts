import { getAnalytics, logEvent } from 'firebase/analytics';
import { useCallback } from 'react';

export const useAnalytics = () => {
  const analytics = getAnalytics();

  return useCallback(() => {
    logEvent(analytics, '');
  }, [analytics]);
};
