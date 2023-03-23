import { Request, Response } from 'express';
import { UserModelData } from '../models';
import { InviteService, ResponseService, SecurityService, UserService, UtilService } from '../services';

export const UserHandler = {
  /**
   * Fetch user data.
   * @param req - request object
   * @param res - response object
   */
  fetch: async (_req: Request, res: Response): Promise<void> => {
    const user: UserModelData = res.locals.user;
    const data = { email: user.email };
    return ResponseService.data(data, res);
  },

  /**
   * Login via email and password, return a JWT token.
   * @param req - request object
   * @param res - response object
   */
  login: async (req: Request, res: Response): Promise<void> => {
    const email = req.body.email || '';
    const password = req.body.password || '';
    if (!email || !password) {
      return ResponseService.bad('Missing email or password', res);
    }

    // check if user exists
    const hashedPassword = SecurityService.hash(password);
    const user = await UserService.fetchByCredentials(email, hashedPassword);
    if (!user) {
      return ResponseService.notFound('Invalid email or password', res);
    }

    // generate a jwt token for the user
    const accessToken = SecurityService.generateToken(email, hashedPassword, 'access');
    const refreshToken = SecurityService.generateToken(email, hashedPassword, 'refresh');
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
    const user = await UserService.fetchSingle(jwtResponse.data.email);
    if (!user) {
      return ResponseService.notFound('User not found', res);
    }

    return ResponseService.data(refreshResponse, res);
  },

  /**
   * Register a new user via email and password.
   * @param req - request object
   * @param res - response object
   */
  createUser: async (req: Request, res: Response): Promise<void> => {
    const email = req.body.email || '';
    const password = req.body.password || '';

    const isEmailValid = UtilService.validateEmail(email);
    if (!isEmailValid) {
      return ResponseService.bad('Email is not valid', res);
    }

    const isPasswordValid = SecurityService.validatePassword(password);
    if (!isPasswordValid) {
      return ResponseService.bad(
        'Password must contain at least 8 characters, one lowercase and uppercase letter and one special character',
        res,
      );
    }

    // check if user exists
    const user = await UserService.fetchSingle(email);
    if (user) {
      return ResponseService.bad('Email is already registered', res);
    }

    // check if user is invited
    const isUserInvited = await InviteService.fetchByEmail(email);
    if (!isUserInvited) {
      return ResponseService.notFound(
        'Switch is currently invite only, an existing user must first send you an invitation before you sign up',
        res,
      );
    }

    // create new user
    const hashedPassword = SecurityService.hash(password);
    const result = await UserService.createUser(email, hashedPassword);
    if (!result.success) {
      return ResponseService.bad(result.message || 'Could not create user', res);
    }

    // generate a jwt token for the user
    const accessToken = SecurityService.generateToken(email, hashedPassword, 'access');
    const refreshToken = SecurityService.generateToken(email, hashedPassword, 'refresh');

    return ResponseService.create({ accessToken, refreshToken }, res);
  },
};
