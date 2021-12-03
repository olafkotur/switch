import { Dispatch } from '@reduxjs/toolkit';
import { config } from '../config';
import { setDialog, setError } from '../redux/interface';
import { setAuth, setEmail } from '../redux/user';
import { IProfileData } from '../typings/data';
import { RequestService } from './request';
import { StorageService } from './storage';

export const UserService = {
  /**
   * Authenticate existing user.
   * @param email - user email
   * @param password - user password
   * @param dispatch - redux dispatch
   */
  login: async (
    email: string,
    password: string,
    dispatch: Dispatch,
  ): Promise<void> => {
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

    // handle error messages
    if (response.result.code !== 200) {
      dispatch(
        setError(response.result.message || 'Unexpected error occurred'),
      );
      return;
    }

    // update redux state
    dispatch(setEmail(email));
    dispatch(setAuth(true));
    dispatch(setDialog(null));
  },

  /**
   * Create a new user account.
   * @param email - user email
   * @param password - user password
   * @param dispatch - redux dispatch
   */
  register: async (
    email: string,
    password: string,
    dispatch: Dispatch,
  ): Promise<void> => {
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

    // handle error messages
    if (response.result.code !== 201) {
      dispatch(
        setError(response.result.message || 'Unexpected error occurred'),
      );
      return;
    }

    // update redux state
    dispatch(setEmail(email));
    dispatch(setAuth(true));
    dispatch(setDialog(null));
  },

  /**
   * Clears all tokens from local storage.
   * @param dispatch - redux dispatch
   */
  logout: async (dispatch: Dispatch): Promise<void> => {
    await StorageService.remove('jwtTokens');

    // update redux state
    dispatch(setAuth(false));
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
