import { atom } from 'recoil';
import { ModalName } from './modals';
import { Module, Preference, User } from './typings';

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

export const PreferenceState = atom({
  key: 'preference',
  default: null as Preference | null,
});

export const IsAuthenticatedState = atom({
  key: 'isAuthenticated',
  default: false,
});

export const IsControlsVisibleState = atom({
  key: 'isControlsVisible',
  default: false,
});
