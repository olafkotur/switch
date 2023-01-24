import { Request, Response } from 'express';
import { ResponseService } from '../services/response';
import { SecurityService } from '../services/security';
import { UserService } from '../services/user';

export const UserHandler = {
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
};
