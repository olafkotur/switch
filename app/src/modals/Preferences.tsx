import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
  Button,
  ColumnContainer,
  Icon,
  IconNames,
  LargeText,
  MediumText,
  PreferenceOption,
  Spacer,
} from '../components';
import { useLogout, useSendMessage, useUpdatePreferences } from '../hooks';
import { PreferencesState } from '../state';
import { Rotate } from '../style/animation';

type PreferencesPanel = 'general' | 'account' | 'appearance';

const PreferencesContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 55vw;
  height: 55vh;
  position: relative;
`;

const PreferencesPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  height: calc(100% - 40px);
  position: relative;
  padding: ${(props) => props.theme.spacing.veryLarge};
  background: ${(props) => props.theme.backgroundColor.secondary};
  border-radius: ${(props) => props.theme.borderRadius.large};
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const PreferencesButton = styled(Button)`
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing.veryLarge};
`;

const PreferencesContent = styled.div`
  width: calc(70vw - 150px);
  height: calc(100% - 40px);
  padding: ${(props) => props.theme.spacing.veryLarge};
  background: ${(props) => props.theme.backgroundColor.primary};
  border-radius: ${(props) => props.theme.borderRadius.large};
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

const PreferencesPanelFooter = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: ${(props) => props.theme.spacing.large};
`;

const LogoutButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 103px;
  height: 30px;
  color: ${(props) => props.theme.color.white};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  background: ${(props) => props.theme.color.danger};
`;

export const Preferences = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPanel, setSelectedPanel] = useState<PreferencesPanel>('general');

  const logout = useLogout();

  const config = useMemo(() => {
    return [
      {
        label: 'General',
        isActive: selectedPanel === 'general',
        onClick: () => setSelectedPanel('general'),
      },
      {
        label: 'Account',
        isActive: selectedPanel === 'account',
        onClick: () => setSelectedPanel('account'),
      },
      {
        label: 'Appearance',
        isActive: selectedPanel === 'appearance',
        onClick: () => setSelectedPanel('appearance'),
      },
    ];
  }, [selectedPanel, setSelectedPanel]);

  const handleLogout = useCallback(async () => {
    setIsLoading(true);
    await logout();
    setIsLoading(false);
  }, [isLoading, setIsLoading, logout]);

  return (
    <PreferencesContainer>
      <PreferencesPanelContainer>
        {config.map((preference) => (
          <PreferencesButton onClick={preference.onClick} key={preference.label}>
            <LargeText faint={!preference.isActive} cursor="pointer">
              {preference.label}
            </LargeText>
          </PreferencesButton>
        ))}

        <PreferencesPanelFooter>
          <LogoutButton onClick={handleLogout} disabled={isLoading}>
            {isLoading ? (
              <Icon name={IconNames.LOADING} color="inherit" animation={Rotate({})} size={14} />
            ) : (
              <>
                <Icon name={IconNames.LOGOUT} color="inherit" size={14} opacity={1} />
                <Spacer horizontal={3} />
                <MediumText color="inherit" cursor="inherit">
                  Logout
                </MediumText>
              </>
            )}
          </LogoutButton>
        </PreferencesPanelFooter>
      </PreferencesPanelContainer>

      <PreferencesContent>
        {selectedPanel === 'general' && <GeneralPanel />}
        {selectedPanel === 'account' && <AccountPanel />}
        {selectedPanel === 'appearance' && <AppearancePanel />}
      </PreferencesContent>
    </PreferencesContainer>
  );
};

const GeneralPanel = (): ReactElement => {
  const preferences = useRecoilValue(PreferencesState);
  const updatePreferences = useUpdatePreferences();
  const sendMessage = useSendMessage('window-setup');

  const handleOverlayMode = useCallback(
    (value: boolean) => {
      updatePreferences({ overlayMode: value });
      sendMessage({ name: 'set-overlay-mode', value });
    },
    [updatePreferences],
  );

  return (
    <ColumnContainer>
      <PreferenceOption
        requiresRestart
        title="Overlay mode"
        description="Switch will display over other applications"
        type="toggle"
        value={preferences?.overlayMode ?? false}
        onChange={(value) => handleOverlayMode(value as boolean)}
      />
    </ColumnContainer>
  );
};

const AccountPanel = (): ReactElement => {
  return (
    <ColumnContainer>
      <PreferenceOption
        title="Change password"
        description="Update your current password"
        type="text"
        value=""
        onChange={console.log}
      />
    </ColumnContainer>
  );
};

const AppearancePanel = (): ReactElement => {
  const preferences = useRecoilValue(PreferencesState);
  const updatePreferences = useUpdatePreferences();

  return (
    <ColumnContainer>
      <PreferenceOption
        title="Dark mode"
        description="Enable dark mode, does not affect any added applications"
        type="toggle"
        value={preferences?.theme === 'dark' ?? true}
        onChange={(value) => updatePreferences({ theme: value ? 'dark' : 'light' })}
      />
      <Spacer vertical={15} />
      <PreferenceOption
        title="Animate presets"
        description="Show an animation when resizing Switch using layout presets"
        type="toggle"
        value={preferences?.animatePresets ?? false}
        onChange={(value) => updatePreferences({ animatePresets: value as boolean })}
      />
    </ColumnContainer>
  );
};
