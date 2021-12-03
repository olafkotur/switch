import express from 'express';
import { config } from './config';
import { UserHandler } from './handlers/user';
import { DatabaseService } from './services/database';
import { SettingsHandler } from './handlers/settings';
import _ from 'lodash';

export const database = DatabaseService;

const app: express.Application = express();
const cors = require('cors');

/**
 * Connect api and setup handlers.
 */
const main = async (): Promise<void> => {
  // connect to database
  const success = await database.connect(config.mongoUri);
  exports.database = database;
  if (!success) {
    return console.error('Failed to establish database connection, halting');
  }

  // middleware
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());

  // custom middleware
  app.use(async (req, res, next) => {
    console.log(`Request :: ${req.method} ${req.url} (${req.ip})`);
    next();
  });

  // setup endpoints
  setupUserHandlers();
  setupSettingsHandler();

  app.listen(config.port, () => console.log(`API listening on port ${config.port}`));
};

/**
 * Setup user handler endpoints.
 */
const setupUserHandlers = (): void => {
  app.post('/api/user/login', UserHandler.login);
  app.post('/api/user/refresh', UserHandler.refresh);
  app.post('/api/user/create', UserHandler.createUser);
  app.get('/api/user/profile', UserHandler.fetchProfile);
};

const setupSettingsHandler = (): void => {
  app.get('/api/settings', SettingsHandler.fetch);
  app.post('/api/settings/update', SettingsHandler.upsert);
};

main();
