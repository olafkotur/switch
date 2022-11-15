import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { SubtitleText } from '../components';

const PreferencesContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 600px;
  height: 600px;
`;

const PreferencesPanel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 150px;
  background: red;
`;

const PreferencesContent = styled.div`
  height: 100%;
  width: 450px;
  background: green;
`;

export const Preferences = (): ReactElement => {
  return (
    <PreferencesContainer>
      <PreferencesPanel>
        <SubtitleText>General</SubtitleText>
        <SubtitleText>Appearance</SubtitleText>
        <SubtitleText>Layout</SubtitleText>
        <SubtitleText>Account</SubtitleText>
      </PreferencesPanel>

      <PreferencesContent></PreferencesContent>
    </PreferencesContainer>
  );
};
