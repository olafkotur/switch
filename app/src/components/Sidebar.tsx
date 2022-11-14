import React, { ReactElement, useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { SIDE_BAR_WIDTH_PX } from '../../../common/const';
import { Module } from '../../../common/types/module';
import { DarkMode, Grid, LightMode, Settings, Switch } from '../icons';
import { ActiveModuleIdState, GroupModuleState, ModalState, ThemeState } from '../state';
import { Button, IconButton } from './Button';
import { Spacer } from './Common';
import { Divider } from './Divider';

const SidebarContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  width: ${SIDE_BAR_WIDTH_PX}px;
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
  margin: 0 0 ${(props) => props.theme.spacing.medium} 0;
`;

const ButtonContainer = styled(Button)<{ background?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  cursor: pointer;
  border-radius: ${(props) => props.theme.borderRadius.small};
  margin: ${(props) => props.theme.spacing.small} 0;
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
      <img src={favicon} width="26px" draggable={false} />
    </ButtonContainer>
  );
};

const ThemeButton = (): ReactElement => {
  const [theme, setTheme] = useRecoilState(ThemeState);

  const onClick = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return (
    <IconButton onClick={onClick} size="medium">
      {theme === 'dark' ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
};

const VisibilityButton = (): ReactElement => {
  // TODO: add visibility action
  return (
    <IconButton onClick={() => {}} size="medium">
      <Grid />
    </IconButton>
  );
};

const PreferencesButton = (): ReactElement => {
  const setModal = useSetRecoilState(ModalState);

  return (
    <IconButton onClick={() => setModal('preferences')} size="medium">
      <Settings />
    </IconButton>
  );
};

export const Sidebar = (): ReactElement => {
  const groupModule = useRecoilValue(GroupModuleState);

  return (
    <SidebarContainer>
      <SidebarTop>
        <Spacer y={3} />
        <HomeButton />
        <Spacer y={3} />

        {groupModule.map((module) => (
          <ModuleButton key={`module-${module.id}`} {...module} />
        ))}
      </SidebarTop>

      <SidebarBottom>
        <Divider width="39px" />
        <ThemeButton />
        <VisibilityButton />
        <PreferencesButton />
      </SidebarBottom>
    </SidebarContainer>
  );
};
