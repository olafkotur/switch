import express from 'express';
import { LOGS_DISCORD_HOOK, MONGO_NAME, MONGO_URL, NO_VERIFY_URLS, PORT } from './const';
import { InviteHandler, ModuleHandler, PreferenceHandler, SuggestionHandler, UserHandler } from './handlers';
import { DatabaseService, DiscordService, ResponseService, SecurityService, UserService } from './services';

export const database = DatabaseService;

const app: express.Application = express();
const cors = require('cors');

/**
 * Connect api and setup handlers.
 */
const main = async (): Promise<void> => {
  captureLogs();

  // connect to database
  const success = await database.connect({ uri: MONGO_URL, name: MONGO_NAME });
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

    const user = await UserService.fetchSingle(jwtResponse.data.email);
    if (!user) {
      return ResponseService.notFound('User not found', res);
    }

    res.locals.user = user;
    res.locals.jwt = jwtResponse;
    next();
  });

  // setup endpoints
  setupUserHandlers();
  setupModuleHandlers();
  setupPreferenceHandlers();
  setupSuggestionHandlers();
  setupInviteHandlers();

  app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
};

const captureLogs = (): void => {
  const originalInfo = console.info;
  console.info = async (...args) => {
    const msg = `:information_source: Captured \`console.info\` event\`\`\`${args.join(' ')}\`\`\`\u200B`;
    await DiscordService.message(msg, LOGS_DISCORD_HOOK);
    originalInfo.apply(console, args);
  };

  const originalError = console.error;
  console.error = async (...args) => {
    const msg = `:fire: Captured \`console.error\` event\`\`\`${args.join(' ')}\`\`\`\u200B`;
    await DiscordService.message(msg, LOGS_DISCORD_HOOK);
    originalError.apply(console, args);
  };
};

const setupUserHandlers = (): void => {
  app.get('/user', UserHandler.fetch);
  app.post('/user/login', UserHandler.login);
  app.post('/user/refresh', UserHandler.refresh);
  app.post('/user/create', UserHandler.createUser);
};

const setupModuleHandlers = (): void => {
  app.get('/module', ModuleHandler.fetch);
  app.post('/module/create', ModuleHandler.create);
  app.post('/module/update', ModuleHandler.update);
  app.delete('/module/delete', ModuleHandler.delete);
};

const setupPreferenceHandlers = (): void => {
  app.get('/preferences', PreferenceHandler.fetch);
  app.post('/preferences/update', PreferenceHandler.update);
};

const setupSuggestionHandlers = (): void => {
  app.get('/suggestions', SuggestionHandler.fetch);
};

const setupInviteHandlers = (): void => {
  app.get('/invites', InviteHandler.fetch);
  app.post('/invites/create', InviteHandler.create);
};

main();
