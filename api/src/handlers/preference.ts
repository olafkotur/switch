import { Request, Response } from 'express';
import { PreferenceModelData, UserModelData } from '../models';
import { PreferenceService, ResponseService, UserService } from '../services';
import { JwtAuthData } from '../typings';

export const PreferenceHandler = {
  /**
   * Fetch user preferences.
   * @param req - request object
   * @param res - response object
   */
  fetch: async (_req: Request, res: Response): Promise<void> => {
    const user: UserModelData = res.locals.user;

    const data = await PreferenceService.fetch(user._id);
    if (!data) {
      return ResponseService.notFound('Settings not found', res);
    }
    return ResponseService.data(data, res);
  },

  /**
   * Update user preferences.
   * @param req - request object
   * @param res - response object
   */
  update: async (req: Request, res: Response): Promise<void> => {
    const user: UserModelData = res.locals.user;

    const preferences: Partial<PreferenceModelData> = req.body || null;
    if (!preferences) {
      return ResponseService.bad('Missing preferences data to update', res);
    }

    const success = await PreferenceService.update(user._id, preferences);
    if (!success) {
      return ResponseService.bad('Could not update preferences', res);
    }
    return ResponseService.ok('Preferences updated successfully', res);
  },
};
