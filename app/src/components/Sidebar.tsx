import React, { ReactElement, useCallback, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { SIDE_BAR_WIDTH } from '../const';
import { useTheme } from '../hooks';
import { ActiveModuleIdState, IsFullScreenState, ModalState, ModulesState, WindowSetupState } from '../state';
import { Rotate } from '../style/animation';
import { Module } from '../typings';
import { IconButton, SidebarButton } from './Button';
import { ModuleIcon, Spacer } from './Common';
import { Controls } from './Controls';
import { Icon, IconNames } from './Icon';

const SidebarContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  width: ${SIDE_BAR_WIDTH}px;
  padding: ${(props) => props.theme.spacing.medium} 0;
  background: ${(props) => props.theme.backgroundColor.secondary};
  z-index: ${(props) => props.theme.zIndex.sidebar};
`;

const SidebarTop = styled.div`
  height: 100%;
  overflow: scroll;
`;

const SidebarBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.spacing.veryLarge};
`;

export const Sidebar = (): ReactElement => {
  const modules = useRecoilValue(ModulesState);
  const isFullScreen = useRecoilValue(IsFullScreenState);
  const windowSetup = useRecoilValue(WindowSetupState);

  const isTrafficLightsShown = !isFullScreen && !windowSetup.overlayMode;

  return (
    <SidebarContainer>
      {isTrafficLightsShown && <Spacer vertical={10} />}

      <SidebarTop>
        {modules.map((module) => (
          <ModuleButton key={`module-${module._id}`} {...module} />
        ))}
        <CreateModuleButton />
      </SidebarTop>

      <SidebarBottom>
        <PreferencesButton />
      </SidebarBottom>
    </SidebarContainer>
  );
};

const ModuleButton = ({ _id, icon }: Module): ReactElement => {
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const [activeModuleId, setActiveModuleId] = useRecoilState(ActiveModuleIdState);
  const theme = useTheme();

  const isActive = activeModuleId === _id;
  const showControls = isControlsVisible && activeModuleId === _id;

  const handleOnClick = useCallback(() => {
    if (isActive) {
      return setIsControlsVisible(true);
    }
    setActiveModuleId(_id);
  }, [isActive, _id, setActiveModuleId]);

  return (
    <>
      <Controls _id={_id} icon={icon} isVisible={showControls} setVisible={setIsControlsVisible} />
      <SidebarButton
        bg={isActive ? theme.backgroundColor.module : undefined}
        onClick={handleOnClick}
        onContextMenu={handleOnClick}
      >
        <ModuleIcon src={icon} draggable={false} />
      </SidebarButton>
    </>
  );
};

const CreateModuleButton = (): ReactElement => {
  const [activeModuleId, setActiveModuleId] = useRecoilState(ActiveModuleIdState);
  const theme = useTheme();

  const isActive = activeModuleId === null;
  const animation = isActive ? Rotate({ repeat: 0, degrees: 90, duration: 0.3 }) : undefined;

  return (
    <SidebarButton onClick={() => setActiveModuleId(null)} bg={isActive ? theme.backgroundColor.module : undefined}>
      <Icon name={IconNames.ADD} size={20} animation={animation} />
    </SidebarButton>
  );
};

const PreferencesButton = (): ReactElement => {
  const [modal, setModal] = useRecoilState(ModalState);
  const theme = useTheme();

  const isActive = modal === 'preferences';
  const animation = isActive ? Rotate({ duration: 2 }) : undefined;

  return (
    <SidebarButton onClick={() => setModal('preferences')} bg={isActive ? theme.backgroundColor.module : undefined}>
      <Icon name={IconNames.SETTINGS} size={20} animation={animation} />
    </SidebarButton>
  );
};
