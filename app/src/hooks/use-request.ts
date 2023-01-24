import { useCallback } from 'react';
import { Response, AuthTokens } from '../typings';
import { useGetStorage } from './use-storage';

interface RequestConfig {
  method: 'GET' | 'POST' | 'DELETE';
  url: string;
  body?: Record<string, string | number>;
}

export const useRequest = () => {
  const getStorage = useGetStorage();

  return useCallback(async ({ method, url, body }: RequestConfig): Promise<Response> => {
    const tokens: AuthTokens | null = await getStorage('tokens');
    const result = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokens?.accessToken}` },
      body: body ? JSON.stringify(body) : undefined,
    });

    return result.json();
  }, []);
};
