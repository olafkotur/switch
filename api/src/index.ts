import 'colors'
import express from 'express'
import { config } from './config'
import { ApplicationHandler } from './handlers/application'
import { SettingsHandler } from './handlers/settings'
import { UserHandler } from './handlers/user'
import { DatabaseService } from './services/database'
import { ResponseService } from './services/response'
import { SecurityService } from './services/security'

export const database = DatabaseService

const app: express.Application = express()
const cors = require('cors')

/**
 * Connect api and setup handlers.
 */
const main = async (): Promise<void> => {
  // connect to database
  const success = await database.connect(config.mongoUri)
  exports.database = database
  if (!success) {
    return console.error('Failed to establish database connection, halting')
  }

  // middleware
  app.use(express.urlencoded({ extended: false, limit: '10mb' }))
  app.use(express.json())
  app.use(cors())

  // custom middleware
  app.use(async (req, res, next) => {
    console.log(`Request :: ${req.method} ${req.url} (${req.ip})`)

    // skip verify on some urls
    if (config.noVerifyUrls.includes(req.url)) next()

    // decode and verify jwt token
    const jwtToken = (req.headers.authorization || '').replace('Bearer ', '')
    const jwtResponse = await SecurityService.verifyToken(jwtToken)
    if (jwtResponse.error) {
      const message =
        jwtResponse.error === 'TokenExpiredError'
          ? 'Token Expired'
          : 'Invalid authorization'
      return ResponseService.unauthorized(message, res)
    }

    res.locals.jwt = jwtResponse
    next()
  })

  // setup endpoints
  setupUserHandlers()
  setupSettingsHandler()
  setupApplicationHandler()

  app.listen(config.port, () =>
    console.log(`API listening on port ${config.port.red}`.cyan),
  )
}

/**
 * Setup user handler endpoints.
 */
const setupUserHandlers = (): void => {
  app.post('/api/user/login', UserHandler.login)
  app.post('/api/user/refresh', UserHandler.refresh)
  app.post('/api/user/create', UserHandler.createUser)
  app.get('/api/user/profile', UserHandler.fetchProfile)
}

const setupSettingsHandler = (): void => {
  app.get('/api/settings', SettingsHandler.fetch)
  app.post('/api/settings/update', SettingsHandler.upsert)
}

const setupApplicationHandler = (): void => {
  app.get('/api/application', ApplicationHandler.fetch)
  app.post('/api/application/create', ApplicationHandler.create)
  app.post('/api/application/update', ApplicationHandler.update)
}

main()
