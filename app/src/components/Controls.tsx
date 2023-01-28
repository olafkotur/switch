import { WebviewTag } from 'electron';
import { motion } from 'framer-motion';
import React, { ReactElement, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { useDeleteModule, useOnClickout, useTheme } from '../hooks';
import { ActiveModuleIdState, IsControlsVisibleState } from '../state';
import { Button, SidebarButton } from './Button';
import { ModuleIcon } from './Common';
import { Icon, IconNames } from './Icon';

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
      <SidebarButton onClick={() => setIsControlsVisible(false)}>
        <ModuleIcon src={icon} draggable={false} />
      </SidebarButton>

      <ControlsButtonContainer>
        <Button onClick={() => webview?.goBack()}>
          <Icon name={IconNames.BACK} />
        </Button>
        <Button onClick={() => webview?.goForward()}>
          <Icon name={IconNames.FORWARD} />
        </Button>
        <Button onClick={() => webview?.reload()}>
          <Icon name={IconNames.RELOAD} size={17} />
        </Button>
        <Button onClick={() => deleteModule(_id)}>
          <Icon name={IconNames.DELETE} color={theme.color.danger} size={17} />
        </Button>
      </ControlsButtonContainer>
    </ControlsContainer>
  );
};
