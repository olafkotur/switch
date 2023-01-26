import { Request, Response } from 'express';
import { PreferenceModelData } from '../models';
import { PreferenceService, ResponseService, UserService } from '../services';
import { JwtAuthData } from '../typings';

export const PreferenceHandler = {
  /**
   * Fetch user preferences.
   * @param req - request object
   * @param res - response object
   */
  fetch: async (_req: Request, res: Response): Promise<void> => {
    const jwt: JwtAuthData = res.locals.jwt.data;
    const user = await UserService.fetchSingle(jwt.username);
    if (!user) {
      return ResponseService.notFound('User not found', res);
    }

    const data = await PreferenceService.fetch(user._id);
    if (!data) {
      return ResponseService.notFound('Settings not found', res);
    }
    return ResponseService.data(data, res);
  },

  /**
   * Update or add new user preferences to the database.
   * @param req - request object
   * @param res - response object
   */
  upsert: async (req: Request, res: Response): Promise<void> => {
    const jwt: JwtAuthData = res.locals.jwt.data;
    const user = await UserService.fetchSingle(jwt.username);
    if (!user) {
      return ResponseService.notFound('User not found', res);
    }

    const preferences: Partial<PreferenceModelData> = req.body || null;
    if (!preferences) {
      return ResponseService.bad('Missing preferences data to update', res);
    }

    // update or add settings
    const success = await PreferenceService.upsert(user._id, preferences);
    if (!success) {
      return ResponseService.bad('Could not update preferences', res);
    }
    return ResponseService.ok('Preferences updated successfully', res);
  },
};
