import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useToast } from '../hooks';
import { ColumnContainer, Spacer } from './Common';
import { ToggleInput } from './Input';
import { BodyText, SubtitleText } from './Text';

interface PreferenceOptionProps {
  id: string;
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
  width: 100%;
`;

export const PreferenceOption = ({
  id,
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
      {type === 'toggle' && <ToggleInput id={id} value={value as boolean} onChange={handleOnChange} />}
      <ColumnContainer>
        <SubtitleText>{title}</SubtitleText>
        <Spacer vertical={2} />
        <BodyText faint>{description}</BodyText>
      </ColumnContainer>
    </PreferenceOptionContainer>
  );
};
