import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { INITIALISE_TIMEOUT_MS } from '../const';
import {
  IsAuthenticatedState,
  ModulesState,
  PreferencesState,
  SuggestionsState,
  UserState,
  WindowSetupState,
} from '../state';
import { AuthTokens } from '../typings';
import { useRefresh } from './use-auth';
import { useDelay } from './use-delay';
import { useFetchModules } from './use-module';
import { useFetchPreferences, useUpdatePreferences } from './use-preferences';
import { useGetStorage } from './use-storage';
import { useFetchSuggestions } from './use-suggestions';
import { useFetchUser } from './use-user';

export const useInitialise = () => {
  const windowSetup = useRecoilValue(WindowSetupState);
  const getStorage = useGetStorage();
  const refresh = useRefresh();
  const delay = useDelay();

  const fetchUser = useFetchUser();
  const fetchPreferences = useFetchPreferences();
  const fetchModules = useFetchModules();
  const fetchSuggestions = useFetchSuggestions();

  const setIsAuthenticated = useSetRecoilState(IsAuthenticatedState);
  const setUser = useSetRecoilState(UserState);
  const setPreferences = useSetRecoilState(PreferencesState);
  const setModules = useSetRecoilState(ModulesState);
  const setSuggestions = useSetRecoilState(SuggestionsState);

  const updatePreferences = useUpdatePreferences();

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

    setIsAuthenticated(true);
    setUser(user);
    setPreferences(preferences);
    setModules(modules);
    setSuggestions(suggestions);

    await updatePreferences({ overlayMode: windowSetup.overlayMode ?? false });

    // additional waiting for UI & electron events
    await delay(INITIALISE_TIMEOUT_MS);
  }, [
    windowSetup,
    getStorage,
    refresh,
    fetchUser,
    fetchPreferences,
    fetchModules,
    fetchSuggestions,
    setIsAuthenticated,
    setUser,
    setPreferences,
    setModules,
    setSuggestions,
    updatePreferences,
  ]);
};
