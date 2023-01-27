import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { API_BASE_URL, DEFAULT_ERROR_MESSAGE } from '../const';
import { IsAuthenticatedState, ModalState } from '../state';
import { useRequest } from './use-request';
import { useRemoveStorage, useSetStorage } from './use-storage';
import { useToast } from './use-toast';

export const useLogin = () => {
  const url = `${API_BASE_URL}/user/login`;
  const request = useRequest();
  const errorToast = useToast('error');
  const setStorage = useSetStorage();
  const setIsAuthenticated = useSetRecoilState(IsAuthenticatedState);

  return useCallback(
    async ({ username, password }: { username: string; password: string }) => {
      const response = await request({ method: 'POST', url, body: { username, password } });
      if (response.code !== 200) {
        return errorToast(response.message ?? DEFAULT_ERROR_MESSAGE);
      }
      await setStorage('tokens', { ...(response.data as Object) });
      setIsAuthenticated(true);
    },
    [url, request, errorToast, setStorage, setIsAuthenticated],
  );
};

export const useSignUp = () => {
  const url = `${API_BASE_URL}/user/create`;
  const request = useRequest();
  const errorToast = useToast('error');
  const setStorage = useSetStorage();
  const setIsAuthenticated = useSetRecoilState(IsAuthenticatedState);

  return useCallback(
    async ({ username, password }: { username: string; password: string }) => {
      const response = await request({ method: 'POST', url, body: { username, password } });
      if (response.code !== 201) {
        return errorToast(response.message ?? DEFAULT_ERROR_MESSAGE);
      }
      await setStorage('tokens', { ...(response.data as Object) });
      setIsAuthenticated(true);
    },
    [url, request, errorToast, setStorage, setIsAuthenticated],
  );
};

export const useRefresh = () => {
  const url = `${API_BASE_URL}/user/refresh`;
  const request = useRequest();
  const setStorage = useSetStorage();
  const removeStorage = useRemoveStorage();
  const setIsAuthenticated = useSetRecoilState(IsAuthenticatedState);

  return useCallback(
    async ({ refreshToken }: { refreshToken: string }) => {
      const response = await request({ method: 'POST', url, body: { refreshToken } });
      if (response.code !== 200) {
        removeStorage('tokens');
        return setIsAuthenticated(false);
      }

      await setStorage('tokens', { ...(response.data as Object) });
      setIsAuthenticated(true);
    },
    [url, request, setStorage, removeStorage, setIsAuthenticated],
  );
};

export const useLogout = () => {
  const removeStorage = useRemoveStorage();
  const setIsAuthenticated = useSetRecoilState(IsAuthenticatedState);
  const setModal = useSetRecoilState(ModalState);

  return useCallback(() => {
    removeStorage('tokens');
    setIsAuthenticated(false);
    setModal(null);
  }, [removeStorage, setIsAuthenticated]);
};

export const useResetPassword = () => {
  const infoToast = useToast('info');

  return useCallback(
    ({ oldPassword, newPassword }: { oldPassword?: string; newPassword?: string }) => {
      infoToast('Password reset not currently implemented');
    },
    [infoToast],
  );
};
