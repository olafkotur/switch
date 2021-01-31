import { IUserSettings } from '../typings/d';
import { StorageService } from './storage';
import { modifiers, alphabetic, numeric, special } from '../imports/keys';
import * as _ from 'lodash';

const STORAGE_KEY = 'userSettings';

const defaultSettings: IUserSettings = {
  overlayMode: true,
  modifiedAgent: false,
  visiblityKeybind: 'CommandOrControl + Esc',
  warningMessages: true,
  windowBehaviour: 'external',
  accentColor: '#227093',
  animatePresets: true,
  darkMode: true,
  autoLaunch: true,
};

export const SettingsService = {
  /**
   * Fetches user settings
   */
  fetch: async (): Promise<IUserSettings> => {
    const res = await StorageService.get(STORAGE_KEY) as IUserSettings;
    return _.isEmpty(res) ? defaultSettings : res;
  },

  /**
   * Updates provided user settings
   */
  update: async (toUpdate: Partial<IUserSettings>): Promise<boolean> => {
    const previous = await SettingsService.fetch();
    const data: IUserSettings = {
      ...previous,
      ...toUpdate,
    };
    return await StorageService.set(STORAGE_KEY, data);
  },

  /**
   * Validates key input, checks against supported keys
   * @param key - input
   */
  validateKey: (key: string): string | null => {
    // match modifier keys
    const m = modifiers.find(v => v.name === key);
    if (m) {
      return m.value;
    }

    // match alphabetic keys
    const a = alphabetic.find(v => v.name === key);
    if (a) {
      return a.value;
    }

    // match numeric keys
    const n = numeric.find(v => v.name === key);
    if (n) {
      return n.value;
    }

    // match special keys
    const s = special.find(v => v.name === key);
    if (s) {
      return s.value;
    }

    return null;
  },
};
