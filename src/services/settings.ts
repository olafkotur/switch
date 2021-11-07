import { IUserSettings } from '../typings/d';
import { StorageService } from './storage';
import { modifiers, alphabetic, numeric, special } from '../imports/keys';
import { RequestService } from './request';
import { config } from '../config';
import _ from 'lodash';

const STORAGE_KEY = 'userSettings';

export const SettingsService = {
  /**
   * Fetches user settings
   */
  fetch: async (): Promise<IUserSettings | null> => {
    const remote = await RequestService.get(`${config.apiUrl}/api/settings`);
    const local = await StorageService.get(STORAGE_KEY);

    // always preference for remote
    if (remote.result.data) {
      await StorageService.set(STORAGE_KEY, remote.result.data); // update local
      return remote.result.data;
    }
    // use local if remote is not available
    if (local && !_.isEmpty(local)) {
      return local as IUserSettings;
    }

    return null;
  },

  /**
   * Updates user settings in the database and local storage.
   * @param updatedSettings - updated user settings
   */
  update: async (updatedSettings: IUserSettings): Promise<boolean> => {
    const url = `${config.apiUrl}/api/settings/update`;
    const remote = await RequestService.post(url, updatedSettings);
    const local = await StorageService.set(STORAGE_KEY, updatedSettings);
    return remote.result.code === 200 && local;
  },

  /**
   * Validates key input, checks against supported keys
   * @param key - input
   */
  validateKey: (key: string): string | null => {
    // match modifier keys
    const m = modifiers.find((v) => v.name === key);
    if (m) {
      return m.value;
    }

    // match alphabetic keys
    const a = alphabetic.find((v) => v.name === key);
    if (a) {
      return a.value;
    }

    // match numeric keys
    const n = numeric.find((v) => v.name === key);
    if (n) {
      return n.value;
    }

    // match special keys
    const s = special.find((v) => v.name === key);
    if (s) {
      return s.value;
    }

    return null;
  },
};
