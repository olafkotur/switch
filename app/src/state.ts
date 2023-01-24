import { atom } from 'recoil';
import { TEST_MODULE_GROUP } from './const';
import { Module, User } from './typings';
import { ModalName } from './modals';
import { Themes } from './style/theme';

export const ThemeState = atom({
  key: 'theme',
  default: 'dark' as Themes,
});

export const UserState = atom({
  key: 'user',
  // default: null as User | null,
  default: { username: 'olafkotur', avatar: '' } as User,
});

export const ActiveModuleIdState = atom({
  key: 'activeModuleId',
  default: null as string | null,
});

export const GroupModuleState = atom({
  key: 'groupModule',
  // default: [] as Module[],
  // TODO: use dynamic module groups
  default: TEST_MODULE_GROUP,
});

export const ModalState = atom({
  key: 'modal',
  default: null as ModalName | null,
});
