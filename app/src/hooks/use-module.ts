import { useCallback } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { API_BASE_URL, DEFAULT_ERROR_MESSAGE } from '../const';
import { ActiveModuleIdState, ModulesState } from '../state';
import { Module } from '../typings';
import { useRequest } from './use-request';
import { useToast } from './use-toast';

export const useFetchModules = () => {
  const url = `${API_BASE_URL}/module`;
  const request = useRequest();
  const errorToast = useToast('error');

  return useCallback(async (): Promise<Module[]> => {
    const response = await request({ method: 'GET', url });
    if (response?.code !== 200) {
      errorToast(response?.message ?? DEFAULT_ERROR_MESSAGE);
      return [];
    }

    return response.data as Module[];
  }, [url, request, errorToast]);
};

export const useCreateModule = () => {
  const [modules, setModules] = useRecoilState(ModulesState);
  const setActiveModuleId = useSetRecoilState(ActiveModuleIdState);

  const url = `${API_BASE_URL}/module/create`;
  const request = useRequest();
  const errorToast = useToast('error');

  return useCallback(
    async (_url: string) => {
      const response = await request({ method: 'POST', url, body: { url: _url } });
      if (response?.code !== 200) {
        errorToast(response?.message ?? DEFAULT_ERROR_MESSAGE);
        return;
      }

      const module = response.data as Module;
      setModules([...modules, module]);
      setActiveModuleId(module._id);
    },
    [url, modules, request, errorToast, setModules, setActiveModuleId],
  );
};

export const useDeleteModule = () => {
  const [modules, setModules] = useRecoilState(ModulesState);
  const setActiveModuleId = useSetRecoilState(ActiveModuleIdState);

  const url = `${API_BASE_URL}/module/delete`;
  const request = useRequest();
  const errorToast = useToast('error');

  return useCallback(
    async (_id: string) => {
      const response = await request({ method: 'DELETE', url, body: { _id } });
      if (response?.code !== 200) {
        errorToast(response?.message ?? DEFAULT_ERROR_MESSAGE);
        return;
      }

      const updatedModules = modules.filter((module) => module._id !== _id);
      setModules(updatedModules);
      setActiveModuleId(null);
    },
    [url, modules, request, errorToast, setModules, setActiveModuleId],
  );
};

export const useUpdateModule = () => {
  const [modules, setModules] = useRecoilState(ModulesState);
  const setActiveModuleId = useSetRecoilState(ActiveModuleIdState);

  const url = `${API_BASE_URL}/module/update`;
  const request = useRequest();
  const errorToast = useToast('error');

  return useCallback(
    async (_id: string, position: number) => {
      const response = await request({ method: 'POST', url, body: { _id, data: { position } } });
      if (response?.code !== 200) {
        errorToast(response?.message ?? DEFAULT_ERROR_MESSAGE);
        return;
      }
    },
    [url, modules, request, errorToast, setModules, setActiveModuleId],
  );
};

export const useReorderModule = () => {
  const [modules, setModules] = useRecoilState(ModulesState);
  const updateModule = useUpdateModule();

  return useCallback(
    async ({ _id, position }: { _id: string; position: number }) => {
      const moduleIndex = modules.findIndex((module) => module._id === _id);
      if (moduleIndex === -1) return;

      const modulesCopy = [...modules];
      const [removedModule] = modulesCopy.splice(moduleIndex, 1);
      modulesCopy.splice(position, 0, removedModule);

      const updatedModules = modulesCopy.map((module, index) => ({
        ...module,
        position: index,
      }));

      setModules(updatedModules);
      await updateModule(_id, position);
    },
    [modules, setModules],
  );
};
