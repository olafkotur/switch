export type Themes = 'light' | 'dark';

const COMMON_THEME = {
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
    small: '5px',
    medium: '10px',
    large: '15px',
    veryLarge: '20px',
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
  },
};

export const LIGHT_THEME = {
  ...COMMON_THEME,
  color: {
    faint: 'rgba(0, 0, 0, 0.6)',
    normal: 'rgba(0, 0, 0, 1)',
    inverted: 'rgba(255, 255, 255, 1)',
    danger: 'rgba(227, 66, 66, 0.8)',
  },
  backgroundColor: {
    primary: '#F2F5F7',
    secondary: '#F8F9F9',
    tertiary: '#307093',
    faint: 'rgba(0, 0, 0, 0.15)',
    backdrop: 'rgba(0, 0, 0, 0.7)',
  },
};

export const DARK_THEME = {
  ...COMMON_THEME,
  color: {
    faint: 'rgba(255, 255, 255, 0.6)',
    normal: 'rgba(255, 255, 255, 1)',
    inverted: 'rgba(0, 0, 0, 1)',
    danger: 'rgba(227, 66, 66, 0.7)',
  },
  backgroundColor: {
    primary: '#303036',
    secondary: '#1D1D21',
    tertiary: '#FFFFFF',
    faint: 'rgba(255, 255, 255, 0.15)',
    backdrop: 'rgba(0, 0, 0, 0.7)',
  },
};

export type Theme = typeof LIGHT_THEME & typeof DARK_THEME;
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
