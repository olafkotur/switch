import { IMenuItem } from '../typings/d';

export const SearchService = {
  /**
   * Returns service suggestions
   */
  getSuggestions: async (): Promise<IMenuItem[]> => {
    return [
      {
        id: '',
        url: 'https://notion.so',
        icon: require('../../assets/suggestions/notion.png'),
        order: -1,
      },
      {
        id: '',
        url: 'https://mail.google.com',
        icon: require('../../assets/suggestions/gmail.png'),
        order: -1,
      },
      {
        id: '',
        url: 'https://calendar.google.com',
        icon: require('../../assets/suggestions/calendar.png'),
        order: -1,
      },
      {
        id: '',
        url: 'https://drive.google.com',
        icon: require('../../assets/suggestions/drive.png'),
        order: -1,
      },
      {
        id: '',
        url: 'https://slack.com',
        icon: require('../../assets/suggestions/slack.png'),
        order: -1,
      },
      {
        id: '',
        url: 'https://web.whatsapp.com',
        icon: require('../../assets/suggestions/whatsapp.png'),
        order: -1,
      },
      {
        id: '',
        url: 'https://messenger.com',
        icon: require('../../assets/suggestions/messenger.png'),
        order: -1,
      },
      {
        id: '',
        url: 'https://discord.com/app',
        icon: require('../../assets/suggestions/discord.png'),
        order: -1,
      },
      {
        id: '',
        url: 'https://github.com',
        icon: require('../../assets/suggestions/github.png'),
        order: -1,
      },
      {
        id: '',
        url: 'https://airtable.com',
        icon: require('../../assets/suggestions/airtable.png'),
        order: -1,
      },
      {
        id: '',
        url: 'https://atlassian.com/software/jira',
        icon: require('../../assets/suggestions/jira.png'),
        order: -1,
      },
      {
        id: '',
        url: 'https://asana.com',
        icon: require('../../assets/suggestions/asana.png'),
        order: -1,
      },
      {
        id: '',
        url: 'https://youtube.com',
        icon: require('../../assets/suggestions/youtube.png'),
        order: -1,
      },
      {
        id: '',
        url: 'https://audible.com',
        icon: require('../../assets/suggestions/audible.png'),
        order: -1,
      },
      {
        id: '',
        url: 'https://facebook.com',
        icon: require('../../assets/suggestions/facebook.png'),
        order: -1,
      },
      {
        id: '',
        url: 'https://twitter.com',
        icon: require('../../assets/suggestions/twitter.png'),
        order: -1,
      },
      {
        id: '',
        url: 'https://instagram.com',
        icon: require('../../assets/suggestions/instagram.png'),
        order: -1,
      },
      {
        id: '',
        url: 'https://reddit.com',
        icon: require('../../assets/suggestions/reddit.png'),
        order: -1,
      },
    ];
  },

  /**
   * Validates a URL
   * @param url - url to be validated
   */
  validateUrl: (url: string): boolean => {
    return new RegExp(
      /^(?:http(s)?:\/\/)?[\w.-]+(?:[\.|\:][\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm,
    ).test(url);
  },
};
