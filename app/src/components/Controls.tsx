import { WebviewTag } from 'electron';
import { motion } from 'framer-motion';
import React, { ReactElement, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { useDeleteModule, useOnClickout, useTheme } from '../hooks';
import { Back, Close, Delete, Forward, Reload } from '../icons';
import { ActiveModuleIdState, IsControlsVisibleState } from '../state';
import { Button, SidebarButton } from './Button';
import { ModuleIcon } from './Common';

const ControlsContainer = styled(motion.div)`
  position: absolute;
  align-items: center;
  flex-direction: row;
  height: 50px;
  width: 175px;
  overflow: visible;
  z-index: ${(props) => props.theme.zIndex.controls};
  background: ${(props) => props.theme.backgroundColor.primary};
  border-radius: ${(props) => props.theme.borderRadius.small};
`;

const ControlsButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  width: 115px;
  filter: drop-shadow(${(props) => props.theme.dropShadow.medium});
`;

export const Controls = ({ _id, icon, isVisible }: { _id: string; icon: string; isVisible: boolean }): ReactElement => {
  const activeModuleId = useRecoilValue(ActiveModuleIdState);
  const setIsControlsVisible = useSetRecoilState(IsControlsVisibleState);

  const ref = useRef<HTMLDivElement>(null);
  const webview = document.getElementById(`webview-${activeModuleId}`) as WebviewTag | null;
  const theme = useTheme();
  const deleteModule = useDeleteModule();

  useOnClickout([ref], () => {
    isVisible && setIsControlsVisible(false);
  });

  return (
    <ControlsContainer initial={{ display: 'none' }} animate={{ display: isVisible ? 'flex' : 'none' }} ref={ref}>
      <SidebarButton>
        <ModuleIcon src={icon} draggable={false} />
      </SidebarButton>

      <ControlsButtonContainer>
        <Button onClick={() => webview?.goBack()}>
          <Back size={24} />
        </Button>
        <Button onClick={() => webview?.goForward()}>
          <Forward size={24} />
        </Button>
        <Button onClick={() => webview?.reload()}>
          <Reload size={24} />
        </Button>
        <Button onClick={() => deleteModule(_id)}>
          <Delete size={24} color={theme.color.danger} />
        </Button>
      </ControlsButtonContainer>
    </ControlsContainer>
  );
};
