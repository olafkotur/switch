import { atom } from 'recoil';
import { Themes } from './style/theme';

export const ThemeState = atom({
  key: 'theme',
  default: 'dark' as Themes,
});

export const DownloadingState = atom({
  key: 'isDownloading',
  default: false,
});
