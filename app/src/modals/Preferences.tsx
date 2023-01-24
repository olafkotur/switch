import React, { ReactElement, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Button, ColumnContainer, PreferenceOption, Spacer, SubtitleText } from '../components';
import { useLogout, useTheme } from '../hooks';

type PreferencesPanel = 'general' | 'account' | 'appearance';

const PreferencesContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 50vw;
  height: 50vh;
  position: relative;
`;

const PreferencesPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  height: calc(100% - 40px);
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
  bottom: 0;
`;

export const Preferences = (): ReactElement => {
  const [selectedPanel, setSelectedPanel] = useState<PreferencesPanel>('general');

  const theme = useTheme();
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
          <PreferencesButton onClick={logout}>
            <SubtitleText color={theme.color.danger} cursor="pointer">
              Logout
            </SubtitleText>
          </PreferencesButton>
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
        title="Overlay Mode"
        description="Switch will display over other applications"
        type="toggle"
        onChange={console.log}
      />
    </ColumnContainer>
  );
};

const AccountPanel = (): ReactElement => {
  return (
    <ColumnContainer>
      <PreferenceOption
        title="Update avatar"
        description="Update your profile avatar picture"
        type="text"
        onChange={console.log}
      />
      <Spacer vertical={15} />
      <PreferenceOption
        title="Change password"
        description="Update your current password"
        type="text"
        onChange={console.log}
      />
    </ColumnContainer>
  );
};

const AppearancePanel = (): ReactElement => {
  return (
    <ColumnContainer>
      <PreferenceOption
        title="Animate Presets"
        description="Show an animation when resizing Switch using layout presets"
        type="toggle"
        onChange={console.log}
      />
    </ColumnContainer>
  );
};
