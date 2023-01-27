import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IsAuthenticatedState, ModulesState, PreferenceState, ThemeState, UserState } from '../state';
import { AuthTokens } from '../typings';
import { useRefresh } from './use-auth';
import { useFetchModules } from './use-module';
import { useFetchPreference } from './use-preference';
import { useGetStorage } from './use-storage';
import { useFetchUser } from './use-user';

export const useInitialise = () => {
  const getStorage = useGetStorage();
  const refresh = useRefresh();
  const fetchModules = useFetchModules();
  const fetchUser = useFetchUser();
  const fetchPreference = useFetchPreference();

  const setTheme = useSetRecoilState(ThemeState);
  const setModules = useSetRecoilState(ModulesState);
  const setUser = useSetRecoilState(UserState);
  const setPreference = useSetRecoilState(PreferenceState);

  const isAuthenticated = useRecoilValue(IsAuthenticatedState);

  return useCallback(async () => {
    const theme = await getStorage('theme');
    theme && setTheme(theme);

    const tokens: AuthTokens | null = await getStorage('tokens');
    if (tokens) {
      await refresh({ refreshToken: tokens.refreshToken });
    }

    // only authenticated users past this point
    if (!isAuthenticated) {
      return;
    }

    const user = await fetchUser();
    const preference = await fetchPreference();
    const modules = await fetchModules();

    setUser(user);
    setPreference(preference);
    setModules(modules);
  }, [
    isAuthenticated,
    getStorage,
    refresh,
    fetchModules,
    fetchUser,
    fetchPreference,
    setTheme,
    setModules,
    setUser,
    setPreference,
  ]);
};
