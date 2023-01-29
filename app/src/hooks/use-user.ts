import { useCallback } from 'react';
import { API_BASE_URL, DEFAULT_ERROR_MESSAGE } from '../const';
import { User } from '../typings';
import { useRequest } from './use-request';
import { useToast } from './use-toast';

export const useFetchUser = () => {
  const url = `${API_BASE_URL}/user`;
  const request = useRequest();
  const errorToast = useToast('error');

  return useCallback(async (): Promise<User | null> => {
    const response = await request({ method: 'GET', url });
    if (response?.code !== 200) {
      errorToast(response?.message ?? DEFAULT_ERROR_MESSAGE);
      return null;
    }

    return response.data as User;
  }, [url, request, errorToast]);
};
