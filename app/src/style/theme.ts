export type Themes = 'light' | 'dark';

const COMMON_THEME = {
  fontSize: {
    small: '12px',
    medium: '14px',
    large: '16px',
  },
  borderRadius: {
    small: '4px',
    medium: '6px',
    large: '10px',
  },
  zIndex: {
    sidebar: 1,
    modal: 2,
    alert: 3,
  },
};

export const LIGHT_THEME = {
  ...COMMON_THEME,
  color: {
    faint: 'rgba(0, 0, 0, 0.6)',
    normal: 'rgba(0, 0, 0, 1)',
  },
  backgroundColor: {
    normal: 'red',
  },
  border: {
    normal: '1px solid rgba(0, 0, 0, 0.08)',
    strong: '1px solid rgba(0, 0, 0, 0.15)',
  },
};

export const DARK_THEME = {
  ...COMMON_THEME,
  color: {
    faint: 'rgba(255, 255, 255, 0.6)',
    normal: 'rgba(255, 255, 255, 1)',
  },
  backgroundColor: {
    normal: 'green',
  },
  border: {
    normal: '1px solid rgba(255, 255, 255, 0.08)',
    strong: '1px solid rgba(255, 255, 255, 0.15)',
  },
};

export type Theme = typeof LIGHT_THEME & typeof DARK_THEME;
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
