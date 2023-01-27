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
   * Create default user preferences.
   * @param userId - user id
   */
  create: async (userId: Types.ObjectId): Promise<PreferenceModelData> => {
    const data: PreferenceModelData = {
      _id: Types.ObjectId(),
      userId,
      theme: 'dark',
      overlayMode: false,
      animatePresets: true,
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    return await PreferenceModel.create(data);
  },

  /**
   * Update existing preferences.
   * @param userId - user id
   * @param preferences - preferences to update
   */
  update: async (userId: Types.ObjectId, data: Partial<PreferenceModelData>): Promise<PreferenceModelData | null> => {
    await PreferenceModel.updateOne({ userId }, { $set: { ...data } });
    return await PreferenceModel.findOne({ userId });
  },
};
