import 'colors';
import express from 'express';
import { MONGO_NAME, MONGO_URI, NO_VERIFY_URLS, PORT } from './const';
import { ModuleHandler } from './handlers/module';
import { PreferenceHandler } from './handlers/preference';
import { UserHandler } from './handlers/user';
import { DatabaseService, ResponseService, SecurityService } from './services';

export const database = DatabaseService;

const app: express.Application = express();
const cors = require('cors');

/**
 * Connect api and setup handlers.
 */
const main = async (): Promise<void> => {
  // connect to database
  const success = await database.connect({ uri: MONGO_URI, name: MONGO_NAME });
  exports.database = database;
  if (!success) {
    return console.error('Failed to establish database connection, halting');
  }

  // middleware
  app.use(express.urlencoded({ extended: false, limit: '10mb' }));
  app.use(express.json());
  app.use(cors());

  // custom middleware
  app.use(async (req, res, next) => {
    console.log(`Request :: ${req.method} ${req.url} (${req.ip})`);

    // skip verify on some urls
    if (NO_VERIFY_URLS.includes(req.url)) {
      return next();
    }

    // decode and verify jwt token
    const jwtToken = (req.headers.authorization || '').replace('Bearer ', '');
    const jwtResponse = await SecurityService.verifyToken(jwtToken);
    if (jwtResponse.error) {
      const message = jwtResponse.error === 'TokenExpiredError' ? 'Token Expired' : 'Invalid authorization';
      return ResponseService.unauthorized(message, res);
    }

    res.locals.jwt = jwtResponse;
    next();
  });

  // setup endpoints
  setupUserHandlers();
  setupModuleHandlers();
  setupPreferenceHandlers();

  app.listen(PORT, () => console.log(`API listening on port ${PORT}`.cyan));
};

const setupUserHandlers = (): void => {
  app.post('/user/login', UserHandler.login);
  app.post('/user/refresh', UserHandler.refresh);
  app.post('/user/create', UserHandler.createUser);
  app.get('/user/profile', UserHandler.fetchProfile);
};

const setupModuleHandlers = (): void => {
  app.get('/module', ModuleHandler.fetch);
  app.post('/module/create', ModuleHandler.create);
  app.delete('/module/delete', ModuleHandler.delete);
};

const setupPreferenceHandlers = (): void => {
  app.get('/preference', PreferenceHandler.fetch);
  app.post('/preference/update', PreferenceHandler.upsert);
};

main();
