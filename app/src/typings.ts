import { Themes } from './style/theme';

export type ElectronStorageKey = 'window-setup';

export type Channel = 'window-setup' | 'window-events' | 'window-presets' | 'storage-control';
export type ChannelEvent =
  | 'full-screen'
  | 'window-setup-data'
  | 'set-overlay-mode'
  | 'set-animate-presets'
  | 'apply-window-preset'
  | 'clear-storage';
export type ChannelValue = any;

export type ModalName = 'preferences' | 'overlay-prompt';

export interface WindowSetup {
  overlayMode?: boolean;
  animatePresets?: boolean;
}

export interface WindowProperties {
  width: number;
  height: number;
  xPosition: number;
  yPosition: number;
}

export interface ScreenProperties {
  width: number;
  height: number;
}

export interface Response {
  code: number;
  status: string;
  date: string;
  unix: number;
  message?: string;
  data?: unknown;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  username: string;
  avatar: string;
}

export interface Module {
  _id: string;
  userId: string;
  url: string;
  icon: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface Preferences {
  _id: string;
  userId: string;
  theme: Themes;
  overlayMode: boolean;
  disableOverlayPrompt: boolean;
  animatePresets: boolean;
  updatedAt: Date;
  createdAt: Date;
}

export interface Suggestion {
  _id: string;
  url: string;
  icon: string;
  category: 'productivity' | 'social' | 'messaging';
  updatedAt: Date;
  createdAt: Date;
}
