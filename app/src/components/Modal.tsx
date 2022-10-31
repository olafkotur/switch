import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactElement, useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { SIDE_BAR_WIDTH_PX } from '../../../common/const';
import { Preferences } from '../modals/Preferences';
import { ModalState } from '../state';

export type ModalName = 'preferences';

const Backdrop = styled(motion.div)`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: ${(props) => props.theme.zIndex.backdrop};
`;

const ModalContainer = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: ${(props) => props.theme.backgroundColor.secondary};
  padding: ${(props) => props.theme.spacing.large};
  border-radius: ${(props) => props.theme.borderRadius.small};
  margin: 0 0 0 ${SIDE_BAR_WIDTH_PX}px;
  z-index: ${(props) => props.theme.zIndex.modal};
`;

interface Props {}

export const Modal = ({}: Props): ReactElement => {
  const [modal, setModal] = useRecoilState(ModalState);

  const onDismiss = useCallback(() => {
    setModal(null);
  }, [setModal]);

  if (modal == null) return <></>;

  return (
    <AnimatePresence>
      <Backdrop
        className="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={onDismiss}
      >
        <ModalContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <ModalContent />
        </ModalContainer>
      </Backdrop>
    </AnimatePresence>
  );
};

const ModalContent = (): ReactElement => {
  const modal = useRecoilValue(ModalState);
  if (modal === 'preferences') {
    return <Preferences />;
  }
  return <></>;
};
