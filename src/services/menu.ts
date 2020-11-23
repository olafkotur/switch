import moment from 'moment';
import { IMenuItem, IStoredMenuItems } from '../typings/d';
import { StorageService } from './storage';
import crypto from 'crypto';
import * as _ from 'lodash';

export const MenuService = {
  generateId: (value: string): string => {
    const input = `${value}-${moment().milliseconds()}-${Math.random()}`;
    const algorithm = crypto.createHash('sha256');
    const hash = algorithm.update(input).digest('hex').toString();
    return hash;
  },

  fetchList: async (): Promise<IMenuItem[]> => {
    const res: IStoredMenuItems | null = await StorageService.get('menuItems') as IStoredMenuItems | null;
    return res && res.data ? res.data : [];
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

  order: async (id: string, direction: 'up' | 'down'): Promise<boolean> => {
    const previousData = await MenuService.fetchList();

    // determine indexes
    const oldIndex = previousData.findIndex(v => v.id === id);
    const newIndex = direction === 'up' ? oldIndex - 1 : oldIndex + 1;

    // safeguard against illegal moves
    if (newIndex < 0 || newIndex > previousData.length - 1) {
      return true;
    }

    // re-order
    const updatedData: IMenuItem[] = [];
    _.without(previousData, previousData[oldIndex]).forEach((v, i) => {
      i === newIndex && updatedData.push(previousData[oldIndex]);
      updatedData.push(v);
    });
    newIndex > updatedData.length - 1 && updatedData.push(previousData[oldIndex]);

    const saveData: IStoredMenuItems = { data: [...updatedData] };
    return await StorageService.set('menuItems', saveData);
  },
};
