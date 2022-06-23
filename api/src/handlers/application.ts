import express from 'express'
import { ApplicationService } from '../services/application'
import { ResponseService } from '../services/response'

export const ApplicationHandler = {
  /**
   * Fetch application list.
   * @param req - request object
   * @param res - response object
   */
  fetch: async (
    _req: express.Request,
    res: express.Response,
  ): Promise<void> => {
    const jwt = res.locals.jwt.data
    const data = await ApplicationService.fetch(jwt.username)
    if (data) {
      return ResponseService.data(data, res)
    }
    return ResponseService.notFound('Applications not found', res)
  },
}
