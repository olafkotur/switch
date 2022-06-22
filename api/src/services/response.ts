import dayjs from 'dayjs'
import express from 'express'
import { IResponse } from '../typings/response'

export const ResponseService = {
  /**
   * Send 200 response.
   * @param msg - message
   * @param res - response object
   */
  ok: (msg: string, res: express.Response): void => {
    const response: IResponse = {
      code: 200,
      status: 'ok',
      ...ResponseService.buildCommonResponse(),
      message: msg,
    }
    res.status(200)
    res.send(response)
  },

  /**
   * Send 201 response.
   * @param d - response data
   * @param res - response object
   */
  create: (d: unknown, res: express.Response): void => {
    const response: IResponse = {
      code: 201,
      status: 'created',
      ...ResponseService.buildCommonResponse(),
      data: d,
    }
    res.status(201)
    res.send(response)
  },

  /**
   * Send 400 response.
   * @param msg - message
   * @param res - response object
   */
  bad: (msg: string, res: express.Response): void => {
    const response: IResponse = {
      code: 400,
      status: 'bad request',
      ...ResponseService.buildCommonResponse(),
      message: msg,
    }
    res.status(400)
    res.send(response)
  },

  /**
   * Send 401 response.
   * @param msg - message
   * @param res - response object
   */
  unauthorized: (msg: string, res: express.Response): void => {
    const response: IResponse = {
      code: 401,
      status: 'unauthorized',
      ...ResponseService.buildCommonResponse(),
      message: msg,
    }
    res.status(401)
    res.send(response)
  },

  /**
   * Send 403 response.
   * @param msg - message
   * @param res - response object
   */
  forbidden: (msg: string, res: express.Response): void => {
    const response: IResponse = {
      code: 403,
      status: 'forbidden',
      ...ResponseService.buildCommonResponse(),
      message: msg,
    }
    res.status(403)
    res.send(response)
  },

  /**
   * Send 404 response.
   * @param msg - message
   * @param res - response object
   */
  notFound: (msg: string, res: express.Response): void => {
    const response: IResponse = {
      code: 404,
      status: 'not found',
      ...ResponseService.buildCommonResponse(),
      message: msg,
    }
    res.status(404)
    res.send(response)
  },

  /**
   * Send 200 data response.
   * @param d - response data
   * @param res - response object
   */
  data: (d: unknown, res: express.Response): void => {
    const response: IResponse = {
      code: 200,
      status: 'ok',
      ...ResponseService.buildCommonResponse(),
      data: d,
    }
    res.status(200)
    res.send(response)
  },

  /**
   * Send 301 response.
   * @param uri - redirect uri
   * @param res - response object
   */
  redirect: (uri: string, res: express.Response): void => {
    res.status(301)
    res.redirect(uri)
  },

  /**
   * Builds common parts of the response.
   */
  buildCommonResponse: (): { date: string; unix: number } => {
    return {
      date: dayjs().format('MMMM DD YYYY, hh:mm:ss'),
      unix: dayjs().unix(),
    }
  },
}
