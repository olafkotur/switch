import { IPresetSetting, IStoredData } from '../typings/d';
import { ElectronService } from './electron';
import { StorageService } from './storage';
import { UtilService } from './util';

const STORAGE_KEY = 'windowPresets';

export const PresetService = {
  /**
   * Returns the default preset settings
   */
  getDefault: (): IPresetSetting[] => {
    const screenSize = UtilService.getScreenInfo();
    return [
      { id: 'default-fullscreen', name: 'Full Screen', width: screenSize.width, height: screenSize.height, xPosition: 25, yPosition: 25 },
      { id: 'default-left-side', name: 'Left Side', width: screenSize.width * 0.5, height: screenSize.height, xPosition: 25, yPosition: 25 },
      { id: 'default-right-side', name: 'Right Side', width: screenSize.width * 0.5, height: screenSize.height, xPosition: screenSize.width * 0.5 + 25, yPosition: 25 },
      { id: 'default-two-thirds-left', name: 'Two Thirds (left)', width: screenSize.width * 0.66, height: screenSize.height, xPosition: 25, yPosition: 25 },
      { id: 'default-two-thirds-right', name: 'Two Thirds (right)', width: screenSize.width * 0.66, height: screenSize.height, xPosition: screenSize.width * 0.33 + 50, yPosition: 25 },
    ];
  },

  /**
   * Fetches list of stored presets
   */
  fetchList: async (): Promise<IPresetSetting[]> => {
    const res: IStoredData<IPresetSetting> | null = await StorageService.get(STORAGE_KEY) as IStoredData<IPresetSetting> | null;
    return res && res.data && res.data.length ? res.data : PresetService.getDefault();
  },

  active: async (width: number, height: number, xPosition: number, yPosition: number, animate: boolean): Promise<void> => {
    const windowInfo = {
      width: Math.round(width),
      height: Math.round(height),
      xPosition: Math.round(xPosition),
      yPosition: Math.round(yPosition),
    };
    return new Promise((resolve) => {
      ElectronService.setWindowInfo(undefined, windowInfo, animate);
      resolve();
    });
  },

  /**
   * Saves new preset in the db
   * @param name - name
   * @param width - width
   * @param height - height
   * @param xPosition - x coordinate position
   * @param yPosition - y coordinate position
   */
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

  /**
   * Deletes preset by id
   * @param id - preset id
   */
  delete: async (id: string): Promise<boolean> => {
    const previousData = await PresetService.fetchList();

    // remove deleted item
    const updatedData: IPresetSetting[] = previousData.filter(v => id !== v.id);
    const saveData: IStoredData<IPresetSetting> = { data: [...updatedData] };

    return await StorageService.set(STORAGE_KEY, saveData);
  },
};
