import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { UserModelData } from '../models';
import { ModuleService, ResponseService } from '../services';
import { ModuleUpdateData } from '../typings';

export const ModuleHandler = {
  /**
   * Fetch module list.
   * @param req - request object
   * @param res - response object
   */
  fetch: async (_req: Request, res: Response): Promise<void> => {
    const user: UserModelData = res.locals.user;

    const data = await ModuleService.fetch(user._id);
    return ResponseService.data(data, res);
  },

  /**
   * Create new module.
   * @param req - request object
   * @param res - response object
   */
  create: async (req: Request, res: Response): Promise<void> => {
    const user: UserModelData = res.locals.user;

    const url = req.body.url || '';
    if (!url) {
      return ResponseService.bad('Url must be provided', res);
    }

    const module = await ModuleService.create({ userId: user._id, url });
    if (module) {
      return ResponseService.data(module, res);
    }
    return ResponseService.bad('Could not create module', res);
  },

  /**
   * Update existing module.
   * @param req - request object
   * @param res - response object
   */
  update: async (req: Request, res: Response): Promise<void> => {
    const id = req.body._id || '';
    const data = req.body.data as ModuleUpdateData;
    if (!id || data == null || data.position == null) {
      return ResponseService.bad('Missing update data', res);
    }

    if (typeof data.position !== 'number') {
      return ResponseService.bad('Invalid update data', res);
    }

    const _id = Types.ObjectId(id);
    const success = await ModuleService.update({ _id, data });
    if (success) {
      return ResponseService.ok('Module successfully updated', res);
    }
    return ResponseService.bad('Could not update module', res);
  },

  /**
   * Delete existing module.
   * @param req - request object
   * @param res - response object
   */
  delete: async (req: Request, res: Response): Promise<void> => {
    const user: UserModelData = res.locals.user;

    const id = req.body._id || '';
    if (!id) {
      return ResponseService.bad('Module id must be provided', res);
    }

    const _id = Types.ObjectId(id);
    const success = await ModuleService.delete(_id, user._id);
    if (success) {
      return ResponseService.ok('Module successfully deleted', res);
    }
    return ResponseService.bad('Could not delete module', res);
  },
};
