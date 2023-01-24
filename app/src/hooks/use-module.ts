import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { API_BASE_URL, DEFAULT_ERROR_MESSAGE } from '../const';
import { ModulesState } from '../state';
import { Module } from '../typings';
import { useRequest } from './use-request';
import { useToast } from './use-toast';

export const useFetchModules = () => {
  const url = `${API_BASE_URL}/module`;
  const request = useRequest();
  const errorToast = useToast('error');

  return useCallback(async (): Promise<Module[]> => {
    const response = await request({ method: 'GET', url });
    if (response.code !== 200) {
      errorToast(response.message ?? DEFAULT_ERROR_MESSAGE);
      return [];
    }

    return response.data as Module[];
  }, [url, request, errorToast]);
};

export const useCreateModule = () => {
  const [modules, setModules] = useRecoilState(ModulesState);

  const url = `${API_BASE_URL}/module/create`;
  const request = useRequest();
  const errorToast = useToast('error');

  return useCallback(
    async (_url: string) => {
      const response = await request({ method: 'POST', url, body: { url: _url } });
      if (response.code !== 200) {
        errorToast(response.message ?? DEFAULT_ERROR_MESSAGE);
        return;
      }

      setModules([...modules, response.data as Module]);
    },
    [url, modules, request, errorToast, setModules],
  );
};

export const useDeleteModule = () => {
  const [modules, setModules] = useRecoilState(ModulesState);

  const url = `${API_BASE_URL}/module/delete`;
  const request = useRequest();
  const errorToast = useToast('error');

  return useCallback(
    async (_id: string) => {
      const response = await request({ method: 'DELETE', url, body: { _id } });
      if (response.code !== 200) {
        errorToast(response.message ?? DEFAULT_ERROR_MESSAGE);
        return;
      }

      const updatedModules = modules.filter((module) => module._id !== _id);
      setModules(updatedModules);
    },
    [url, modules, request, errorToast, setModules],
  );
};
