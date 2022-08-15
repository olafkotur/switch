import React, { ReactElement, useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { SIDE_BAR_WIDTH_PX } from '../../../common/const';
import { Module } from '../../../common/types/module';
import { ActiveModuleState, GroupModuleState, ThemeState } from '../state';
import { IconButton, ImageIconButton } from './Button';

const SidebarContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: ${(props) => props.theme.backgroundColor.secondary};
  padding: 10px 0;
  position: fixed;
  width: ${SIDE_BAR_WIDTH_PX}px;
  height: 100%;
`;

interface ModuleButtonProps {
  module: Module;
}

const ModuleButton = ({ module }: ModuleButtonProps): ReactElement => {
  const [activeModule, setActiveModule] = useRecoilState(ActiveModuleState);
  const isActive = module.id === activeModule?.id;
  return (
    <ImageIconButton
      onClick={() => setActiveModule(module)}
      size="large"
      src={module.favicon}
    />
  );
};

const ThemeButton = (): ReactElement => {
  const [theme, setTheme] = useRecoilState(ThemeState);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return <IconButton onClick={toggleTheme} size="large" />;
};

export const Sidebar = (): ReactElement => {
  const groupModule = useRecoilValue(GroupModuleState);

  return (
    <SidebarContainer>
      {groupModule.map((module) => (
        <ModuleButton key={module.id} module={module} />
      ))}
      <ThemeButton />
    </SidebarContainer>
  );
};
