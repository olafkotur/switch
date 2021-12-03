import { config } from '../config';
import { IProfileData } from '../typings/data';
import { RequestService } from './request';
import { StorageService } from './storage';

export const UserService = {
  /**
   * Authenticate existing user.
   */
  login: async (email: string, password: string): Promise<void> => {
    const response = await RequestService.post(`${config.apiUrl}/user/login`, {
      email,
      password,
    });

    // save token to local storage
    if (response.result.status === 200) {
      await StorageService.set('jwtTokens', { ...response.result.data });
    }
  },

  /**
   * Create a new user account.
   */
  createUser: async (): Promise<void> => {},

  /**
   * Fetch existing user account profile data.
   */
  fetchProfile: async (): Promise<IProfileData | null> => {
    const response = await RequestService.get(
      `${config.apiUrl}/api/user/profile`,
    );
    if (response.result.code === 200) {
      return response.result.data;
    }
    return null;
  },
};
