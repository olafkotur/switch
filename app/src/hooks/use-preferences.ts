import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { API_BASE_URL, DEFAULT_ERROR_MESSAGE } from '../const';
import { PreferencesState } from '../state';
import { Themes } from '../style/theme';
import { Preferences } from '../typings';
import { useRequest } from './use-request';
import { useToast } from './use-toast';

interface UpdatePreferences {
  theme?: Themes;
  overlayMode?: boolean;
  disableOverlayPrompt?: boolean;
  animatePresets?: boolean;
}

export const useFetchPreferences = () => {
  const url = `${API_BASE_URL}/preferences`;
  const request = useRequest();
  const errorToast = useToast('error');

  return useCallback(async (): Promise<Preferences | null> => {
    const response = await request({ method: 'GET', url });
    if (response.code !== 200) {
      errorToast(response.message ?? DEFAULT_ERROR_MESSAGE);
      return null;
    }

    return response.data as Preferences;
  }, [url, request, errorToast]);
};

export const useUpdatePreferences = () => {
  const url = `${API_BASE_URL}/preferences/update`;
  const request = useRequest();
  const errorToast = useToast('error');
  const setPreferences = useSetRecoilState(PreferencesState);

  return useCallback(
    async (data: UpdatePreferences): Promise<boolean> => {
      const body = data as Record<string, string>;
      const response = await request({ method: 'POST', url, body });
      if (response.code !== 200) {
        errorToast(response.message ?? DEFAULT_ERROR_MESSAGE);
        return false;
      }

      setPreferences(response.data as Preferences);
      return true;
    },
    [url, request, errorToast, setPreferences],
  );
};
