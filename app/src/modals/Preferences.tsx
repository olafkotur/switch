import React, { ReactElement, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { BodyText, Button, ColumnContainer, PreferenceOption, Spacer, SubtitleText } from '../components';
import { useLogout, useUpdatePreference } from '../hooks';
import { PreferenceState } from '../state';

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
  color: #fff;
  width: 103px;
  height: 30px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  background: ${(props) => props.theme.color.danger};
`;

export const Preferences = (): ReactElement => {
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

  return (
    <PreferencesContainer>
      <PreferencesPanelContainer>
        {config.map((preference) => (
          <PreferencesButton onClick={preference.onClick} key={preference.label}>
            <SubtitleText faint={!preference.isActive} cursor="pointer">
              {preference.label}
            </SubtitleText>
          </PreferencesButton>
        ))}

        <PreferencesPanelFooter>
          <LogoutButton onClick={logout}>
            <BodyText color="inherit" cursor="inherit">
              Logout
            </BodyText>
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
  return (
    <ColumnContainer>
      <PreferenceOption
        id="overlayMode"
        title="Overlay mode"
        description="Switch will display over other applications"
        type="toggle"
        value={false}
        onChange={console.log}
      />
    </ColumnContainer>
  );
};

const AccountPanel = (): ReactElement => {
  return (
    <ColumnContainer>
      <PreferenceOption
        id="updateAvatar"
        title="Update avatar"
        description="Update your profile avatar picture"
        type="text"
        value=""
        onChange={console.log}
      />
      <Spacer vertical={15} />
      <PreferenceOption
        id="changePassword"
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
  const preference = useRecoilValue(PreferenceState);
  const updatePreference = useUpdatePreference();

  return (
    <ColumnContainer>
      <PreferenceOption
        id="darkMode"
        title="Dark mode"
        description="Enable dark mode, does not affect any added applications"
        type="toggle"
        value={preference?.theme === 'dark' ?? true}
        onChange={(isDarkTheme) => updatePreference({ theme: isDarkTheme ? 'dark' : 'light' })}
      />
      <Spacer vertical={15} />
      <PreferenceOption
        id="animatePresets"
        title="Animate presets"
        description="Show an animation when resizing Switch using layout presets"
        type="toggle"
        value={false}
        onChange={console.log}
      />
    </ColumnContainer>
  );
};
