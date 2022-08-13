import { atom } from 'recoil';
import { Themes } from '../style/theme';

export const ThemeState = atom({
  key: 'theme',
  default: 'dark' as Themes,
});
