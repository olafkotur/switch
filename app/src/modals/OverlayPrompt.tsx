import React, { ReactElement, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
  CommandKey,
  EscapeKey,
  Icon,
  IconNames,
  LargeText,
  MediumText,
  Preference,
  RowContainer,
  SpaceBetweenContainer,
  Spacer,
} from '../components';
import { useUpdatePreferences } from '../hooks';
import { PreferencesState } from '../state';

const OverlayPromptContainer = styled.div`
  width: 450px;
`;

const OverlayPromptContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: scroll;
`;

const DescriptionContainer = styled.div`
  width: calc(100% - 30px);
  padding: ${(props) => props.theme.spacing.large};
  background: ${(props) => props.theme.backgroundColor.primary};
  border-radius: ${(props) => props.theme.borderRadius.medium};
`;

export const OverlayPrompt = (): ReactElement => {
  const preferences = useRecoilValue(PreferencesState);

  const updatePreferences = useUpdatePreferences();

  const handleOverlayMode = useCallback(
    async (value: boolean) => {
      return updatePreferences({ disableOverlayPrompt: value });
    },
    [updatePreferences],
  );

  return (
    <OverlayPromptContainer>
      <OverlayPromptContent>
        <LargeText faint>Overlay Mode</LargeText>

        <Spacer vertical={5} />
        <DescriptionContainer>
          <MediumText>
            You've launched in overlay mode. By default, Switch will display over other applications even in full
            screen. You can turn this off at any time in your preferences.
          </MediumText>

          <Spacer vertical={10} />

          <SpaceBetweenContainer>
            <MediumText>You can toggle the window visiblity using a keybind.</MediumText>
            <RowContainer>
              <CommandKey />
              <Spacer horizontal={5} />
              <Icon name={IconNames.ADD} />
              <Spacer horizontal={5} />
              <EscapeKey />
            </RowContainer>
          </SpaceBetweenContainer>
        </DescriptionContainer>

        <Spacer vertical={10} />

        <Preference
          title="Don't show again"
          description="This message will never show again"
          type="toggle"
          value={preferences?.disableOverlayPrompt ?? false}
          onChange={handleOverlayMode}
        />
      </OverlayPromptContent>
    </OverlayPromptContainer>
  );
};
