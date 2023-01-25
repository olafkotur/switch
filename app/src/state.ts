import { atom } from 'recoil';
import { ModalName } from './modals';
import { Themes } from './style/theme';
import { Module, User } from './typings';

export const ThemeState = atom({
  key: 'theme',
  default: 'dark' as Themes,
});

export const IsAuthenticatedState = atom({
  key: 'isAuthenticated',
  default: false,
});

export const ActiveModuleIdState = atom({
  key: 'activeModuleId',
  default: '63cfa1452f25835bd768e09e' as string | null,
});

export const ModulesState = atom({
  key: 'modules',
  default: [] as Module[],
});

export const ModalState = atom({
  key: 'modal',
  default: null as ModalName | null,
});
