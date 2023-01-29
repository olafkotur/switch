import { useRecoilValue } from 'recoil';
import { PreferencesState } from '../state';
import { DARK_THEME, LIGHT_THEME } from '../style/theme';

export const useTheme = () => {
  const preferences = useRecoilValue(PreferencesState);
  const theme = preferences?.theme ?? 'dark';

  if (theme === 'dark') {
    return DARK_THEME;
  }
  return LIGHT_THEME;
};
