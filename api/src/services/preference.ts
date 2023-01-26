import { Types } from 'mongoose';
import { PreferenceModel, PreferenceModelData } from '../models';

export const PreferenceService = {
  /**
   * Fetches user preferences from db.
   * @param userId - user id
   */
  fetch: async (userId: Types.ObjectId): Promise<PreferenceModelData | null> => {
    return await PreferenceModel.findOne({ userId });
  },

  /**
   * Create new or update existing settings
   * @param userId - user id
   * @param preferences - preferences to upsert
   */
  upsert: async (userId: Types.ObjectId, data: Partial<PreferenceModelData>): Promise<boolean> => {
    const existing = await PreferenceModel.findOne({ userId });
    if (existing) {
      const result = await PreferenceModel.updateOne({ userId }, { $set: { ...data } });
      return result.ok === 1;
    }

    const preferences: PreferenceModelData = {
      _id: Types.ObjectId(),
      userId,
      theme: data.theme ?? 'dark',
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    const result = await PreferenceModel.create(preferences);
    return !!result._id;
  },
};
