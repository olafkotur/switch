import { ISetting, IStoredData } from '../typings/d';
import { StorageService } from './storage';
import { modifiers, alphabetic, numeric, special } from '../imports/keys';
import * as _ from 'lodash';

export const SettingsService = {
  /**
   * Returns default settings
   */
  getDefault: (): ISetting[] => {
    return [
      { name: 'overlayMode', value: 'true' },
      { name: 'animateResize', value: 'true' },
      { name: 'showBetaStatus', value: 'true' },
      { name: 'useModifiedAgent', value: 'false' },
      { name: 'visibilityKeybind', value: 'CommandOrControl + Esc' },
      { name: 'displayWarningMessages', value: 'true' },
    ];
  },

  /**
   * Fetches list of stored settings
   */
  fetchList: async (): Promise<ISetting[]> => {
    const res: IStoredData<ISetting> | null = await StorageService.get('userSettings') as IStoredData<ISetting> | null;
    return res && res.data ? res.data : SettingsService.getDefault();
  },

  /**
   * Updates a setting by name
   * @param name - setting name
   * @param value - setting value
   */
  update: async (name: string, value: string): Promise<boolean> => {
    const previousData = await SettingsService.fetchList();

    // update setting by name
    const updatedData: ISetting[] = previousData.map(v => name === v.name ? { ...v, value  } : { ...v });
    const exists = !!updatedData.find(v => v.name === name);
    if (!exists) {
      updatedData.push({ name, value });
    }

    const saveData: IStoredData<ISetting> = { data: [...updatedData] };

    return await StorageService.set('userSettings', saveData);
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
