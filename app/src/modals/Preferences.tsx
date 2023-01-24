import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { Button, LargeButton, Spacer, SubtitleText } from '../components';

type PreferencesPanel = 'general' | 'account' | 'appearance';

const PreferencesContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 600px;
  height: 600px;
  position: relative;
  background: ${(props) => props.theme.backgroundColor.secondary};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing.veryLarge};
`;

const PreferencesPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 150px;
  padding: 0 ${(props) => props.theme.spacing.large};
`;

const PreferencesButton = styled(Button)`
  width: 100%;
`;

const PreferencesContent = styled.div`
  height: 100%;
  width: 450px;
`;

export const Preferences = (): ReactElement => {
  const [selectedPanel, setSelectedPanel] = useState<PreferencesPanel>('general');

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
