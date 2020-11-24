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

export interface IPresetSetting {
  id: string;
  name: string;
  width: number;
  height: number;
  xPosition: number;
  yPosition: number;
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

export interface IWindowSize {
  width: number;
  height: number;
}
