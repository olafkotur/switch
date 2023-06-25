import { last } from 'lodash';
import { Types } from 'mongoose';
import { ModuleModel, ModuleModelData } from '../models';
import { UtilService } from './util';

export const ModuleService = {
  /**
   * Fetches module list.
   * @param userId - user id
   */
  fetch: async (userId: Types.ObjectId): Promise<ModuleModelData[]> => {
    return await ModuleModel.find({ userId }).sort({ position: 1 });
  },

  /**
   * Create new application.
   * @param userId - user id
   * @param url - app url
   */
  create: async (args: { userId: Types.ObjectId; url: string }): Promise<ModuleModelData> => {
    const icon = await UtilService.fetchUrlFavicon(args.url);
    const url = args.url.includes('http://') || args.url.includes('https://') ? args.url : `https://${args.url}`;

    // find the position of the last module
    const existingModules = await ModuleService.fetch(args.userId);
    const lastModule = last(existingModules);
    const position = lastModule ? lastModule.position + 1 : 0;

    const data: ModuleModelData = {
      _id: Types.ObjectId(),
      userId: args.userId,
      url,
      icon,
      position,
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    return await ModuleModel.create(data);
  },

  /**
   * Update existing module.
   * @param _id - module id
   * @param data - data to update
   */
  update: async (args: { _id: Types.ObjectId; data: { position: number } }) => {
    const { position } = args.data;

    const moduleToUpdate = await ModuleModel.findOne({ _id: args._id });
    if (moduleToUpdate == null) {
      return false;
    }

    // no change in position
    if (moduleToUpdate.position === position) {
      return true;
    }

    // update the module's position
    await ModuleModel.updateOne({ _id: args._id }, { $set: { position } });

    // shift positions of modules in between
    if (moduleToUpdate.position < position) {
      await ModuleModel.updateMany(
        { position: { $gt: moduleToUpdate.position, $lte: position } },
        { $inc: { position: -1 } },
      );
    } else {
      await ModuleModel.updateMany(
        { position: { $gte: position, $lt: moduleToUpdate.position } },
        { $inc: { position: 1 } },
      );
    }

    return true;
  },

  /**
   * Delete existing module.
   * @param _id - module id
   */
  delete: async (_id: Types.ObjectId, userId: Types.ObjectId): Promise<boolean> => {
    const moduleToDelete = await ModuleModel.findOne({ _id, userId });
    if (moduleToDelete == null) {
      return false;
    }

    const result = await ModuleModel.deleteOne({ _id, userId });
    if (result.deletedCount !== 1) {
      return false;
    }

    // shift the positions of modules after the deleted module
    await ModuleModel.updateMany({ userId, position: { $gt: moduleToDelete.position } }, { $inc: { position: -1 } });
    return true;
  },
};
