import { WebviewTag } from 'electron';
import { motion } from 'framer-motion';
import React, { ReactElement, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { SIDE_BAR_WIDTH } from '../const';
import { useClipboardCopy, useDeleteModule, useTheme } from '../hooks';
import { Back, Close, Forward, Reload } from '../icons';
import { ActiveModuleIdState } from '../state';
import { Module } from '../typings';
import { IconButton } from './Button';
import { RowContainer, SpaceBetweenContainer, Spacer } from './Common';
import { SmallText } from './Text';

const ControlsContainer = styled(RowContainer)`
  position: relative;
  width: calc(100vw - ${SIDE_BAR_WIDTH}px);
`;

const ControlsHiddenBox = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 5px;
`;

const ControlsAnimated = styled(motion.div)`
  display: flex;
  position: absolute;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  height: 35px;
  width: calc(100% - 30px);
  border-bottom-left-radius: ${(props) => props.theme.borderRadius.medium};
  border-bottom-right-radius: ${(props) => props.theme.borderRadius.medium};
  background: ${(props) => props.theme.backgroundColor.secondary};
  padding: 0 ${(props) => props.theme.spacing.large};
  filter: drop-shadow(${(props) => props.theme.dropShadow.medium});
  z-index: ${(props) => props.theme.zIndex.controls};
`;

const ButtonsContainer = styled(SpaceBetweenContainer)`
  width: 100px;
`;

const ModuleIcon = styled.img`
  width: 18px;
  height: 18px;
  border-radius: ${(props) => props.theme.borderRadius.small};
`;

const ModuleUrl = styled(SmallText)`
  width: calc(100vw - ${SIDE_BAR_WIDTH}px - 185px);
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 2px ${(props) => props.theme.spacing.medium};
  background: ${(props) => props.theme.backgroundColor.primary};
  border-radius: ${(props) => props.theme.borderRadius.small};
`;

export const NavigationBar = ({ module }: { module: Module }): ReactElement => {
  const [isVisible, setIsVisible] = useState(false);

  const activeModuleId = useRecoilValue(ActiveModuleIdState);
  const webview = document.getElementById(`webview-${activeModuleId}`) as WebviewTag | null;
  const theme = useTheme();
  const deleteModule = useDeleteModule();
  const clipboardCopy = useClipboardCopy();

  useEffect(() => {
    const handler = () => setIsVisible(false);
    webview?.addEventListener('mouseenter', handler);
    return () => {
      webview?.removeEventListener('mouseenter', handler);
    };
  }, [webview]);

  return (
    <ControlsContainer>
      <ControlsHiddenBox onMouseEnter={() => setIsVisible(true)} />
      <ControlsAnimated initial={{ top: -50 }} animate={{ top: isVisible ? 0 : -50 }}>
        <RowContainer>
          <ModuleIcon src={module.icon} />
          <Spacer horizontal={3} />
          <ModuleUrl faint onClick={() => clipboardCopy(module.url)}>
            {module.url}
          </ModuleUrl>
        </RowContainer>
        <ButtonsContainer>
          <IconButton noMargin size="medium" onClick={() => webview?.goBack()}>
            <Back />
          </IconButton>

          <IconButton noMargin size="medium" onClick={() => webview?.goForward()}>
            <Forward />
          </IconButton>

          <IconButton noMargin size="medium" onClick={() => webview?.reload()}>
            <Reload />
          </IconButton>

          <IconButton noMargin size="medium" onClick={() => deleteModule(module._id)}>
            <Close color={theme.color.danger} />
          </IconButton>
        </ButtonsContainer>
      </ControlsAnimated>
    </ControlsContainer>
  );
};
