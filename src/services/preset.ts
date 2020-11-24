import { IPresetSetting, IStoredData } from '../typings/d';
import { StorageService } from './storage';
import { UtilService } from './util';
import { remote } from 'electron';

const STORAGE_KEY = 'windowPresets';

export const PresetService = {
  getDefault: (): IPresetSetting[] => {
    const screenSize = UtilService.getScreenSize();
    return [
      { id: 'default-fullscreen', name: 'Full Screen', width: screenSize.width, height: screenSize.height, xPosition: 25, yPosition: 25 },
      { id: 'default-left-side', name: 'Left Side', width: screenSize.width / 2, height: screenSize.height, xPosition: 25, yPosition: 25 },
      { id: 'default-right-side', name: 'Right Side', width: screenSize.width / 2, height: screenSize.height, xPosition: screenSize.width / 2 + 25, yPosition: 25 },
    ];
  },

  fetchList: async (): Promise<IPresetSetting[]> => {
    const res: IStoredData<IPresetSetting> | null = await StorageService.get(STORAGE_KEY) as IStoredData<IPresetSetting> | null;
    return res && res.data && res.data.length ? res.data : PresetService.getDefault();
  },

  active: async (width: number, height: number, xPosition: number, yPosition: number, animate: boolean): Promise<void> => {
    return new Promise((resolve) => {
      remote.getCurrentWindow().setPosition(Math.round(xPosition), Math.round(yPosition), animate);
      remote.getCurrentWindow().setSize(width, height, animate);
      resolve();
    });
  },

  save: async (name: string, width: number, height: number, xPosition: number, yPosition: number): Promise<boolean> => {
    const newData: IPresetSetting = {
      name,
      width,
      height,
      xPosition,
      yPosition,
      id: UtilService.generateId(name),
    };

    // append new data to previous
    const previousData = await PresetService.fetchList();
    const saveData: IStoredData<IPresetSetting> = { data: [...previousData, newData] };

    return await StorageService.set(STORAGE_KEY, saveData);
  },

  delete: async (id: string): Promise<boolean> => {
    const previousData = await PresetService.fetchList();

    // remove deleted item
    const updatedData: IPresetSetting[] = previousData.filter(v => id !== v.id);
    const saveData: IStoredData<IPresetSetting> = { data: [...updatedData] };

    return await StorageService.set(STORAGE_KEY, saveData);
  },
};
