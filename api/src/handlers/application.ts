import express from 'express'
import { IApplicationData } from '../../../app/oldsrc/typings/data'
import { ApplicationService } from '../services/application'
import { ResponseService } from '../services/response'
import { IAuth } from '../typings/data'

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
    const jwt: IAuth = res.locals.jwt.data
    const data = await ApplicationService.fetch(jwt.username)
    if (data) {
      return ResponseService.data(data, res)
    }
    return ResponseService.notFound('Applications not found', res)
  },

  /**
   * Create new application.
   * @param req - request object
   * @param res - response object
   */
  create: async (
    req: express.Request,
    res: express.Response,
  ): Promise<void> => {
    const jwt: IAuth = res.locals.jwt.data

    const url = req.body.url || ''
    const icon = req.body.icon || undefined
    if (!url) {
      return ResponseService.bad('Missing application details', res)
    }

    const success = await ApplicationService.create({
      username: jwt.username,
      url,
      icon,
    })
    if (success) {
      return ResponseService.create('Application created', res)
    }
    return ResponseService.bad('Unknown error occured', res)
  },

  /**
   * Update existing application.
   * @param req - request object
   * @param res - response object
   */
  update: async (
    req: express.Request,
    res: express.Response,
  ): Promise<void> => {
    const data = req.body as IApplicationData[]
    const success = await ApplicationService.update(data)
    if (success) {
      return ResponseService.ok(`${data.length} applications updated`, res)
    }
    return ResponseService.bad('Unknown error occured', res)
  },

  /**
   * Delete existing application.
   * @param req - request object
   * @param res - response object
   */
  delete: async (
    req: express.Request,
    res: express.Response,
  ): Promise<void> => {
    const id = req.body.id
    const success = await ApplicationService.delete(id)
    if (success) {
      return ResponseService.ok('Application deleted', res)
    }
    return ResponseService.bad('Unknown error occured', res)
  },
}
