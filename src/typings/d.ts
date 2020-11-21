export interface IMenuItem {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export interface IWebView {
  id: string;
  view: React.ReactElement;
}

export interface IServiceDetails {
  name: string;
  url: string;
}

export interface ISettingConfig {
  name: string;
  value: string;
  label: string;
  type: 'switch' | 'button';
  defaultValue?: string;
  action?: string;
}
