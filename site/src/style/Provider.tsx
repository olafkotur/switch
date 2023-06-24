import React, { ReactElement } from 'react';
import { ToastContainer as Toasts } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { createGlobalStyle, ThemeProvider as DefaultThemeProvider } from 'styled-components';
import { useGetToastProps } from '../hooks';
import { ThemeState } from '../state';
import { DARK_THEME, LIGHT_THEME } from './theme';

// always at the end
import '@fontsource/inter';
import 'react-toastify/dist/ReactToastify.min.css';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: ${(props) => props.theme.font};
    font-size: ${(props) => props.theme.fontSize.medium};
    color: ${(props) => props.theme.color.normal};
    background: ${(props) => props.theme.backgroundColor.primary};
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
  const toastProps = useGetToastProps();

  return (
    <DefaultThemeProvider theme={theme === 'dark' ? DARK_THEME : LIGHT_THEME}>
      <GlobalStyle />
      <Toasts {...toastProps} />
      {children}
    </DefaultThemeProvider>
  );
};
