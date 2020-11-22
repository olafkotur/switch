import moment from 'moment';
import { IMenuItem, IServiceDetails, IStoredMenuItems } from '../typings/d';
import { StorageService } from './storage';
import crypto from 'crypto';

export const MenuService = {
  generateId: (value: string): string => {
    const input = `${value}-${moment().milliseconds()}-${Math.random()}`;
    const algorithm = crypto.createHash('sha256');
    const hash = algorithm.update(input).digest('hex').toString();
    return hash;
  },

  save: async (url: string): Promise<boolean> => {
    const newData: IMenuItem = {
      url,
      id: MenuService.generateId(url),
      icon: '',
    };

    // append new data to previous
    const previousData = await MenuService.fetchList();
    const saveData: IStoredMenuItems = { data: [...previousData, newData] };

    return await StorageService.set('menuItems', saveData);
  },

  update: async (id: string, icon: string): Promise<boolean> => {
    const previousData = await MenuService.fetchList();

    // update icon by id
    const updatedData: IMenuItem[] = previousData.map(v => id === v.id ? { ...v, icon } : { ...v });
    const saveData: IStoredMenuItems = { data: [...updatedData] };

    return await StorageService.set('menuItems', saveData);
  },

  delete: async (id: string): Promise<boolean> => {
    const previousData = await MenuService.fetchList();

    // remove deleted item
    const updatedData: IMenuItem[] = previousData.filter(v => id !== v.id);
    const saveData: IStoredMenuItems = { data: [...updatedData] };

    return await StorageService.set('menuItems', saveData);
  },

  fetchList: async (): Promise<IMenuItem[]> => {
    const res: IStoredMenuItems | null = await StorageService.get('menuItems') as IStoredMenuItems | null;
    return res && res.data ? res.data : [];
  },
};
