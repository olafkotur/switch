import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { ModuleService, ResponseService, UserService } from '../services';
import { JwtAuthData } from '../typings';

export const ModuleHandler = {
  /**
   * Fetch module list.
   * @param req - request object
   * @param res - response object
   */
  fetch: async (_req: Request, res: Response): Promise<void> => {
    const jwt: JwtAuthData = res.locals.jwt.data;
    const user = await UserService.fetchSingle(jwt.username);
    if (!user) {
      return ResponseService.notFound('User not found', res);
    }

    const data = await ModuleService.fetch(user._id);
    return ResponseService.data(data, res);
  },

  /**
   * Create new module.
   * @param req - request object
   * @param res - response object
   */
  create: async (req: Request, res: Response): Promise<void> => {
    const jwt: JwtAuthData = res.locals.jwt.data;
    const user = await UserService.fetchSingle(jwt.username);
    if (!user) {
      return ResponseService.notFound('User not found', res);
    }

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
   * Delete existing module.
   * @param req - request object
   * @param res - response object
   */
  delete: async (req: Request, res: Response): Promise<void> => {
    const id = req.body._id || '';
    if (!id) {
      return ResponseService.bad('Module id must be provided', res);
    }

    const _id = Types.ObjectId(id);
    const success = await ModuleService.delete(_id);
    if (success) {
      return ResponseService.ok('Module successfully deleted', res);
    }
    return ResponseService.bad('Could not delete module', res);
  },
};
