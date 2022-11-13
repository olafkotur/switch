import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { SIDE_BAR_WIDTH_PX } from '../../../common/const';

const HomeContainer = styled.div`
  width: calc(100vw - ${SIDE_BAR_WIDTH_PX}px);
  padding: 0 0 0 ${SIDE_BAR_WIDTH_PX}px;
  background: ${(props) => props.theme.backgroundColor.primary};
`;

export const HomePage = (): ReactElement => {
  return <HomeContainer>Home Screen</HomeContainer>;
};
