import { atom } from 'recoil';
import { AppUpdates, ModalName, Module, Preferences, Suggestion, User, WindowSetup } from './typings';

export const IsAppLoadingState = atom({
  key: 'isAppLoading',
  default: true,
});

export const IsAuthenticatedState = atom({
  key: 'isAuthenticated',
  default: false,
});

export const IsFullScreenState = atom({
  key: 'isFullScreen',
  default: false,
});

export const WindowSetupState = atom({
  key: 'windowSetup',
  default: {} as WindowSetup,
});

export const AppUpdatesState = atom({
  key: 'appUpdates',
  default: {
    isCheckingForUpdate: true,
    isUpdateAvailable: null,
    isUpdateDownloading: null,
    isUpdateDownloaded: null,
  } as AppUpdates,
});

export const ActiveModuleIdState = atom({
  key: 'activeModuleId',
  default: null as string | null,
});

export const ModulesState = atom({
  key: 'modules',
  default: [] as Module[],
});

export const ModalState = atom({
  key: 'modal',
  default: null as ModalName | null,
});

export const UserState = atom({
  key: 'user',
  default: null as User | null,
});

export const PreferencesState = atom({
  key: 'preferences',
  default: null as Preferences | null,
});

export const SuggestionsState = atom({
  key: 'suggestions',
  default: [] as Suggestion[],
});

export const EditModuleState = atom({
  key: 'editModule',
  default: false,
});
