import { motion } from 'framer-motion';
import React, { ReactElement, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { ModalState } from '../state';
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
  z-index: ${(props) => props.theme.zIndex.modal};
  background: ${(props) => props.theme.backgroundColor.tertiary};
  border-radius: ${(props) => props.theme.borderRadius.large};
`;

export const Modal = (): ReactElement => {
  const [modal, setModal] = useRecoilState(ModalState);

  const onDismiss = useCallback(() => {
    setModal(null);
  }, [setModal]);

  if (modal == null) return <></>;

  return (
    <ModalContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <ModalBackdrop onClick={onDismiss} />
      <ModalContent>{modal === 'preferences' && <Preferences />}</ModalContent>
    </ModalContainer>
  );
};