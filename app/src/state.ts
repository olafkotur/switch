import { atom } from 'recoil';
import { ModalName } from './modals';
import { Module, Preference, Suggestion, User } from './typings';

export const IsAuthenticatedState = atom({
  key: 'isAuthenticated',
  default: false,
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
  default: null as Preference | null,
});

export const SuggestionsState = atom({
  key: 'suggestions',
  default: [] as Suggestion[],
});
