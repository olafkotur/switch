import { config } from '../config';
import { IProfileData } from '../typings/data';
import { IResponseResult } from '../typings/response';
import { RequestService } from './request';
import { StorageService } from './storage';

export const UserService = {
  /**
   * Authenticate existing user.
   * @param email - user email
   * @param password - user password
   */
  login: async (email: string, password: string): Promise<IResponseResult> => {
    const response = await RequestService.post(
      `${config.apiUrl}/api/user/login`,
      {
        email,
        password,
      },
    );

    // save token to local storage
    if (response.result.code === 200 && response.result.data) {
      await StorageService.set('jwtTokens', {
        ...(response.result.data as object),
      });
    }

    return response.result;
  },

  /**
   * Create a new user account.
   * @param email - user email
   * @param password - user password
   */
  createUser: async (
    email: string,
    password: string,
  ): Promise<IResponseResult> => {
    const response = await RequestService.post(
      `${config.apiUrl}/api/user/create`,
      {
        email,
        password,
      },
    );

    // save token to local storage
    if (response.result.code === 200 && response.result.data) {
      await StorageService.set('jwtTokens', {
        ...(response.result.data as object),
      });
    }

    return response.result;
  },

  /**
   * Fetch existing user account profile data.
   */
  fetchProfile: async (): Promise<IProfileData | null> => {
    const response = await RequestService.get(
      `${config.apiUrl}/api/user/profile`,
    );
    if (response.result.code === 200) {
      return response.result.data as IProfileData | null;
    }
    return null;
  },
};
