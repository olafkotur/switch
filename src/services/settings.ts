import { ISetting, IStoredData } from '../typings/d';
import { StorageService } from './storage';
import * as _ from 'lodash';

export const SettingsService = {
  getDefault: (): ISetting[] => {
    return [
      { name: 'startUpLaunch', value: 'false' },
      { name: 'showBetaStatus', value: 'true' },
      { name: 'animateResize', value: 'true' },
      { name: 'useModifiedAgent', value: 'false' },
    ];
  },

  fetchList: async (): Promise<ISetting[]> => {
    const res: IStoredData<ISetting> | null = await StorageService.get('userSettings') as IStoredData<ISetting> | null;
    return res && res.data ? res.data : SettingsService.getDefault();
  },

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
};
