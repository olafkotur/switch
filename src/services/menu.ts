import { Icon, IMenuItem, IStoredData } from '../typings/d';
import { StorageService } from './storage';
import { UtilService } from './util';
import * as _ from 'lodash';

export const MenuService = {
  fetchList: async (): Promise<IMenuItem[]> => {
    const res: IStoredData<IMenuItem> | null = await StorageService.get('menuItems') as IStoredData<IMenuItem> | null;
    return res && res.data ? res.data : [];
  },

  save: async (url: string, icon?: Icon): Promise<boolean> => {
    const previousData = await MenuService.fetchList();

    // create menu item
    const formattedUrl = url.includes('http://') || url.includes('https://') ? url : `https://${url}`;
    const newData: IMenuItem = {
      url: formattedUrl,
      id: UtilService.generateId(url),
      order: previousData.length,
      icon: icon || '',
    };

    // append new data to previous
    const saveData: IStoredData<IMenuItem> = { data: [...previousData, newData] };

    return await StorageService.set('menuItems', saveData);
  },

  update: async (data: IMenuItem): Promise<boolean> => {
    // find item to update
    const previousData = await MenuService.fetchList();
    const toUpdate = previousData.find(v => v.id === data.id);
    if (!toUpdate) {
      return false;
    }

    // update data
    const icon = data.icon && typeof data.icon !== 'string' ? await StorageService.base64(data.icon) : '';
    const updatedData: IMenuItem[] = previousData.filter(v => v.id !== data.id).concat([{
      ...toUpdate,
      icon: icon || toUpdate.icon,
      order: data.order || toUpdate.order,
    }]);

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

  reorder: async (id: string, position: number): Promise<IMenuItem[]> => {
    // fetch previous data
    const previousData = await MenuService.fetchList();

    // separate target from the group
    const excludedData = previousData.filter(v => v.id !== id);
    const toUpdate = previousData.find(v => v.id === id) as IMenuItem;

    // order and update
    const reorderedData: IMenuItem[] = [];
    _.sortBy(excludedData, 'order').forEach((v, i) => {
      i === position ? reorderedData.push(toUpdate, v) : reorderedData.push(v);
    });
    position > excludedData.length - 1 && reorderedData.push(toUpdate);
    return reorderedData.map((v, i) => ({ ...v, order: i }));
  },

  confirmReorder: async (items: IMenuItem[]): Promise<boolean> => {
    const saveData: IStoredData<IMenuItem> = { data: [...items] };
    return await StorageService.set('menuItems', saveData);
  },
};
