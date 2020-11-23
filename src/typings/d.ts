export interface IMenuItem {
  id: string;
  url: string;
  // tslint:disable-next-line: no-any
  icon: any;
}

export interface IWebView {
  id: string;
  view: React.ReactElement;
}

export interface IServiceDetails {
  name: string;
  url: string;
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
  // tslint:disable-next-line: no-any
  icon: any;
}

export interface IStoredMenuItems {
  data: IMenuItem[];
}

export interface IStoredSettings {
  data: ISetting[];
}
