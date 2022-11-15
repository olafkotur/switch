import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { LargeButton, SmallText, Spacer, SubtitleText } from '../components';
import { Search } from '../icons';
import { Divider } from './Divider';

const SearchBarContainer = styled.div`
  display: flex;
  width: 70%;
  height: 50px;
  justify-content: space-between;
  background: ${(props) => props.theme.backgroundColor.faint};
  padding: ${(props) => props.theme.spacing.medium};
  border-radius: ${(props) => props.theme.spacing.large};
  color: ${(props) => props.theme.color.inverted};
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

export const SearchBar = (): ReactElement => {
  return (
    <SearchBarContainer>
      <LeftSection>
        <Spacer x={7} />
        <Search />
        <Divider height={40} />
        <SubtitleText>enter full URL:</SubtitleText>
        <Spacer x={3} />
        <SubtitleText faint>e.g. https://notion.so</SubtitleText>
      </LeftSection>

      <LargeButton>
        <SmallText bold color="inherit">
          Add
        </SmallText>
      </LargeButton>
    </SearchBarContainer>
  );
};
