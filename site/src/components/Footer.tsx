import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useNavigate } from '../hooks';
import { Button } from './Button';
import { Spacer } from './Common';
import { MediumText } from './Text';

const FooterContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 30px;
  justify-content: center;
  align-items: center;
  user-select: none;
  bottom: ${(props) => props.theme.spacing.medium};
`;

export const Footer = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <FooterContainer>
      <MediumText>Made with ❤️</MediumText>
      <Spacer horizontal={5} />

      <Button onClick={() => navigate('/privacy')}>
        <MediumText cursor="pointer">Privacy</MediumText>
      </Button>
      <Spacer horizontal={5} />

      <Button onClick={() => navigate('/terms')}>
        <MediumText cursor="pointer">Terms</MediumText>
      </Button>
    </FooterContainer>
  );
};
