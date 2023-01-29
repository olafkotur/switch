import { Request, Response } from 'express';
import { UserModelData } from '../models';
import { ResponseService, SecurityService, UserService } from '../services';

export const UserHandler = {
  /**
   * Fetch user data.
   * @param req - request object
   * @param res - response object
   */
  fetch: async (_req: Request, res: Response): Promise<void> => {
    const user: UserModelData = res.locals.user;
    const data = { username: user.username, avatar: user.avatar };
    return ResponseService.data(data, res);
  },

  /**
   * Login via username and password, return a JWT token.
   * @param req - request object
   * @param res - response object
   */
  login: async (req: Request, res: Response): Promise<void> => {
    const username = req.body.username || '';
    const password = req.body.password || '';
    if (!username || !password) {
      return ResponseService.bad('Missing username or password', res);
    }

    // check if user exists
    const hashedPassword = SecurityService.hash(password);
    const user = await UserService.fetchByCredentials(username, hashedPassword);
    if (!user) {
      return ResponseService.notFound('Invalid username or password', res);
    }

    // generate a jwt token for the user
    const accessToken = SecurityService.generateToken(username, hashedPassword, 'access');
    const refreshToken = SecurityService.generateToken(username, hashedPassword, 'refresh');
    return ResponseService.data({ accessToken, refreshToken }, res);
  },

  /**
   * Refresh JWT access token.
   * @param req - request object
   * @param res - response object
   */
  refresh: async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.body.refreshToken || '';
    const refreshResponse = await SecurityService.refreshToken(refreshToken);
    if (!refreshResponse) {
      return ResponseService.unauthorized('Invalid refresh token', res);
    }

    const jwtResponse = await SecurityService.verifyToken(refreshResponse.accessToken);
    const user = await UserService.fetchSingle(jwtResponse.data.username);
    if (!user) {
      return ResponseService.notFound('User not found', res);
    }

    return ResponseService.data(refreshResponse, res);
  },

  /**
   * Register a new user via username and password.
   * @param req - request object
   * @param res - response object
   */
  createUser: async (req: Request, res: Response): Promise<void> => {
    const username = req.body.username || '';
    const password = req.body.password || '';
    const avatar = req.body.avatar || '';
    if (!username || !password) {
      return ResponseService.bad('Missing username or password', res);
    }

    // check password strength
    const validPassword = SecurityService.validatePassword(password);
    if (!validPassword) {
      return ResponseService.bad(
        'Password must contain at least 8 characters, one lowercase and uppercase letter and one special character',
        res,
      );
    }

    // check if user exists
    const user = await UserService.fetchSingle(username);
    if (user) {
      return ResponseService.bad('Username has already been taken', res);
    }

    // create new user
    const hashedPassword = SecurityService.hash(password);
    const result = await UserService.createUser(username, hashedPassword, avatar);
    if (!result.success) {
      return ResponseService.bad(result.message || 'Unknown error occurred', res);
    }

    // generate a jwt token for the user
    const accessToken = SecurityService.generateToken(username, hashedPassword, 'access');
    const refreshToken = SecurityService.generateToken(username, hashedPassword, 'refresh');

    return ResponseService.create({ accessToken, refreshToken }, res);
  },
};
