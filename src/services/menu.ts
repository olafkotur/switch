import { Icon, IMenuItem, IStoredData } from '../typings/d';
import { StorageService } from './storage';
import { UtilService } from './util';
import * as _ from 'lodash';

export const MenuService = {
  fetchList: async (): Promise<IMenuItem[]> => {
    const res: IStoredData<IMenuItem> | null = await StorageService.get('menuItems') as IStoredData<IMenuItem> | null;
    return res && res.data ? res.data : [];
  },

  save: async (url: string, name?: string, icon?: Icon): Promise<boolean> => {
    const newData: IMenuItem = {
      url,
      name: name || url.split('://')[1],
      id: UtilService.generateId(url),
      icon: icon || '',
    };

    // append new data to previous
    const previousData = await MenuService.fetchList();
    const saveData: IStoredData<IMenuItem> = { data: [...previousData, newData] };

    return await StorageService.set('menuItems', saveData);
  },

  update: async (data: IMenuItem): Promise<boolean> => {
    const previousData = await MenuService.fetchList();
    const icon = data.icon && typeof data.icon !== 'string' ? await StorageService.base64(data.icon) : '';

    // update icon by id
    const updatedData: IMenuItem[] = previousData.map(v => (
      data.id === v.id ? { ...v, icon: icon || v.icon, name: data.name || v.name || v.url } : { ...v }
    ));
    const saveData: IStoredData<IMenuItem> = { data: [...updatedData] };

    return await StorageService.set('menuItems', saveData);
  },

  delete: async (id: string): Promise<boolean> => {
    const previousData = await MenuService.fetchList();

    // remove deleted item
    const updatedData: IMenuItem[] = previousData.filter(v => id !== v.id);
    const saveData: IStoredData<IMenuItem> = { data: [...updatedData] };

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

    const saveData: IStoredData<IMenuItem> = { data: [...updatedData] };
    return await StorageService.set('menuItems', saveData);
  },
};
