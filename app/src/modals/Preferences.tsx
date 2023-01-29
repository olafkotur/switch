import React, { ReactElement, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
  ButtonInput,
  CheckBoxInput,
  ColumnContainer,
  IconNames,
  LargeText,
  MediumText,
  Presets,
  Spacer,
} from '../components';
import { useLogout, useSendMessage, useTheme, useToast, useUpdatePreferences } from '../hooks';
import { PreferencesState } from '../state';

const PreferencesContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: ${(props) => props.theme.spacing.veryLarge};
  background: ${(props) => props.theme.backgroundColor.secondary};
  border-radius: ${(props) => props.theme.borderRadius.large};
`;

const PreferencesList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
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
      <PreferencesList>
        <LargeText>Window Presets</LargeText>
        <MediumText faint>Change the size of the window from the selected presets</MediumText>
        <Spacer vertical={5} />
        <Presets />
        <PreferenceOption
          title="Dark mode"
          description="Enable dark mode, does not affect any added applications"
          type="toggle"
          value={preferences?.theme === 'dark' ?? true}
          onChange={(value) => updatePreferences({ theme: value ? 'dark' : 'light' })}
        />
        <PreferenceOption
          title="Animate presets"
          description="Show an animation when resizing Switch using layout presets"
          type="toggle"
          value={preferences?.animatePresets ?? false}
          onChange={handleAnimatePresets}
        />
        <PreferenceOption
          requiresRestart
          title="Overlay mode"
          description="Switch will display over other applications"
          type="toggle"
          value={preferences?.overlayMode ?? false}
          onChange={handleOverlayMode}
        />
        <PreferenceOption
          requiresRestart
          title="Logout"
          description="Your changes are automatically saved"
          type="button"
          onClick={logout}
          icon={{ name: IconNames.FORWARD, color: theme.color.danger }}
        />
      </PreferencesList>
    </PreferencesContainer>
  );
};

interface PreferenceOptionProps {
  title: string;
  type: 'toggle' | 'button';
  value?: boolean;
  description?: string;
  requiresRestart?: boolean;
  icon?: { name: IconNames; color: string };
  onClick?: () => void;
  onChange?: (value: boolean) => void;
}

const PreferenceOptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: ${(props) => props.theme.spacing.medium} 0;
`;

const PreferenceOption = ({
  title,
  type,
  value,
  description,
  requiresRestart,
  icon,
  onClick,
  onChange,
}: PreferenceOptionProps): ReactElement => {
  const infoToast = useToast('info');

  const handleOnChange = useCallback(
    (value: boolean) => {
      if (requiresRestart) {
        infoToast('Please restart the app for the changes to take effect');
      }

      onChange?.(value);
    },
    [requiresRestart, onChange],
  );

  return (
    <PreferenceOptionContainer>
      <ColumnContainer>
        <LargeText>{title}</LargeText>
        <Spacer vertical={2} />
        {description && <MediumText faint>{description}</MediumText>}
      </ColumnContainer>
      {type === 'toggle' && <CheckBoxInput value={value as boolean} onChange={handleOnChange} />}
      {type === 'button' && icon && onClick && <ButtonInput name={icon.name} color={icon.color} onClick={onClick} />}
    </PreferenceOptionContainer>
  );
};
