export interface IMenuItem {
  id: string;
  url: string;
  icon: Icon;
}

export interface IWebView {
  id: string;
  view: React.ReactElement;
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

export interface IServiceSettingConfig {
  id: string;
  label: string;
  icon: Icon;
}

export interface IStoredMenuItems {
  data: IMenuItem[];
}

export interface IStoredSettings {
  data: ISetting[];
}

// tslint:disable-next-line: no-any
export type Icon = any;
