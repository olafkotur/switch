import express from 'express';
import { ResponseService } from '../services/response';
import { SecurityService } from '../services/security';
import { SettingsService } from '../services/settings';

export const SettingsHandler = {
  /**
   * Fetch user settings
   * @param req - request object
   * @param res - response object
   */
  fetch: async (req: express.Request, res: express.Response): Promise<void> => {
    const jwtToken = (req.headers.authorization || '').replace('Bearer ', '');
    const jwtResponse = await SecurityService.verifyToken(jwtToken);
    if (jwtResponse.error) {
      const message = jwtResponse.error === 'TokenExpiredError' ? 'Token Expired' : 'Invalid authorization';
      return ResponseService.unauthorized(message, res);
    }

    // fetch data from db
    const data = await SettingsService.fetch(jwtResponse.data.email);
    if (data) {
      return ResponseService.data(data, res);
    }
    return ResponseService.notFound('Settings not found', res);
  },
  /**
   * Update or add new user settings to the database.
   * @param req - request object
   * @param res - response object
   */
  upsert: async (req: express.Request, res: express.Response): Promise<void> => {
    const jwtToken = (req.headers.authorization || '').replace('Bearer ', '');
    const jwtResponse = await SecurityService.verifyToken(jwtToken);
    if (jwtResponse.error) {
      const message = jwtResponse.error === 'TokenExpiredError' ? 'Token Expired' : 'Invalid authorization';
      return ResponseService.unauthorized(message, res);
    }

    // get settings from request body
    const settings = req.body || null;
    if (!settings) {
      return ResponseService.bad('Invalid settings object provided', res);
    }

    // update or add settings
    const success = await SettingsService.upsert(jwtResponse.data.email, settings);
    if (success) {
      return ResponseService.ok('Settings updated successfully', res);
    }
    return ResponseService.bad('Failed to update settings', res);
  },
};
