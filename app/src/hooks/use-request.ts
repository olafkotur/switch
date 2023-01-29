import { useCallback } from 'react';
import { AuthTokens, Response } from '../typings';
import { useGetStorage } from './use-storage';
import { useToast } from './use-toast';

interface RequestConfig {
  method: 'GET' | 'POST' | 'DELETE';
  url: string;
  body?: Record<string, string | number>;
}

export const useRequest = () => {
  const getStorage = useGetStorage();
  const errorToast = useToast('error');

  return useCallback(async ({ method, url, body }: RequestConfig): Promise<Response | null> => {
    const tokens: AuthTokens | null = await getStorage('tokens');
    if (!window.navigator.onLine) {
      errorToast('You are not connected to the interent');
      return null;
    }

    const result = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokens?.accessToken}` },
      body: body ? JSON.stringify(body) : undefined,
    });

    return result.json();
  }, []);
};
