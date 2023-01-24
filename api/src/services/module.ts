import { Types } from 'mongoose';
import { ModuleModel, ModuleModelData } from '../models/module';

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
    const icon = 'https://www.google.com/favicon.ico'; // TODO: fetch url favicon
    const data: ModuleModelData = {
      _id: Types.ObjectId(),
      userId: args.userId,
      url: args.url,
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
  delete: async (_id: Types.ObjectId): Promise<boolean> => {
    const result = await ModuleModel.deleteOne({ _id });
    return result.deletedCount === 1;
  },
};
