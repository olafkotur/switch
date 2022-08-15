import React, { ReactElement, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { SIDE_BAR_WIDTH_PX } from '../../../common/const';
import { ThemeState } from '../state';
import { IconButton } from './Button';

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

const ThemeButton = (): ReactElement => {
  const [theme, setTheme] = useRecoilState(ThemeState);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return <IconButton onClick={toggleTheme} size="large" />;
};

export const Sidebar = (): ReactElement => {
  return (
    <SidebarContainer>
      <ThemeButton />
    </SidebarContainer>
  );
};
