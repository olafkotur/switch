import { FontFamily, WindowBehaviour } from './d';

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
