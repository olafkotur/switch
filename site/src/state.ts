import { atom } from 'recoil';
import { Themes } from './style/theme';
import { ModalName } from './typings';

export const ThemeState = atom({
  key: 'theme',
  default: 'dark' as Themes,
});

export const ModalState = atom({
  key: 'modal',
  default: null as ModalName | null,
});

export const DownloadingState = atom({
  key: 'isDownloading',
  default: false,
});
