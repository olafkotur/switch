import { IMenuItem } from '../typings/d';

export const SearchService = {
  getSuggestions: async (): Promise<IMenuItem[]> => {
    return [
      { id: 'Notion', url: 'https://notion.so', icon: require('../../assets/notion.png') },
      { id: 'Gmail', url: 'https://mail.google.com', icon: require('../../assets/gmail.png') },
      { id: 'Google Calendar', url: 'https://calendar.google.com', icon: require('../../assets/calendar.png') },
      { id: 'Google Drive', url: 'https://drive.google.com', icon: require('../../assets/drive.png') },
      { id: 'Slack', url: 'https://slack.com', icon: require('../../assets/slack.png') },
      { id: 'Whatsapp', url: 'https://web.whatsapp.com', icon: require('../../assets/whatsapp.png') },
      { id: 'Messenger', url: 'https://messenger.com', icon: require('../../assets/messenger.png') },
      { id: 'Discord', url: 'https://discord.com/app', icon: require('../../assets/discord.png') },
      { id: 'Github', url: 'https://github.com', icon: require('../../assets/github.png') },
      { id: 'Airtable', url: 'https://airtable.com', icon: require('../../assets/airtable.png') },
      { id: 'Jira', url: 'https://atlassian.com/software/jira', icon: require('../../assets/jira.png') },
      { id: 'Asana', url: 'https://asana.com', icon: require('../../assets/asana.png') },
      { id: 'YouTube', url: 'https://youtube.com', icon: require('../../assets/youtube.png') },
      { id: 'Netflix', url: 'https://netflix.com', icon: require('../../assets/netflix.png') },
      { id: 'Disney Plus', url: 'https://disneyplus.com', icon: require('../../assets/disneyplus.png') },
      { id: 'Audible', url: 'https://audible.com', icon: require('../../assets/audible.png') },
      { id: 'Spotify', url: 'https://spotify.com', icon: require('../../assets/spotify.png') },
      { id: 'Facebook', url: 'https://facebook.com', icon: require('../../assets/facebook.png') },
      { id: 'Twitter', url: 'https://twitter.com', icon: require('../../assets/twitter.png') },
      { id: 'Instagram', url: 'https://instagram.com', icon: require('../../assets/instagram.png') },
      { id: 'Reddit', url: 'https://reddit.com', icon: require('../../assets/reddit.png') },
    ];
  },

  validateUrl: (url: string): boolean => {
    const pattern = new RegExp(
      '(http|https):\\/\\/' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
      'i', // fragment locator
    );
    return pattern.test(url);
  },
};
