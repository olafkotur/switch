import { IPresetSetting, IStoredData } from '../typings/d';
import { StorageService } from './storage';

export const PresetService = {
  fetchList: async (): Promise<IPresetSetting[]> => {
    const res: IStoredData<IPresetSetting> | null = await StorageService.get('userSettings') as IStoredData<IPresetSetting> | null;
    return res && res.data ? res.data : [];
  },

  active: (): boolean => {
    return true;
  },

  save: async (name: string, width: number, height: number): Promise<boolean> => {
    const previousData: IPresetSetting[] = await PresetService.fetchList();
    return false;
  },

  delete: async (id: string): Promise<boolean> => {
    const previousData: IPresetSetting[] = await PresetService.fetchList();
    return false;
  },
};
