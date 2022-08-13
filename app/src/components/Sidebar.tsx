import React, { ReactElement, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { ThemeState } from '../state';
import { IconButton } from './Button';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: red;

  width: 100px;
  height: 100%;
`;

const ThemeButton = (): ReactElement => {
  const [theme, setTheme] = useRecoilState(ThemeState);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return <IconButton onClick={toggleTheme} />;
};

export const Sidebar = (): ReactElement => {
  return (
    <Container>
      Sidebar
      <ThemeButton />
    </Container>
  );
};
