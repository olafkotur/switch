import { ISettingsModel, SettingsMeta } from '../typings/models';
import { DatabaseService } from './database';

export const SettingsService = {
  /**
   * Fetches user settings from db.
   * @param email - user email
   */
  fetch: async (email: string): Promise<SettingsMeta | null> => {
    // find user
    const user = await DatabaseService.getCollection('users').findOne({ email });
    if (!user || !user._id) {
      return null;
    }

    // fetch settings
    const settings = await DatabaseService.getCollection('settings').findOne({ uid: user._id });
    return settings.meta || null;
  },

  /**
   * Create new or update existing settings
   * @param email - user email
   * @param settings - settings object
   */
  upsert: async (email: string, settings: SettingsMeta): Promise<boolean> => {
    // find user
    const user = await DatabaseService.getCollection('users').findOne({ email });
    if (!user || !user._id) {
      return false;
    }

    const col = DatabaseService.getCollection('settings');
    const data: ISettingsModel = { uid: user._id, meta: settings, updatedAt: new Date(), createdAt: new Date() };

    let result = null;
    const existing = await col.findOne({ uid: user._id });
    if (existing) {
      result = await col.updateOne({ uid: user._id }, { $set: { meta: data.meta, updatedAt: new Date() } });
    } else {
      result = await col.insertOne(data);
    }

    return result.result.ok === 1;
  },
};