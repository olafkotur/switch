import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { SIDE_BAR_WIDTH_PX } from '../../../common/const';
import { SearchBar } from '../components';

const switchIcon = require('../../assets/switch-header.svg');

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: calc(100vw - ${SIDE_BAR_WIDTH_PX}px);
  padding: 0 0 0 ${SIDE_BAR_WIDTH_PX}px;
  background: ${(props) => props.theme.backgroundColor.primary};
`;

const Header = styled.img`
  margin-bottom: 75px;
`;

export const HomePage = (): ReactElement => {
  return (
    <HomeContainer>
      <Header src={switchIcon} />
      <SearchBar />
    </HomeContainer>
  );
};
