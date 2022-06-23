import express from 'express'
import { ResponseService } from '../services/response'
import { SettingsService } from '../services/settings'
import { IAuth } from '../typings/data'

export const SettingsHandler = {
  /**
   * Fetch user settings
   * @param req - request object
   * @param res - response object
   */
  fetch: async (
    _req: express.Request,
    res: express.Response,
  ): Promise<void> => {
    const jwt: IAuth = res.locals.jwt.data
    const data = await SettingsService.fetch(jwt.username)
    if (data) {
      return ResponseService.data(data, res)
    }
    return ResponseService.notFound('Settings not found', res)
  },

  /**
   * Update or add new user settings to the database.
   * @param req - request object
   * @param res - response object
   */
  upsert: async (
    req: express.Request,
    res: express.Response,
  ): Promise<void> => {
    const jwt: IAuth = res.locals.jwt.data
    const settings = req.body || null
    if (!settings) {
      return ResponseService.bad('Invalid settings object provided', res)
    }

    // update or add settings
    const success = await SettingsService.upsert(jwt.username, settings)
    if (success) {
      return ResponseService.ok('Settings updated successfully', res)
    }
    return ResponseService.bad('Failed to update settings', res)
  },
}
