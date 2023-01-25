import React, { ReactElement, useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { SIDE_BAR_WIDTH } from '../const';
import { Add, Settings } from '../icons';
import { ActiveModuleIdState, IsControlsVisibleState, ModalState, ModulesState, ThemeState } from '../state';
import { Module } from '../typings';
import { Button, IconButton, SidebarButton } from './Button';
import { ModuleIcon, Spacer } from './Common';
import { Controls } from './Controls';

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
  margin-bottom: ${(props) => props.theme.spacing.medium};
`;

const ModuleButton = ({ _id, icon }: Module): ReactElement => {
  const [activeModuleId, setActiveModuleId] = useRecoilState(ActiveModuleIdState);
  const theme = useRecoilValue(ThemeState);
  const [isControlsVisible, setIsControlsVisible] = useRecoilState(IsControlsVisibleState);

  const isActive = activeModuleId === _id;
  const showControls = isControlsVisible && activeModuleId === _id;
  const background = theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';

  const handleOnClick = useCallback(() => {
    if (isActive) {
      return setIsControlsVisible(true);
    }
    setActiveModuleId(_id);
  }, [isActive, _id, setActiveModuleId]);

  return (
    <>
      <Controls _id={_id} icon={icon} isVisible={showControls} />
      <SidebarButton onClick={handleOnClick} bg={isActive ? background : undefined} opacity={showControls ? 0 : 1}>
        <ModuleIcon src={icon} draggable={false} />
      </SidebarButton>
    </>
  );
};

const CreateModuleButton = (): ReactElement => {
  const [activeModuleId, setActiveModuleId] = useRecoilState(ActiveModuleIdState);
  const theme = useRecoilValue(ThemeState);

  const isActive = activeModuleId === null;
  const background = theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';

  return (
    <SidebarButton onClick={() => setActiveModuleId(null)} bg={isActive ? background : undefined}>
      <Add size={24} />
    </SidebarButton>
  );
};

const PreferencesButton = (): ReactElement => {
  const setModal = useSetRecoilState(ModalState);

  return (
    <IconButton onClick={() => setModal('preferences')} size="large">
      <Settings size={24} />
    </IconButton>
  );
};

export const Sidebar = (): ReactElement => {
  const modules = useRecoilValue(ModulesState);

  return (
    <SidebarContainer>
      <Spacer vertical={10} />

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
