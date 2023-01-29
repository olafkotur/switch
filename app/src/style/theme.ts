export type Themes = 'light' | 'dark';

const COMMON_THEME = {
  font: 'Inter',
  fontSize: {
    verySmall: '10px',
    small: '12px',
    medium: '14px',
    large: '18px',
    veryLarge: '32px',
  },
  borderRadius: {
    small: '3px',
    medium: '5px',
    large: '8px',
    veryLarge: '10px',
  },
  border: {
    normal: '0.5px solid #ABABAE',
    strong: '1px solid #ABABAE',
  },
  spacing: {
    verySmall: '3px',
    small: '5px',
    medium: '10px',
    large: '15px',
    veryLarge: '20px',
  },
  dropShadow: {
    light: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    medium: '0px 8px 8px rgba(0, 0, 0, 0.35)',
    strong: '0px 12px 12px rgba(0, 0, 0, 0.4)',
  },
  highlightColor: {
    primary: '#307093', // cyan
    secondary: '#CBAE61', // yellow
    tertiary: '#B33939', // red
    quaternary: '#00b894', // green
  },
  animation: {
    light: 0.99,
    medium: 0.98,
    strong: 0.97,
  },
  zIndex: {
    background: -10000,
    sidebar: 1000,
    backdrop: 5000,
    modal: 7500,
    alert: 7500,
    controls: 7500,
  },
};

export const LIGHT_THEME = {
  ...COMMON_THEME,
  name: 'light' as Themes,
  color: {
    faint: 'rgba(0, 0, 0, 0.6)',
    normal: '#32323E',
    inverted: '#ecf0f1',
    danger: 'rgba(227, 66, 66, 0.6)',
    white: '#ecf0f1',
    black: '#32323E',
  },
  backgroundColor: {
    primary: '#F8F9F9',
    secondary: '#F2F5F7',
    tertiary: 'rgba(0, 0, 0, 0.8)',
    faint: 'rgba(0, 0, 0, 0.15)',
    box: '#ecf0f1',
    backdrop: 'rgba(0, 0, 0, 0.7)',
    module: 'rgba(0, 0, 0, 0.2)',
  },
};

export const DARK_THEME = {
  ...COMMON_THEME,
  name: 'dark' as Themes,
  color: {
    faint: 'rgba(255, 255, 255, 0.6)',
    normal: '#ecf0f1',
    inverted: '#32323E',
    danger: 'rgba(227, 66, 66, 0.6)',
    white: '#ecf0f1',
    black: '#32323E',
  },
  backgroundColor: {
    primary: '#303036',
    secondary: '#1D1D21',
    tertiary: '#ecf0f1FFF',
    faint: 'rgba(255, 255, 255, 0.15)',
    box: 'rgba(255, 255, 255, 0.15)',
    backdrop: 'rgba(0, 0, 0, 0.7)',
    module: 'rgba(255, 255, 255, 0.2)',
  },
};

export type Theme = typeof LIGHT_THEME & typeof DARK_THEME;
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
