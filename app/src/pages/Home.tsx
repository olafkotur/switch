import React, { ReactElement } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
  background: green;
`;

export const HomePage = (): ReactElement => {
  return <Container>Home</Container>;
};
