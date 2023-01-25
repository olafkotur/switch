import React, { ReactElement, useMemo, useState } from 'react';
import styled from 'styled-components';
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
}: PreferenceOptionProps): ReactElement => {
  return (
    <PreferenceOptionContainer>
      {type === 'toggle' && <ToggleInput id={id} value={value as boolean} onChange={onChange} />}
      <ColumnContainer>
        <SubtitleText>{title}</SubtitleText>
        <Spacer vertical={2} />
        <BodyText faint>{description}</BodyText>
      </ColumnContainer>
    </PreferenceOptionContainer>
  );
};
