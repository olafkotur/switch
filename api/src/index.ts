import 'colors';
import express from 'express';
import { MONGO_NAME, MONGO_URI, NO_VERIFY_URLS, PORT } from './const';
import { DatabaseService } from './services/database';
import { ResponseService } from './services/response';
import { SecurityService } from './services/security';

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
    if (NO_VERIFY_URLS.includes(req.url)) next();

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

  app.listen(PORT, () => console.log(`API listening on port ${PORT}`.cyan));
};

main();
