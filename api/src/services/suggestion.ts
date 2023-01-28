import { Types } from 'mongoose';
import { SuggestionModel, SuggestionModelData } from '../models';

interface SuggestionData extends Omit<SuggestionModelData, '_id' | 'updatedAt' | 'createdAt'> {}

const suggestions: SuggestionData[] = [
  /** PRODUCTIVITY **/
  {
    url: 'https://notion.so',
    icon: 'https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://notion.so&size=256',
    category: 'productivity',
  },
  {
    url: 'https://www.dropbox.com/login',
    icon: 'https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.dropbox.com/login&size=256',
    category: 'productivity',
  },
  {
    url: 'https://linear.app',
    icon: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://linear.app/&size=256',
    category: 'productivity',
  },
  {
    url: 'https://trello.com',
    icon: 'https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://trello.com&size=256',
    category: 'productivity',
  },
  {
    url: 'https://evernote.com',
    icon: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://evernote.com&size=256',
    category: 'productivity',
  },
  {
    url: 'https://www.figma.com',
    icon: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.figma.com&size=256',
    category: 'productivity',
  },

  /** SOCIAL **/
  {
    url: 'https://twitter.com',
    icon: 'https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://twitter.com&size=256',
    category: 'social',
  },
  {
    url: 'https://youtube.com',
    icon: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://youtube.com&size=256',
    category: 'social',
  },
  {
    url: 'https://facebook.com',
    icon: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://facebook.com&size=256',
    category: 'social',
  },
  {
    url: 'https://reddit.com',
    icon: 'https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://reddit.com&size=256',
    category: 'social',
  },
  {
    url: 'https://instagram.com',
    icon: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://instagram.com&size=256',
    category: 'social',
  },
  {
    url: 'https://tiktok.com',
    icon: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://tiktok.com&size=256',
    category: 'social',
  },

  /** MESSAGING **/
  {
    url: 'https://discord.com/app',
    icon: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://discord.com/app&size=256',
    category: 'messaging',
  },
  {
    url: 'https://web.whatsapp.com',
    icon: 'https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://web.whatsapp.com/&size=256',
    category: 'messaging',
  },
  {
    url: 'https://messenger.com',
    icon: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://messenger.com&size=256',
    category: 'messaging',
  },
  {
    url: 'https://web.telegram.org',
    icon: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://web.telegram.org/&size=256',
    category: 'messaging',
  },
  {
    url: 'https://teams.microsoft.com',
    icon: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://teams.microsoft.com&size=256',
    category: 'messaging',
  },
  {
    url: 'https://slack.com',
    icon: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://slack.com&size=256',
    category: 'messaging',
  },
];

export const SuggestionService = {
  /**
   * Fetches list of suggestions from db.
   */
  fetch: async () => {
    return await SuggestionModel.find({});
  },

  /**
   * Add suggestions to the database.
   */
  create: async () => {
    const result = await SuggestionModel.deleteMany({});
    if (result.ok !== 1) {
      return console.error('SuggestionService:create :: Could not delete previous suggestions'.red);
    }

    const data: SuggestionModelData[] = suggestions.map((suggestion) => ({
      ...suggestion,
      _id: Types.ObjectId(),
      updatedAt: new Date(),
      createdAt: new Date(),
    }));

    await SuggestionModel.insertMany(data);
    console.log(`SuggestionService:create :: Created ${suggestions.length} suggestions`.green);
  },
};
