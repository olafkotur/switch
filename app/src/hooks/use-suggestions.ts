import { useCallback } from 'react';
import { API_BASE_URL, DEFAULT_ERROR_MESSAGE } from '../const';
import { Suggestion } from '../typings';
import { useRequest } from './use-request';
import { useToast } from './use-toast';

export const useFetchSuggestions = () => {
  const url = `${API_BASE_URL}/suggestions`;
  const request = useRequest();
  const errorToast = useToast('error');

  return useCallback(async (): Promise<Suggestion[]> => {
    const response = await request({ method: 'GET', url });
    if (response.code !== 200) {
      errorToast(response.message ?? DEFAULT_ERROR_MESSAGE);
      return [];
    }

    return response.data as Suggestion[];
  }, [url, request, errorToast]);
};
