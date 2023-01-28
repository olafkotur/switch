import React, { ReactElement, useCallback } from 'react';
import styled from 'styled-components';
import { useToast } from '../hooks';
import { ColumnContainer, Spacer } from './Common';
import { CheckBoxInput } from './Input';
import { BodyText, SubtitleText } from './Text';

interface PreferenceOptionProps {
  title: string;
  description: string;
  type: 'toggle' | 'text';
  value: boolean | string;
  onChange: (value: boolean | string) => void;
  requiresRestart?: boolean;
}

const PreferenceOptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const PreferenceOption = ({
  title,
  description,
  type,
  value,
  onChange,
  requiresRestart,
}: PreferenceOptionProps): ReactElement => {
  const infoToast = useToast('info');

  const handleOnChange = useCallback(
    (value: boolean | string) => {
      if (requiresRestart) {
        infoToast('Please restart the app for the changes to take effect');
      }

      onChange(value);
    },
    [requiresRestart, onChange],
  );

  return (
    <PreferenceOptionContainer>
      <ColumnContainer>
        <SubtitleText>{title}</SubtitleText>
        <Spacer vertical={2} />
        <BodyText faint>{description}</BodyText>
      </ColumnContainer>
      {type === 'toggle' && <CheckBoxInput value={value as boolean} onChange={handleOnChange} />}
    </PreferenceOptionContainer>
  );
};
