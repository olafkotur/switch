import { SvgIconComponent } from '@material-ui/icons';

// tslint:disable-next-line: no-any
export type Icon = any;

export type WebViewAction = 'refresh' | 'back' | 'forward' | '';

/**
 * Window - open a new window
 * Within - create a new menu item
 * External - open in default browser
 */
export type WindowBehaviour = 'window' | 'within' | 'external';

export type FontFamily =
  | 'Arial'
  | 'Verdana'
  | 'Helvetica'
  | 'Courier New'
  | 'Times New Roman';

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
  windowPadding: boolean;
  fontFamily: FontFamily;
}

export interface ISetting {
  name: string;
  value: string | boolean;
  restart?: boolean;
}

export interface ISettingConfig extends ISetting {
  type: 'switch' | 'pop-up';
  label: string;
  description: string;
  experimental?: boolean;
  customHandler?: Function;
  CustomIcon?: SvgIconComponent;
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

export interface IServiceSetting extends IMenuItem {}

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

export interface IDialog {
  open: boolean;
  title: string;
  content: React.ReactElement | string;
  animate?: boolean;
  primaryLabel?: string;
  secondaryLabel?: string;
  hideButtons?: boolean;
  hidePrimary?: boolean;
  hideSecondary?: boolean;
  disableEscKey?: boolean;
  handlePrimary?: () => void;
  handleSecondary?: () => void;
}
