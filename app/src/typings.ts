import { Themes } from './style/theme';

export type ElectronStorageKey = 'window-setup';

export type Channel = 'window-setup' | 'window-events' | 'window-presets' | 'storage-control' | 'app-updates';
export type ChannelEvent =
  | 'full-screen'
  | 'window-setup-data'
  | 'set-overlay-mode'
  | 'set-animate-presets'
  | 'apply-window-preset'
  | 'clear-storage'
  | 'check-for-update'
  | 'update-available'
  | 'update-downloading'
  | 'update-downloaded'
  | 'quit-and-install';

export type ChannelValue = any;

export type ModalName = 'invite' | 'preferences' | 'overlay-prompt';

export interface WebView {
  goBack: () => void;
  goForward: () => void;
  reload: () => void;
  setUserAgent: (value: string) => void;
  addEventListener: (name: string, event: EventListener) => void;
}

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

export interface AppUpdates {
  isCheckingForUpdate: boolean;
  isUpdateAvailable: boolean | null;
  isUpdateDownloading: boolean | null;
  isUpdateDownloaded: boolean | null;
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
  email: string;
  avatar: string;
}

export interface Module {
  _id: string;
  userId: string;
  position: number;
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
  showTutorial: boolean;
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

export interface Invite {
  _id: string;
  email: string;
  registered: boolean;
  updatedAt: Date;
  createdAt: Date;
}
