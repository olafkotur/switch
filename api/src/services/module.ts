import { Types } from 'mongoose';
import { ModuleModel, ModuleModelData } from '../models';
import { UtilService } from './util';

export const ModuleService = {
  /**
   * Fetches module list.
   * @param userId - user id
   */
  fetch: async (userId: Types.ObjectId): Promise<ModuleModelData[]> => {
    return await ModuleModel.find({ userId });
  },

  /**
   * Create new application.
   * @param userId - user id
   * @param url - app url
   */
  create: async (args: { userId: Types.ObjectId; url: string }): Promise<ModuleModelData> => {
    const icon = await UtilService.fetchUrlFavicon(args.url);
    const url = args.url.includes('http://') || args.url.includes('https://') ? args.url : `https://${args.url}`;
    const data: Omit<ModuleModelData, '_id'> = {
      userId: args.userId,
      url,
      icon,
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    return await ModuleModel.create(data);
  },

  /**
   * Delete existing module.
   * @param _id - module id
   */
  delete: async (_id: Types.ObjectId, userId: Types.ObjectId): Promise<boolean> => {
    const result = await ModuleModel.deleteOne({ _id, userId });
    return result.deletedCount === 1;
  },
};
