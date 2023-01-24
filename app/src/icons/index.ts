import { useRecoilValue } from 'recoil';
import { ThemeState } from '../state';

export interface IconProps {
  color?: string;
  size?: number;
  opacity?: number;
}

export const useDefaultColor = () => {
  const theme = useRecoilValue(ThemeState);
  return theme === 'dark' ? '#fff' : '#303036';
};

export * from './Close';
export * from './DarkMode';
export * from './Grid';
export * from './LightMode';
export * from './Search';
export * from './Settings';
export * from './Switch';