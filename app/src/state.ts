import { atom } from 'recoil';
import { TEST_MODULE_GROUP } from '../../common/const';
import { Module } from '../../common/types/module';
import { User } from '../../common/types/user';
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

export const ActiveModuleState = atom({
  key: 'activeModule',
  default: null as Module | null,
});

export const GroupModuleState = atom({
  key: 'groupModule',
  // default: [] as Module[],
  default: TEST_MODULE_GROUP,
});
