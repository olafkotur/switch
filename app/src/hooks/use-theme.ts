import { useRecoilValue } from 'recoil';
import { PreferenceState } from '../state';
import { DARK_THEME, LIGHT_THEME } from '../style/theme';

export const useTheme = () => {
  const preference = useRecoilValue(PreferenceState);
  const theme = preference?.theme ?? 'dark';

  if (theme === 'dark') {
    return DARK_THEME;
  }
  return LIGHT_THEME;
};
