// tslint:disable-next-line: no-any
export type Icon = any;

export type WebViewAction = 'refresh' | 'back' | 'forward' | '';

export interface IStoredData<T> {
  data: T[];
}

export interface ISetting {
  name: string;
  value: string;
}

export interface ISettingConfig extends ISetting {
  label: string;
  type: 'switch' | 'button';
  action?: string;
  hover?: string;
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

export interface IPresetSetting extends IWindowInfo {
  id: string;
  name: string;
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
