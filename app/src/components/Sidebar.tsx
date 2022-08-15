import React, { ReactElement, useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { SIDE_BAR_WIDTH_PX } from '../../../common/const';
import { GroupModuleState, ThemeState } from '../state';
import { IconButton, ModuleButton } from './Button';
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

export const Sidebar = (): ReactElement => {
  const groupModule = useRecoilValue(GroupModuleState);

  return (
    <SidebarContainer>
      <SidebarTop>
        {groupModule.map((module) => (
          <ModuleButton key={module.id} module={module} />
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

const ThemeButton = (): ReactElement => {
  const [theme, setTheme] = useRecoilState(ThemeState);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return <IconButton onClick={toggleTheme} size="medium" name={`${theme}-mode`} />;
};

const VisibilityButton = (): ReactElement => {
  return <IconButton onClick={() => {}} size="medium" name="grid" />;
};

const PreferencesButton = (): ReactElement => {
  return <IconButton onClick={() => {}} size="medium" name="settings" />;
};
