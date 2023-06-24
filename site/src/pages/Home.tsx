import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { LargeText, Spacer, VeryLargeText, Download } from '../components';

const HomePageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const HomePage = (): ReactElement => {
  return (
    <HomePageContainer>
      <Spacer vertical={30} />
      <VeryLargeText>Lightweight Browser</VeryLargeText>
      <Spacer vertical={5} />
      <LargeText faint>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</LargeText>
      <Spacer vertical={15} />

      <Download expanded />
    </HomePageContainer>
  );
};
