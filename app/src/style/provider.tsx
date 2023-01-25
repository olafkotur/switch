import React, { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import { createGlobalStyle, ThemeProvider as DefaultThemeProvider } from 'styled-components';
import { ThemeState } from '../state';
import { DARK_THEME, LIGHT_THEME } from './theme';
import '@fontsource/inter';
import 'react-toastify/dist/ReactToastify.min.css';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Inter;
    user-select: none;
    color: ${(props) => props.theme.color.normal};
    background-color: ${(props) => props.theme.backgroundColor.secondary};

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
