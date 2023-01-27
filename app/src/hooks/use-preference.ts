import { useCallback } from 'react';
import { API_BASE_URL, DEFAULT_ERROR_MESSAGE } from '../const';
import { Preference } from '../typings';
import { useRequest } from './use-request';
import { useToast } from './use-toast';

export const useFetchPreferences = () => {
  const url = `${API_BASE_URL}/preference`;
  const request = useRequest();
  const errorToast = useToast('error');

  return useCallback(async (): Promise<Preference | null> => {
    const response = await request({ method: 'GET', url });
    if (response.code !== 200) {
      errorToast(response.message ?? DEFAULT_ERROR_MESSAGE);
      return null;
    }

    return response.data as Preference;
  }, [url, request, errorToast]);
};
