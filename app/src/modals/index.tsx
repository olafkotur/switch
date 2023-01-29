import { motion } from 'framer-motion';
import React, { ReactElement, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { ModalState } from '../state';
import { Fade } from '../style/animation';
import { Preferences } from './Preferences';

export type ModalName = 'preferences';

const ModalContainer = styled(motion.div)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: ${(props) => props.theme.zIndex.modal - 1};
`;

const ModalBackdrop = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: ${(props) => props.theme.backgroundColor.backdrop};
  z-index: ${(props) => props.theme.zIndex.backdrop};
`;

const ModalContent = styled.div`
  position: absolute;
  background: transparent;
  width: 50vw;
  height: 50vh;
  max-width: 800px;
  max-height: 600px;
  position: relative;
  z-index: ${(props) => props.theme.zIndex.modal};
  border-radius: ${(props) => props.theme.borderRadius.large};
  filter: drop-shadow(${(props) => props.theme.dropShadow.strong});
`;

export const Modal = (): ReactElement => {
  const [modal, setModal] = useRecoilState(ModalState);

  const onDismiss = useCallback(() => {
    setModal(null);
  }, [setModal]);

  if (modal == null) return <></>;

  return (
    <ModalContainer {...Fade({})}>
      <ModalBackdrop onClick={onDismiss} />
      <ModalContent>{modal === 'preferences' && <Preferences />}</ModalContent>
    </ModalContainer>
  );
};
