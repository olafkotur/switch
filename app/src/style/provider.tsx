import React, { ReactElement } from 'react';
import { ToastContainer as Toasts } from 'react-toastify';
import { createGlobalStyle, ThemeProvider as DefaultThemeProvider } from 'styled-components';
import { Background } from '../components';
import { useGetToastProps, useTheme } from '../hooks';
import { DARK_THEME, LIGHT_THEME } from './theme';

// always at the end
import '@fontsource/inter';
import 'react-toastify/dist/ReactToastify.min.css';

const GlobalStyle = createGlobalStyle`
  body {
    user-select: none;
    font-family: ${(props) => props.theme.font};
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
  const theme = useTheme();
  const toastProps = useGetToastProps();

  return (
    <DefaultThemeProvider theme={theme.name === 'dark' ? DARK_THEME : LIGHT_THEME}>
      <GlobalStyle />
      <Background />
      <Toasts {...toastProps} />
      {children}
    </DefaultThemeProvider>
  );
};
