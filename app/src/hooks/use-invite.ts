import { useCallback } from 'react';
import { API_BASE_URL, DEFAULT_ERROR_MESSAGE } from '../const';
import { Invite } from '../typings';
import { useRequest } from './use-request';
import { useToast } from './use-toast';

export const useFetchInvites = () => {
  const url = `${API_BASE_URL}/invites`;
  const request = useRequest();
  const errorToast = useToast('error');

  return useCallback(async (): Promise<Invite[]> => {
    const response = await request({ method: 'GET', url });
    if (response?.code !== 200) {
      errorToast(response?.message ?? DEFAULT_ERROR_MESSAGE);
      return [];
    }

    return response.data as Invite[];
  }, [url, request, errorToast]);
};

export const useCreateInvite = () => {
  const url = `${API_BASE_URL}/invites/create`;
  const request = useRequest();
  const errorToast = useToast('error');
  const successToast = useToast('success');

  return useCallback(
    async (email: string): Promise<boolean> => {
      const response = await request({ method: 'POST', url, body: { email } });
      if (response?.code !== 201) {
        errorToast(response?.message ?? DEFAULT_ERROR_MESSAGE);
        return false;
      }

      successToast('Invite sent!');
      return true;
    },
    [url, request, errorToast],
  );
};
