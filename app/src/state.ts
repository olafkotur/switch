import { atom } from 'recoil';
import { TEST_MODULE_GROUP } from '../../common/const';
import { Module } from '../../common/types/module';
import { User } from '../../common/types/user';
import { ModalName } from './components/Modal';
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
  default: TEST_MODULE_GROUP,
});

export const ModalState = atom({
  key: 'modal',
  default: null as ModalName | null,
});
