import React, { ReactElement } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { MAX_PAGE_WIDTH } from '../const';
import { ModalState } from '../state';
import { ModalName } from '../typings';
import { Button } from './Button';
import { Spacer } from './Common';
import { MediumText } from './Text';

const FooterContainer = styled.div`
  position: fixed;
  display: flex;
  height: 30px;
  align-items: center;
  user-select: none;
  justify-content: center;
  width: 100%;
  max-width: ${MAX_PAGE_WIDTH}px;
  bottom: ${(props) => props.theme.spacing.medium};
`;

export const Footer = (): ReactElement => {
  const setModal = useSetRecoilState(ModalState);

  return (
    <FooterContainer>
      <Button onClick={() => setModal(ModalName.PRIVACY)}>
        <MediumText cursor="pointer">Privacy</MediumText>
      </Button>
      <Spacer horizontal={5} />

      <Button onClick={() => setModal(ModalName.TERMS)}>
        <MediumText cursor="pointer">Terms</MediumText>
      </Button>
    </FooterContainer>
  );
};
