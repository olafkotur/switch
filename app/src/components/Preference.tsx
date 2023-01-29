import React, { ReactElement, useCallback } from 'react';
import styled from 'styled-components';
import { useToast } from '../hooks';
import { ColumnContainer, Spacer } from './Common';
import { IconNames } from './Icon';
import { ButtonInput, CheckBoxInput } from './Input';
import { LargeText, MediumText } from './Text';

interface PreferenceProps {
  title: string;
  type: 'toggle' | 'button';
  value?: boolean;
  description?: string;
  requiresRestart?: boolean;
  icon?: { name: IconNames; color: string };
  onClick?: () => void;
  onChange?: (value: boolean) => void;
}

const PreferenceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: ${(props) => props.theme.spacing.medium} 0;
`;

export const Preference = ({
  title,
  type,
  value,
  description,
  requiresRestart,
  icon,
  onClick,
  onChange,
}: PreferenceProps): ReactElement => {
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
    <PreferenceContainer>
      <ColumnContainer>
        <LargeText>{title}</LargeText>
        <Spacer vertical={2} />
        {description && <MediumText faint>{description}</MediumText>}
      </ColumnContainer>
      {type === 'toggle' && <CheckBoxInput value={value as boolean} onChange={handleOnChange} />}
      {type === 'button' && icon && onClick && <ButtonInput name={icon.name} color={icon.color} onClick={onClick} />}
    </PreferenceContainer>
  );
};
