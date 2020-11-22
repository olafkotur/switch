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

  getItems: async (): Promise<IMenuItem[]> => {
    const items: IMenuItem[] = [];

    items.push({
      id: `notion-${moment().unix().toString()}`,
      url: 'https://notion.so',
      icon: require('../../assets/notion.png'),
    });

    items.push({
      id: `calendar-${moment().unix().toString()}`,
      url: 'http://calendar.google.com/',
      icon: require('../../assets/calendar.png'),
    });

    items.push({
      id: `whatsapp-${moment().unix().toString()}`,
      url: 'https://web.whatsapp.com',
      icon: require('../../assets/whatsapp.png'),
    });

    items.push({
      id: `messenger-${moment().unix().toString()}`,
      url: 'https://messenger.com',
      icon: require('../../assets/messenger.png'),
    });

    items.push({
      id: `slack-${moment().unix().toString()}`,
      url: 'https://slack.com',
      icon: require('../../assets/slack.png'),
    });

    items.push({
      id: `discord-${moment().unix().toString()}`,
      url: 'https://discord.com/app',
      icon: require('../../assets/discord.png'),
    });

    items.push({
      id: `youtube-${moment().unix().toString()}`,
      url: 'https://youtube.com',
      icon: require('../../assets/youtube.png'),
    });

    return items;
  },

  save: async (url: string): Promise<boolean> => {
    const newData: IMenuItem = {
      url,
      id: MenuService.generateId(url),
      icon: '',
    };

    // append new data to previous
    const previousData = await MenuService.fetchList();
    const updateData: IStoredMenuItems = { data: [...previousData, newData] };

    return await StorageService.set('menuItems', updateData);
  },

  fetchList: async (): Promise<IMenuItem[]> => {
    const res: IStoredMenuItems | null = await StorageService.get('menuItems') as IStoredMenuItems | null;
    return res && res.data ? res.data : [];
  },
};
