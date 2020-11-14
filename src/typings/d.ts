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
