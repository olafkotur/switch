import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Header } from './Header';

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

export const Loader = (): ReactElement => {
  return (
    <LoaderContainer>
      <Header />
    </LoaderContainer>
  );
};
