import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IsAuthenticatedState, ModulesState, PreferenceState, UserState } from '../state';
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

  const setIsAuthenticated = useSetRecoilState(IsAuthenticatedState);
  const setModules = useSetRecoilState(ModulesState);
  const setUser = useSetRecoilState(UserState);
  const setPreference = useSetRecoilState(PreferenceState);

  return useCallback(async () => {
    const tokens: AuthTokens | null = await getStorage('tokens');
    if (!tokens) {
      return;
    }

    // only authenticated users past this point
    const isAuthenticated = await refresh({ refreshToken: tokens.refreshToken });
    if (!isAuthenticated) {
      return;
    }

    const user = await fetchUser();
    const preference = await fetchPreference();
    const modules = await fetchModules();

    setIsAuthenticated(true);
    setUser(user);
    setPreference(preference);
    setModules(modules);
  }, [
    getStorage,
    refresh,
    fetchModules,
    fetchUser,
    fetchPreference,
    setIsAuthenticated,
    setModules,
    setUser,
    setPreference,
  ]);
};
