import React, { ReactElement } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { SIDE_BAR_WIDTH } from '../const';
import { Settings, Switch } from '../icons';
import { ActiveModuleIdState, GroupModuleState, ModalState, ThemeState } from '../state';
import { Module } from '../typings';
import { Button, IconButton } from './Button';
import { Spacer } from './Common';

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

const ButtonContainer = styled(Button)<{ background?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: ${(props) => props.theme.borderRadius.small};
  background: ${({ background }) => background};
`;

const HomeButton = (): ReactElement => {
  const [activeModuleId, setActiveModuleId] = useRecoilState(ActiveModuleIdState);

  const isActive = activeModuleId === null;

  return (
    <ButtonContainer onClick={() => setActiveModuleId(null)}>
      <Switch isActive={isActive} />
    </ButtonContainer>
  );
};

const ModuleButton = ({ id, favicon }: Module): ReactElement => {
  const [activeModuleId, setActiveModuleId] = useRecoilState(ActiveModuleIdState);
  const theme = useRecoilValue(ThemeState);

  const isActive = activeModuleId === id;
  const background = theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';

  return (
    <ButtonContainer
      onClick={() => setActiveModuleId(id)}
      background={isActive ? background : undefined}
    >
      <img src={favicon} width="70%" draggable={false} />
    </ButtonContainer>
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
  const group = useRecoilValue(GroupModuleState);

  return (
    <SidebarContainer>
      <Spacer vertical={10} />
      <HomeButton />
      <Spacer vertical={2} />

      <SidebarTop>
        {group.map((module) => (
          <ModuleButton key={`module-${module.id}`} {...module} />
        ))}
      </SidebarTop>

      <SidebarBottom>
        <PreferencesButton />
      </SidebarBottom>
    </SidebarContainer>
  );
};
