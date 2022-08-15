import React, { ReactElement } from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  width: 100%;
  background: ${(props) => props.theme.backgroundColor.primary};
`;

export const HomePage = (): ReactElement => {
  return <HomeContainer>Home</HomeContainer>;
};
