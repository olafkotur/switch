import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Spacer } from './Common';
import { MediumText } from './Text';

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
      <MediumText>Made with ❤️</MediumText>
      <Spacer horizontal={5} />

      <MediumText>Privacy</MediumText>
      <Spacer horizontal={5} />

      <MediumText>Terms</MediumText>
    </FooterContainer>
  );
};
