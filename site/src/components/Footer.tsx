import React, { ReactElement } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { PageState } from '../state';
import { Pages } from '../typings';
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
  const setPage = useSetRecoilState(PageState);

  return (
    <FooterContainer>
      <MediumText>Made with ❤️</MediumText>
      <Spacer horizontal={5} />

      <Button onClick={() => setPage(Pages.PRIVACY)}>
        <MediumText cursor="pointer">Privacy</MediumText>
      </Button>
      <Spacer horizontal={5} />

      <Button onClick={() => setPage(Pages.TERMS)}>
        <MediumText cursor="pointer">Terms</MediumText>
      </Button>
    </FooterContainer>
  );
};
