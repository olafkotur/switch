import { atom } from 'recoil';
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

export const ModuleState = atom({
  key: 'module',
  default: null as Module | null,
});
