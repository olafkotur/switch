import { IMenuItem } from '../typings/d';

export const SearchService = {
  getSuggestions: async (): Promise<IMenuItem[]> => {
    return [
      { id: '', name: 'Notion', url: 'https://notion.so', icon: require('../../assets/notion.png') },
      { id: '', name: 'Gmail', url: 'https://mail.google.com', icon: require('../../assets/gmail.png') },
      { id: '', name: 'Google Calendar', url: 'https://calendar.google.com', icon: require('../../assets/calendar.png') },
      { id: '', name: 'Google Drive', url: 'https://drive.google.com', icon: require('../../assets/drive.png') },
      { id: '', name: 'Slack', url: 'https://slack.com', icon: require('../../assets/slack.png') },
      { id: '', name: 'Whatsapp', url: 'https://web.whatsapp.com', icon: require('../../assets/whatsapp.png') },
      { id: '', name: 'Messenger', url: 'https://messenger.com', icon: require('../../assets/messenger.png') },
      { id: '', name: 'Discord', url: 'https://discord.com/app', icon: require('../../assets/discord.png') },
      { id: '', name: 'Github', url: 'https://github.com', icon: require('../../assets/github.png') },
      { id: '', name: 'Airtable', url: 'https://airtable.com', icon: require('../../assets/airtable.png') },
      { id: '', name: 'Jira', url: 'https://atlassian.com/software/jira', icon: require('../../assets/jira.png') },
      { id: '', name: 'Asana', url: 'https://asana.com', icon: require('../../assets/asana.png') },
      { id: '', name: 'YouTube', url: 'https://youtube.com', icon: require('../../assets/youtube.png') },
      { id: '', name: 'Netflix', url: 'https://netflix.com', icon: require('../../assets/netflix.png') },
      { id: '', name: 'Disney Plus', url: 'https://disneyplus.com', icon: require('../../assets/disneyplus.png') },
      { id: '', name: 'Audible', url: 'https://audible.com', icon: require('../../assets/audible.png') },
      { id: '', name: 'Spotify', url: 'https://spotify.com', icon: require('../../assets/spotify.png') },
      { id: '', name: 'Facebook', url: 'https://facebook.com', icon: require('../../assets/facebook.png') },
      { id: '', name: 'Twitter', url: 'https://twitter.com', icon: require('../../assets/twitter.png') },
      { id: '', name: 'Instagram', url: 'https://instagram.com', icon: require('../../assets/instagram.png') },
      { id: '', name: 'Reddit', url: 'https://reddit.com', icon: require('../../assets/reddit.png') },
    ];
  },

  validateUrl: (url: string): boolean => {
    const pattern = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm);
    return pattern.test(url);
  },
};
