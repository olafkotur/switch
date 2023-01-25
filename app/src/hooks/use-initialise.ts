import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IsAuthenticatedState, ModulesState, ThemeState } from '../state';
import { AuthTokens } from '../typings';
import { useRefresh } from './use-auth';
import { useFetchModules } from './use-module';
import { useGetStorage } from './use-storage';

export const useInitialise = () => {
  const getStorage = useGetStorage();
  const refresh = useRefresh();
  const fetchModules = useFetchModules();

  const setTheme = useSetRecoilState(ThemeState);
  const setModules = useSetRecoilState(ModulesState);

  const isAuthenticated = useRecoilValue(IsAuthenticatedState);

  return useCallback(async () => {
    const theme = await getStorage('theme');
    theme && setTheme(theme);

    const tokens: AuthTokens | null = await getStorage('tokens');
    if (tokens) {
      await refresh({ refreshToken: tokens.refreshToken });
    }

    if (isAuthenticated) {
      const modules = await fetchModules();
      setModules(modules);
    }
  }, [isAuthenticated, getStorage, refresh, fetchModules, setTheme, setModules]);
};
