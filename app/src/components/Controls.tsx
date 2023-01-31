import { motion } from 'framer-motion';
import React, { ReactElement, useMemo, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useDeleteModule, useOnClickout, useTheme } from '../hooks';
import { ActiveModuleIdState } from '../state';
import { Visibility } from '../style/animation';
import { WebView } from '../typings';
import { Button, SidebarButton } from './Button';
import { ModuleIcon, Spacer } from './Common';
import { Icon, IconNames } from './Icon';

interface ControlsProps {
  _id: string;
  icon: string;
  isVisible: boolean;
  setVisible: (value: boolean) => void;
}

const ControlsContainer = styled(motion.div)`
  position: absolute;
  align-items: center;
  flex-direction: row;
  height: 50px;
  width: 180px;
  overflow: visible;
  z-index: ${(props) => props.theme.zIndex.controls};
  background: ${(props) => props.theme.backgroundColor.primary};
  border-radius: ${(props) => props.theme.borderRadius.medium};
`;

const ControlsButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 115px;
  filter: drop-shadow(${(props) => props.theme.dropShadow.medium});
`;

export const Controls = ({ _id, icon, isVisible, setVisible }: ControlsProps): ReactElement => {
  const activeModuleId = useRecoilValue(ActiveModuleIdState);

  const ref = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const deleteModule = useDeleteModule();

  const webview = useMemo(() => {
    return document.getElementById(`webview-${activeModuleId}`) as WebView | null;
  }, [activeModuleId]);

  useOnClickout([ref], () => {
    isVisible && setVisible(false);
  });

  return (
    <ControlsContainer ref={ref} {...Visibility({ isVisible })}>
      <SidebarButton onClick={() => setVisible(false)}>
        <ModuleIcon src={icon} draggable={false} />
      </SidebarButton>

      <Spacer horizontal={1} />

      <ControlsButtonContainer>
        <Button onClick={() => webview?.goBack()} disabled={!webview}>
          <Icon name={IconNames.BACK} />
        </Button>
        <Button onClick={() => webview?.goForward()} disabled={!webview}>
          <Icon name={IconNames.FORWARD} />
        </Button>
        <Button onClick={() => webview?.reload()} disabled={!webview}>
          <Icon name={IconNames.RELOAD} size={17} />
        </Button>
        <Button onClick={() => deleteModule(_id)}>
          <Icon name={IconNames.DELETE} color={theme.color.danger} size={17} />
        </Button>
      </ControlsButtonContainer>
    </ControlsContainer>
  );
};
