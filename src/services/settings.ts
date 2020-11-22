import { defaultSettings } from '../imports/settings';
import { ISetting, IStoredSettings } from '../typings/d';
import { StorageService } from './storage';

export const SettingsService = {
  fetchList: async (): Promise<ISetting[]> => {
    const res: IStoredSettings | null = await StorageService.get('userSettings') as IStoredSettings | null;
    return res && res.data ? res.data : defaultSettings;
  },

  update: async (name: string, value: string): Promise<boolean> => {
    const previousData = await SettingsService.fetchList();

    // update setting by name
    const updatedData: ISetting[] = previousData.map(v => name === v.name ? { ...v, value  } : { ...v });
    const saveData: IStoredSettings = { data: [...updatedData] };

    return await StorageService.set('userSettings', saveData);
  },
};
