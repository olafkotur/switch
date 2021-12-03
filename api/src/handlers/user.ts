import express from 'express';
import { ResponseService } from '../services/response';
import { SecurityService } from '../services/security';
import { UserService } from '../services/user';

export const UserHandler = {
  /**
   * Login via email and password, return a JWT token.
   * @param req - request object
   * @param res - response object
   */
  login: async (req: express.Request, res: express.Response): Promise<void> => {
    const email = req.body.email || '';
    const password = req.body.password || '';
    if (!email || !password) {
      return ResponseService.bad('Missing email or password', res);
    }

    // generate a jwt token for the user
    const hashedPassword = SecurityService.encrypt(password);
    const accessToken = SecurityService.generateToken(email, hashedPassword, 'access');
    const refreshToken = SecurityService.generateToken(email, hashedPassword, 'refresh');
    return ResponseService.data({ accessToken, refreshToken }, res);
  },

  /**
   * Refresh JWT access token.
   * @param req - request object
   * @param res - response object
   */
  refresh: async (req: express.Request, res: express.Response): Promise<void> => {
    const refreshToken = req.body.refreshToken || '';
    const refreshResponse = await SecurityService.refreshToken(refreshToken);
    if (!refreshResponse) {
      return ResponseService.unauthorized('Invalid refresh token', res);
    }
    return ResponseService.data(refreshResponse, res);
  },

  /**
   * Register a new user via email and password.
   * @param req - request object
   * @param res - response object
   */
  createUser: async (req: express.Request, res: express.Response): Promise<void> => {
    const email = req.body.email || '';
    const password = req.body.password || '';
    if (!email || !password) {
      return ResponseService.bad('Missing email or password', res);
    }

    // create new user
    const hashedPassword = SecurityService.encrypt(password);
    const result = await UserService.createUser(email, hashedPassword);
    if (!result.success) {
      return ResponseService.bad(result.message || 'Unknown error occurred', res);
    }

    return ResponseService.create('User created successfully', res);
  },

  /**
   * Fetch user profile data.
   * @param req - request object
   * @param res - response object
   */
  fetchProfile: async (req: express.Request, res: express.Response): Promise<void> => {
    const jwtToken = (req.headers.authorization || '').replace('Bearer ', '');
    const jwtResponse = await SecurityService.verifyToken(jwtToken);
    if (jwtResponse.error) {
      const message = jwtResponse.error === 'TokenExpiredError' ? 'Token Expired' : 'Invalid authorization';
      return ResponseService.unauthorized(message, res);
    }

    const data = { email: jwtResponse.data.email };
    return ResponseService.data(data, res);
  },
};
