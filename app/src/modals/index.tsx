import { motion } from 'framer-motion';
import React, { ReactElement, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Icon, IconButton, IconNames } from '../components';
import { useOnKeyPress } from '../hooks';
import { ModalState } from '../state';
import { Fade } from '../style/animation';
import { OverlayPrompt } from './OverlayPrompt';
import { Preferences } from './Preferences';

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
  border-radius: ${(props) => props.theme.borderRadius.large};
  filter: drop-shadow(${(props) => props.theme.dropShadow.strong});
  padding: ${(props) => props.theme.spacing.veryLarge};
  background: ${(props) => props.theme.backgroundColor.secondary};
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: ${(props) => props.theme.zIndex.modal};
  background: ${(props) => props.theme.backgroundColor.faint};
`;

export const Modal = (): ReactElement => {
  const [modal, setModal] = useRecoilState(ModalState);

  const onDismiss = useCallback(() => {
    setModal(null);
  }, [setModal]);

  useOnKeyPress({ key: 'Escape', onPress: onDismiss });

  if (modal == null) return <></>;

  return (
    <ModalContainer {...Fade({})}>
      <ModalBackdrop onClick={onDismiss} />
      <ModalContent>
        <CloseButton onClick={onDismiss} size="medium">
          <Icon name={IconNames.CLOSE} />
        </CloseButton>
        {modal === 'preferences' && <Preferences />}
        {modal === 'overlay-prompt' && <OverlayPrompt />}
      </ModalContent>
    </ModalContainer>
  );
};
