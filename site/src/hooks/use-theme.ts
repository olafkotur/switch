import { useRecoilValue } from 'recoil';
import { ThemeState } from '../state';
import { DARK_THEME, LIGHT_THEME } from '../style/theme';

export const useTheme = () => {
  const theme = useRecoilValue(ThemeState);
  if (theme === 'dark') {
    return DARK_THEME;
  }
  return LIGHT_THEME;
};
