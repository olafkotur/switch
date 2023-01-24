import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { ModulesState, ThemeState } from '../state';
import { AuthTokens } from '../typings';
import { useRefresh } from './use-login';
import { useFetchModules } from './use-module';
import { useGetStorage } from './use-storage';

export const useInitialise = () => {
  const getStorage = useGetStorage();
  const refresh = useRefresh();
  const fetchModules = useFetchModules();

  const setTheme = useSetRecoilState(ThemeState);
  const setModules = useSetRecoilState(ModulesState);

  return useCallback(async () => {
    const theme = await getStorage('theme');
    theme && setTheme(theme);

    const tokens: AuthTokens | null = await getStorage('tokens');
    if (tokens) {
      await refresh({ refreshToken: tokens.refreshToken });
    }

    const modules = await fetchModules();
    setModules(modules);
  }, [getStorage, refresh, fetchModules, setTheme, setModules]);
};
