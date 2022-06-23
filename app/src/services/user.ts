import { Dispatch } from '@reduxjs/toolkit'
import { config } from '../config'
import { DEFAULT_AVATAR } from '../icons'
import { setDialog, setError } from '../redux/interface'
import { setAuth, setProfile } from '../redux/user'
import { IProfile } from '../typings/user'
import { RequestService } from './request'
import { StorageService } from './storage'
import { UtilService } from './util'

export const UserService = {
  /**
   * Authenticate existing user.
   * @param username - user name
   * @param password - user password
   * @param dispatch - redux dispatch
   */
  login: async (
    username: string,
    password: string,
    dispatch: Dispatch,
  ): Promise<void> => {
    const response = await RequestService.post(
      `${config.apiUrl}/api/user/login`,
      {
        username,
        password,
      },
    )

    // save token to local storage
    if (response.result.code === 200 && response.result.data) {
      await StorageService.set('jwtTokens', {
        ...(response.result.data as object),
      })
    }

    // handle error messages
    if (response.result.code !== 200) {
      dispatch(setError(response.result.message || config.defaultError))
      return
    }

    // fetch profile data
    const profile = await UserService.fetchProfile()
    if (!profile) {
      dispatch(setError(response.result.message || config.defaultError))
      return
    }

    // update redux state
    dispatch(setProfile(profile))
    dispatch(setAuth(true))
    dispatch(setDialog(null))
  },

  /**
   * Create a new user account.
   * @param username - user name
   * @param password - user password
   * @param dispatch - redux dispatch
   */
  register: async (
    username: string,
    password: string,
    dispatch: Dispatch,
  ): Promise<void> => {
    const avatar = await UtilService.imgBase64(DEFAULT_AVATAR)
    const response = await RequestService.post(
      `${config.apiUrl}/api/user/create`,
      {
        username,
        password,
        avatar,
      },
    )

    // save token to local storage
    if (response.result.code === 201 && response.result.data) {
      await StorageService.set('jwtTokens', {
        ...(response.result.data as object),
      })
    }

    // handle error messages
    if (response.result.code !== 201) {
      dispatch(setError(response.result.message || 'Unexpected error occurred'))
      return
    }

    // update redux state
    dispatch(setProfile({ username, avatar }))
    dispatch(setAuth(true))
    dispatch(setDialog(null))
  },

  /**
   * Clears all tokens from local storage.
   * @param dispatch - redux dispatch
   */
  logout: async (dispatch: Dispatch): Promise<void> => {
    await StorageService.remove('jwtTokens')

    // update redux state
    dispatch(setAuth(false))
  },

  /**
   * Fetch existing user account profile data.
   */
  fetchProfile: async (): Promise<IProfile | null> => {
    const response = await RequestService.get(
      `${config.apiUrl}/api/user/profile`,
    )
    if (response.result.code === 200) {
      return response.result.data as IProfile | null
    }
    return null
  },
}
