import React, { ReactElement } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { SIDE_BAR_WIDTH } from '../const';
import { Add, Settings, Switch } from '../icons';
import { ActiveModuleIdState, ModalState, ModulesState, ThemeState } from '../state';
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

const SwitchIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
`;

const ButtonContainer = styled(Button)<{ background?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: ${(props) => props.theme.borderRadius.small};
  background: ${({ background }) => background};
`;

const ModuleButton = ({ _id, icon }: Module): ReactElement => {
  const [activeModuleId, setActiveModuleId] = useRecoilState(ActiveModuleIdState);
  const theme = useRecoilValue(ThemeState);

  const isActive = activeModuleId === _id;
  const background = theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';

  return (
    <ButtonContainer onClick={() => setActiveModuleId(_id)} background={isActive ? background : undefined}>
      <img src={icon} width="60%" draggable={false} />
    </ButtonContainer>
  );
};

const CreateModuleButton = (): ReactElement => {
  const [activeModuleId, setActiveModuleId] = useRecoilState(ActiveModuleIdState);
  const theme = useRecoilValue(ThemeState);

  const isActive = activeModuleId === null;
  const background = theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';

  return (
    <ButtonContainer onClick={() => setActiveModuleId(null)} background={isActive ? background : undefined}>
      <Add size={24} />
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
  const modules = useRecoilValue(ModulesState);

  return (
    <SidebarContainer>
      <Spacer vertical={12} />
      <SwitchIconContainer>
        <Switch />
      </SwitchIconContainer>
      <Spacer vertical={2} />

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
