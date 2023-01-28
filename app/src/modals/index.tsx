import { motion } from 'framer-motion';
import React, { ReactElement, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Icon, IconButton, IconNames } from '../components';
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
  background: transparent;
  z-index: ${(props) => props.theme.zIndex.modal};
  border-radius: ${(props) => props.theme.borderRadius.large};
  filter: drop-shadow(${(props) => props.theme.dropShadow.medium});
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: ${(props) => props.theme.zIndex.modal + 1};
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
      <ModalContent>
        <CloseButton onClick={onDismiss} size="large">
          <Icon name={IconNames.CLOSE} />
        </CloseButton>
        {modal === 'preferences' && <Preferences />}
      </ModalContent>
    </ModalContainer>
  );
};
