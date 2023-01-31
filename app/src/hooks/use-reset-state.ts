import { useCallback } from 'react';
import { useResetRecoilState } from 'recoil';
import {
  ActiveModuleIdState,
  IsAppLoadingState,
  IsAuthenticatedState,
  ModalState,
  ModulesState,
  PreferencesState,
  SuggestionsState,
  UserState,
} from '../state';

export const useResetState = () => {
  const resetIsAppLoading = useResetRecoilState(IsAppLoadingState);
  const resetIsAuthenticated = useResetRecoilState(IsAuthenticatedState);
  const resetActiveModuleId = useResetRecoilState(ActiveModuleIdState);
  const resetModules = useResetRecoilState(ModulesState);
  const resetModal = useResetRecoilState(ModalState);
  const resetUser = useResetRecoilState(UserState);
  const resetPreferences = useResetRecoilState(PreferencesState);
  const resetSuggestions = useResetRecoilState(SuggestionsState);

  return useCallback(() => {
    resetIsAppLoading();
    resetIsAuthenticated();
    resetActiveModuleId();
    resetModules();
    resetModal();
    resetUser();
    resetPreferences();
    resetSuggestions();
  }, [
    resetIsAppLoading,
    resetIsAuthenticated,
    resetActiveModuleId,
    resetModules,
    resetModal,
    resetUser,
    resetPreferences,
    resetSuggestions,
  ]);
};
