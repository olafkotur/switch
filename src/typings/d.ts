// tslint:disable-next-line: no-any
export type Icon = any;

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
  name: string;
  icon: Icon;
}

export interface IWebView {
  id: string;
  view: React.ReactElement;
}
