import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { IsAuthenticatedState, ThemeState } from '../state';
import { AuthTokens } from '../typings';
import { useRefresh } from './use-login';
import { useGetStorage } from './use-storage';

export const useInitialise = () => {
  const getStorage = useGetStorage();
  const refresh = useRefresh();
  const setTheme = useSetRecoilState(ThemeState);

  return useCallback(async () => {
    const theme = await getStorage('theme');
    theme && setTheme(theme);

    const tokens: AuthTokens | null = await getStorage('tokens');
    if (tokens) {
      await refresh({ refreshToken: tokens.refreshToken });
    }
  }, [getStorage, setTheme, refresh]);
};
