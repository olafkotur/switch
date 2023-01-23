import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Bg } from '../components';

const BackgroundContainer = styled.div`
  position: absolute;
  background: #000;
  width: 100vw;
  height: 100vh;
  opacity: 0.2;
  z-index: ${(props) => props.theme.zIndex.background};
`;

const BackgroundImage = styled.div`
  width: 100vw;
  height: 100vh;
  opacity: 0.1;
  background-repeat: repeat;
  background-image: url(${Bg});
`;

export const Background = (): ReactElement => {
  return (
    <BackgroundContainer>
      <BackgroundImage />
    </BackgroundContainer>
  );
};
