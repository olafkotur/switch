import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { INITIALISE_TIMEOUT_MS } from '../const';
import { IsAuthenticatedState, ModulesState, PreferencesState, SuggestionsState, UserState } from '../state';
import { AuthTokens } from '../typings';
import { useRefresh } from './use-auth';
import { useDelay } from './use-delay';
import { useFetchModules } from './use-module';
import { useFetchPreferences } from './use-preferences';
import { useGetStorage } from './use-storage';
import { useFetchSuggestions } from './use-suggestions';
import { useFetchUser } from './use-user';

export const useInitialise = () => {
  const getStorage = useGetStorage();
  const refresh = useRefresh();
  const delay = useDelay();

  const fetchModules = useFetchModules();
  const fetchUser = useFetchUser();
  const fetchPreferences = useFetchPreferences();
  const fetchSuggestions = useFetchSuggestions();

  const setIsAuthenticated = useSetRecoilState(IsAuthenticatedState);
  const setModules = useSetRecoilState(ModulesState);
  const setUser = useSetRecoilState(UserState);
  const setPreferences = useSetRecoilState(PreferencesState);
  const setSuggestions = useSetRecoilState(SuggestionsState);

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
    const preferences = await fetchPreferences();
    const modules = await fetchModules();
    const suggestions = await fetchSuggestions();

    // additional waiting for UI updates
    await delay(INITIALISE_TIMEOUT_MS);

    setIsAuthenticated(true);
    setUser(user);
    setPreferences(preferences);
    setModules(modules);
    setSuggestions(suggestions);
  }, [
    getStorage,
    refresh,
    fetchModules,
    fetchUser,
    fetchPreferences,
    setIsAuthenticated,
    setModules,
    setUser,
    setPreferences,
    fetchSuggestions,
  ]);
};
