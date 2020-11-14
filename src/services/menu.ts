import moment from 'moment';
import { IMenuItem } from '../typings/d';

export const MenuService = {
  getItems: (): IMenuItem[] => {
    const items: IMenuItem[] = [];

    items.push({
      id: `notion-${moment().unix().toString()}`,
      name: 'Notion',
      url: 'https://notion.so',
      icon: require('../../assets/notion.png'),
    });

    items.push({
      id: `whatsapp-${moment().unix().toString()}`,
      name: 'Whatsapp',
      url: 'https://web.whatsapp.com',
      icon: require('../../assets/whatsapp.png'),
    });

    items.push({
      id: `messenger-${moment().unix().toString()}`,
      name: 'Messenger',
      url: 'https://messenger.com',
      icon: require('../../assets/messenger.png'),
    });

    items.push({
      id: `slack-${moment().unix().toString()}`,
      name: 'Slack',
      url: 'https://slack.com',
      icon: require('../../assets/slack.png'),
    });

    items.push({
      id: `discord-${moment().unix().toString()}`,
      name: 'Discor',
      url: 'https://discord.com/app',
      icon: require('../../assets/discord.png'),
    });

    return items;
  },
};
