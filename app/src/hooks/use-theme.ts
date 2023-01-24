import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ThemeState } from '../state';
import { DARK_THEME, LIGHT_THEME } from '../style/theme';
import { useSetStorage } from './use-storage';

export const useTheme = () => {
  const theme = useRecoilValue(ThemeState);
  if (theme === 'dark') {
    return DARK_THEME;
  }
  return LIGHT_THEME;
};

export const useToggleTheme = () => {
  const [theme, setTheme] = useRecoilState(ThemeState);
  const oppositeTheme = theme === 'dark' ? 'light' : 'dark';
  const setStorage = useSetStorage();

  return useCallback(() => {
    setStorage('theme', oppositeTheme);
    setTheme(oppositeTheme);
  }, [theme, setStorage, setTheme]);
};
