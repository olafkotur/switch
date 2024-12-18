import React, { ReactElement, useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { IconNames, LargeText, MediumText, Preference, Presets, Spacer } from '../components';
import { useLogout, useSendMessage, useTheme, useUpdatePreferences } from '../hooks';
import { ActiveModuleIdState, ModalState, PreferencesState } from '../state';

const PreferencesContainer = styled.div`
  width: 50vw;
  max-width: 800px;
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

  const setModal = useSetRecoilState(ModalState);
  const setActiveModuleId = useSetRecoilState(ActiveModuleIdState);

  const updatePreferences = useUpdatePreferences();
  const sendMessage = useSendMessage('window-setup');
  const logout = useLogout();

  const handleDarkMode = useCallback(
    async (value: boolean) => {
      return updatePreferences({ theme: value ? 'dark' : 'light' });
    },
    [updatePreferences],
  );

  const handleAnimatePresets = useCallback(
    async (value: boolean) => {
      const success = await updatePreferences({ animatePresets: value });
      if (success) {
        sendMessage({ name: 'set-animate-presets', value });
      }
      return success;
    },
    [updatePreferences, sendMessage],
  );

  const handleOverlayMode = useCallback(
    async (value: boolean) => {
      const success = await updatePreferences({ overlayMode: value });
      if (success) {
        sendMessage({ name: 'set-overlay-mode', value });
      }
      return success;
    },
    [updatePreferences, sendMessage],
  );

  const handleShowTutorial = useCallback(() => {
    // user must be on the home page for the tutorial to take effect
    setModal(null);
    setActiveModuleId(null);

    updatePreferences({ showTutorial: true });
  }, [updatePreferences, setModal]);

  return (
    <PreferencesContainer>
      <PreferencesContent>
        <LargeText>Window Presets</LargeText>
        <Spacer vertical={2} />
        <MediumText faint>Change the size of the window from the selected presets</MediumText>
        <Spacer vertical={5} />
        <Presets />
        <Preference
          title="Dark mode"
          description="Enable dark mode, does not affect any added applications"
          type="toggle"
          value={preferences?.theme === 'dark' ?? true}
          onChange={handleDarkMode}
        />
        <Preference
          title="Animate presets"
          description="Show an animation when resizing window presets"
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
          title="Show Tutorial"
          description="Replay the quick tour of Switch"
          type="button"
          onClick={handleShowTutorial}
          icon={{ name: IconNames.REPEAT, color: theme.color.normal }}
        />
        <Preference
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
