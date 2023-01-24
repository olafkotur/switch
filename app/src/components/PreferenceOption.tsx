import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { ColumnContainer, Spacer } from './Common';
import { ToggleInput } from './Input';
import { BodyText, SubtitleText } from './Text';

interface PreferenceOptionProps {
  title: string;
  description: string;
  type: 'toggle' | 'text';
  onChange: () => void;
}

const PreferenceOptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const PreferenceOption = ({ title, description, type, onChange }: PreferenceOptionProps): ReactElement => {
  return (
    <PreferenceOptionContainer>
      <ColumnContainer>
        <SubtitleText>{title}</SubtitleText>
        <Spacer vertical={2} />
        <BodyText faint>{description}</BodyText>
      </ColumnContainer>
    </PreferenceOptionContainer>
  );
};
