import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { Button, Spacer, SubtitleText } from '../components';
import { useLogout, useTheme } from '../hooks';

type PreferencesPanel = 'general' | 'account' | 'appearance';

const PreferencesContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 70vw;
  height: 70vh;
  position: relative;
  background: ${(props) => props.theme.backgroundColor.primary};
  border-radius: ${(props) => props.theme.borderRadius.medium};
`;

const PreferencesPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  height: calc(100% - 40px);
  padding: ${(props) => props.theme.spacing.veryLarge};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  background: ${(props) => props.theme.backgroundColor.secondary};
`;

const PreferencesButton = styled(Button)`
  width: 100%;
`;

const PreferencesContent = styled.div`
  width: calc(70vw - 150px);
  height: calc(100% - 40px);
  padding: ${(props) => props.theme.spacing.veryLarge};
  background: ${(props) => props.theme.backgroundColor.primary};
  border-radius: 0 ${(props) => props.theme.borderRadius.medium} ${(props) => props.theme.borderRadius.medium} 0;
`;

const PreferencesPanelFooter = styled.div`
  position: absolute;
  bottom: ${(props) => props.theme.spacing.veryLarge};
`;

export const Preferences = (): ReactElement => {
  const [selectedPanel, setSelectedPanel] = useState<PreferencesPanel>('general');

  const theme = useTheme();
  const logout = useLogout();

  return (
    <PreferencesContainer>
      <PreferencesPanelContainer>
        <PreferencesButton onClick={() => setSelectedPanel('general')}>
          <SubtitleText faint={selectedPanel !== 'general'}>General</SubtitleText>
        </PreferencesButton>
        <Spacer vertical={10} />
        <PreferencesButton onClick={() => setSelectedPanel('account')}>
          <SubtitleText faint={selectedPanel !== 'account'}>Account</SubtitleText>
        </PreferencesButton>
        <Spacer vertical={10} />
        <PreferencesButton onClick={() => setSelectedPanel('appearance')}>
          <SubtitleText faint={selectedPanel !== 'appearance'}>Appearance</SubtitleText>
        </PreferencesButton>

        <PreferencesPanelFooter>
          <PreferencesButton onClick={logout}>
            <SubtitleText color={theme.color.danger}>Logout</SubtitleText>
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
  return <>General Panel</>;
};

const AccountPanel = (): ReactElement => {
  return <>Account Panel</>;
};

const AppearancePanel = (): ReactElement => {
  return <>Appearance Panel</>;
};
