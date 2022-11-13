export type Themes = 'light' | 'dark';

const COMMON_THEME = {
  borderRadius: {
    small: '3px',
    medium: '5px',
    large: '8px',
  },
  border: {
    normal: '0.5px solid #ABABAE',
    strong: '1px solid #ABABAE',
  },
  spacing: {
    small: '5px',
    medium: '10px',
    large: '15px',
  },
  zIndex: {
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
  },
  backgroundColor: {
    primary: '#F2F5F7',
    secondary: '#F8F9F9',
    tertiary: '#307093',
  },
};

export const DARK_THEME = {
  ...COMMON_THEME,
  color: {
    faint: 'rgba(255, 255, 255, 0.6)',
    normal: 'rgba(255, 255, 255, 1)',
  },
  backgroundColor: {
    primary: '#303036',
    secondary: '#1D1D21',
    tertiary: '#FFFFFF',
  },
};

export type Theme = typeof LIGHT_THEME & typeof DARK_THEME;
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
