import React, { ReactElement, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { IconNames, LargeText, MediumText, Preference, Presets, Spacer } from '../components';
import { useLogout, useSendMessage, useTheme, useUpdatePreferences } from '../hooks';
import { PreferencesState } from '../state';

const PreferencesContainer = styled.div`
  width: 50vw;
  height: 50vh;
  max-width: 800px;
  max-height: 600px;
`;

const PreferencesContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: scroll;
`;

export const Preferences = (): ReactElement => {
  const preferences = useRecoilValue(PreferencesState);
  const theme = useTheme();

  const updatePreferences = useUpdatePreferences();
  const sendMessage = useSendMessage('window-setup');
  const logout = useLogout();

  const handleAnimatePresets = useCallback(
    (value: boolean) => {
      updatePreferences({ animatePresets: value });
      sendMessage({ name: 'set-animate-presets', value });
    },
    [updatePreferences, sendMessage],
  );

  const handleOverlayMode = useCallback(
    (value: boolean) => {
      updatePreferences({ overlayMode: value });
      sendMessage({ name: 'set-overlay-mode', value });
    },
    [updatePreferences, sendMessage],
  );

  return (
    <PreferencesContainer>
      <PreferencesContent>
        <LargeText>Window Presets</LargeText>
        <MediumText faint>Change the size of the window from the selected presets</MediumText>
        <Spacer vertical={5} />
        <Presets />
        <Preference
          title="Dark mode"
          description="Enable dark mode, does not affect any added applications"
          type="toggle"
          value={preferences?.theme === 'dark' ?? true}
          onChange={(value) => updatePreferences({ theme: value ? 'dark' : 'light' })}
        />
        <Preference
          title="Animate presets"
          description="Show an animation when resizing Switch using layout presets"
          type="toggle"
          value={preferences?.animatePresets ?? false}
          onChange={handleAnimatePresets}
        />
        <Preference
          requiresRestart
          title="Overlay mode"
          description="Switch will display over other applications"
          type="toggle"
          value={preferences?.overlayMode ?? false}
          onChange={handleOverlayMode}
        />
        <Preference
          requiresRestart
          title="Logout"
          description="Your changes are automatically saved"
          type="button"
          onClick={logout}
          icon={{ name: IconNames.FORWARD, color: theme.color.danger }}
        />
      </PreferencesContent>
    </PreferencesContainer>
  );
};
