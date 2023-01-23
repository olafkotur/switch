import React, { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import { createGlobalStyle, ThemeProvider as DefaultThemeProvider } from 'styled-components';
import { Bg } from '../components';
import { ThemeState } from '../state';
import { DARK_THEME, LIGHT_THEME } from './theme';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial;
    color: ${(props) => props.theme.color.normal};
    user-select: none;
    background: ${(props) => props.theme.backgroundColor.primary};

    margin: 0;
  }

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

interface Props {
  children: ReactElement | ReactElement[];
}

export const ThemeProvider = ({ children }: Props): ReactElement => {
  const theme = useRecoilValue(ThemeState);
  return (
    <DefaultThemeProvider theme={theme === 'dark' ? DARK_THEME : LIGHT_THEME}>
      <GlobalStyle />
      {children}
    </DefaultThemeProvider>
  );
};
