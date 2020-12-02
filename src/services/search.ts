import { IMenuItem } from '../typings/d';

export const SearchService = {
  /**
   * Returns service suggestions
   */
  getSuggestions: async (): Promise<IMenuItem[]> => {
    return [
      { id: '', url: 'https://notion.so', icon: require('../../assets/notion.png'), order: -1 },
      { id: '', url: 'https://mail.google.com', icon: require('../../assets/gmail.png'), order: -1 },
      { id: '', url: 'https://calendar.google.com', icon: require('../../assets/calendar.png') , order: -1 },
      { id: '', url: 'https://drive.google.com', icon: require('../../assets/drive.png'), order: -1 },
      { id: '', url: 'https://slack.com', icon: require('../../assets/slack.png'), order: -1 },
      { id: '', url: 'https://web.whatsapp.com', icon: require('../../assets/whatsapp.png'), order: -1 },
      { id: '', url: 'https://messenger.com', icon: require('../../assets/messenger.png') , order: -1 },
      { id: '', url: 'https://discord.com/app', icon: require('../../assets/discord.png'), order: -1 },
      { id: '', url: 'https://github.com', icon: require('../../assets/github.png'), order: -1 },
      { id: '', url: 'https://airtable.com', icon: require('../../assets/airtable.png'), order: -1 },
      { id: '', url: 'https://atlassian.com/software/jira', icon: require('../../assets/jira.png'), order: -1 },
      { id: '', url: 'https://asana.com', icon: require('../../assets/asana.png'), order: -1 },
      { id: '', url: 'https://youtube.com', icon: require('../../assets/youtube.png'), order: -1 },
      { id: '', url: 'https://netflix.com', icon: require('../../assets/netflix.png'), order: -1 },
      { id: '', url: 'https://disneyplus.com', icon: require('../../assets/disneyplus.png'), order: -1 },
      { id: '', url: 'https://audible.com', icon: require('../../assets/audible.png'), order: -1 },
      { id: '', url: 'https://spotify.com', icon: require('../../assets/spotify.png') , order: -1 },
      { id: '', url: 'https://facebook.com', icon: require('../../assets/facebook.png'), order: -1 },
      { id: '', url: 'https://twitter.com', icon: require('../../assets/twitter.png'), order: -1 },
      { id: '', url: 'https://instagram.com', icon: require('../../assets/instagram.png'), order: -1 },
      { id: '', url: 'https://reddit.com', icon: require('../../assets/reddit.png'), order: -1 },
    ];
  },

  /**
   * Validates a URL
   * @param url - url to be validated
   */
  validateUrl: (url: string): boolean => {
    return new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:[\.|\:][\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm).test(url);
  },
};
