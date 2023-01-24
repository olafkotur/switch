import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { SwitchHeader } from './Asset';

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vh;
  height: 100vw;
`;

export const Loader = (): ReactElement => {
  return (
    <LoaderContainer>
      <img src={SwitchHeader} />
    </LoaderContainer>
  );
};
