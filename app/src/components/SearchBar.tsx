import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { Input, LargeButton, SmallText, Spacer, SubtitleText } from '../components';
import { SEARCH_BAR_PLACEHOLDER } from '../const';
import { Search } from '../icons';
import { Divider } from './Divider';

interface SearchBarProps {
  value: string;
  setValue: (value: string) => void;
  onSubmit: (value: string) => Promise<void>;
}

const SearchBarContainer = styled.div`
  display: flex;
  width: 70%;
  height: 50px;
  background: ${(props) => props.theme.backgroundColor.faint};
  padding: ${(props) => props.theme.spacing.medium};
  border-radius: ${(props) => props.theme.spacing.large};
  color: ${(props) => props.theme.color.inverted};
`;

const SearchBarInputContainer = styled.div`
  min-width: 122px;
`;

const SearchBarInput = styled(Input)`
  width: 100%;
  margin-bottom: 2px;
  font-size: ${(props) => props.theme.fontSize.large};
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const SearchBar = ({ value, setValue, onSubmit }: SearchBarProps): ReactElement => {
  return (
    <SearchBarContainer>
      <LeftSection>
        <Spacer horizontal={7} />
        <Search size={20} />
        <Divider height={40} />
        <SearchBarInputContainer>
          <SubtitleText>enter full URL:</SubtitleText>
        </SearchBarInputContainer>
        <SearchBarInput placeholder={SEARCH_BAR_PLACEHOLDER} value={value} onChange={(e) => setValue(e.target.value)} />
        <Spacer horizontal={7} />
      </LeftSection>

      <LargeButton onClick={() => onSubmit(value)} disabled={!value}>
        <SmallText bold color="inherit">
          Add
        </SmallText>
      </LargeButton>
    </SearchBarContainer>
  );
};
