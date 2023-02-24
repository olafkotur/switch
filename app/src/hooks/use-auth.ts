import { useCallback } from 'react';
import { API_BASE_URL, DEFAULT_ERROR_MESSAGE } from '../const';
import { useSendMessage } from './use-electron-events';
import { useInitialise } from './use-initialise';
import { useRequest } from './use-request';
import { useResetState } from './use-reset-state';
import { useRemoveStorage, useSetStorage } from './use-storage';
import { useToast } from './use-toast';

export const useLogin = () => {
  const url = `${API_BASE_URL}/user/login`;
  const request = useRequest();
  const errorToast = useToast('error');
  const setStorage = useSetStorage();
  const initialise = useInitialise();

  return useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      const response = await request({ method: 'POST', url, body: { email, password } });
      if (response?.code !== 200) {
        return errorToast(response?.message ?? DEFAULT_ERROR_MESSAGE);
      }
      await setStorage('tokens', { ...(response.data as Object) });
      await initialise();
    },
    [url, request, errorToast, setStorage, initialise],
  );
};

export const useSignUp = () => {
  const url = `${API_BASE_URL}/user/create`;
  const request = useRequest();
  const errorToast = useToast('error');
  const setStorage = useSetStorage();
  const initialise = useInitialise();

  return useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      const response = await request({ method: 'POST', url, body: { email, password } });
      if (response?.code !== 201) {
        return errorToast(response?.message ?? DEFAULT_ERROR_MESSAGE);
      }
      await setStorage('tokens', { ...(response.data as Object) });
      await initialise();
    },
    [url, request, errorToast, setStorage, initialise],
  );
};

export const useRefresh = () => {
  const url = `${API_BASE_URL}/user/refresh`;
  const request = useRequest();
  const setStorage = useSetStorage();
  const removeStorage = useRemoveStorage();

  return useCallback(
    async ({ refreshToken }: { refreshToken: string }): Promise<boolean> => {
      const response = await request({ method: 'POST', url, body: { refreshToken } });
      if (response?.code !== 200) {
        removeStorage('tokens');
        return false;
      }

      await setStorage('tokens', { ...(response.data as Object) });
      return true;
    },
    [url, request, setStorage, removeStorage],
  );
};

export const useLogout = () => {
  const removeStorage = useRemoveStorage();
  const resetState = useResetState();
  const sendMessage = useSendMessage('storage-control');

  return useCallback(() => {
    removeStorage('tokens');
    resetState();
    sendMessage({ name: 'clear-storage', value: true });
  }, [removeStorage, resetState, sendMessage]);
};
