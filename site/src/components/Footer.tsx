import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Spacer } from './Common';
import { SmallText } from './Text';

const FooterContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 30px;
  justify-content: center;
  align-items: center;
  bottom: ${(props) => props.theme.spacing.medium};
`;

export const Footer = (): ReactElement => {
  return (
    <FooterContainer>
      <SmallText>Made with ❤️</SmallText>
      <Spacer horizontal={5} />

      <SmallText>Privacy</SmallText>
      <Spacer horizontal={5} />

      <SmallText>Terms</SmallText>
    </FooterContainer>
  );
};
