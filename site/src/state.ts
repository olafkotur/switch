import { atom } from 'recoil';
import { Themes } from './style/theme';
import { Pages } from './typings';

export const ThemeState = atom({
  key: 'theme',
  default: 'dark' as Themes,
});

export const PageState = atom({
  key: 'page',
  default: 'home' as Pages,
});

export const DownloadingState = atom({
  key: 'isDownloading',
  default: false,
});
