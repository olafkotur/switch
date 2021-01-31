// tslint:disable-next-line: no-any
export type Icon = any;

export type WebViewAction = 'refresh' | 'back' | 'forward' | '';

/**
 * Window - open a new window
 * Within - create a new menu item
 * External - open in default browser
 */
export type WindowBehaviour = 'window' | 'within' | 'external';

export interface IStoredData<T> {
  data: T[];
}

export interface IUserSettings {
  overlayMode: boolean;
  modifiedAgent: boolean;
  visiblityKeybind: string;
  warningMessages: boolean;
  windowBehaviour: WindowBehaviour;
  accentColor: string;
  animatePresets: boolean;
  darkMode: boolean;
  autoLaunch: boolean;
}

export interface ISetting {
  name: string;
  value: string | boolean;
  refresh?: boolean;
  restart?: boolean;
  handleChange?: Function;
}

export interface ISettingConfig extends ISetting {
  type: 'switch' | 'pop-up';
  label: string;
  description: string;
}

export interface ISelectOption {
  value: string;
  label: string;
}
export interface IWindowInfo {
  width: number;
  height: number;
  xPosition: number;
  yPosition: number;
}

export interface IScreenInfo {
  width: number;
  height: number;
}

export interface IPreset {
  name: string;
  width: number;
  height: number;
  xPosition: number;
  yPosition: number;
  preview: IPresetPreview;
}

export interface IPresetPreview {
  width: number;
  height: number;
  xOffset: number;
  yOffset: number;
}

export interface IServiceSetting extends IMenuItem {
}

export interface IMenuItem {
  id: string;
  url: string;
  order: number;
  icon: Icon;
}

export interface IWebView {
  id: string;
  view: React.ReactElement;
}

export interface IActionRequest {
  id: string;
  action: WebViewAction;
}

export interface IKey {
  name: string;
  value: string;
}
