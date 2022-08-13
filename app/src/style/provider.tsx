import React, { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import {
  createGlobalStyle,
  ThemeProvider as DefaultThemeProvider,
} from 'styled-components';
import { ThemeState } from '../state';
import { DARK_THEME, LIGHT_THEME } from './theme';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Courier New;
    font-size: ${(props) => props.theme.fontSize.medium};
    color: ${(props) => props.theme.color.normal};

    margin: 0;
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
