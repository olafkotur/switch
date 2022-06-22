import { database } from '..'
import { IUserModel } from '../typings/models'

export const UserService = {
  /**
   * Fetches single user by username.
   * @param username - user name
   */
  fetchSingle: async (username: string): Promise<IUserModel | null> => {
    const user = await database.getCollection('users').findOne({ username })
    return user || null
  },

  /**
   * Fetches single user by credentials
   * @param username - user name
   * @param password - hashed user password
   */
  fetchByCredentials: async (
    username: string,
    password: string,
  ): Promise<IUserModel | null> => {
    const user = await database
      .getCollection('users')
      .findOne({ username, password })
    return user || null
  },

  /**
   * Creates new user and saves in db.
   * @param username - user name
   * @param password - user password
   * @param avatar - user avatar
   */
  createUser: async (
    username: string,
    password: string,
    avatar: string,
  ): Promise<{ success: boolean; message?: string }> => {
    const exists = await database.getCollection('users').findOne({ username })
    if (exists) {
      return { success: false, message: 'User already exists' }
    }

    // define user model
    const data: IUserModel = {
      username,
      password,
      avatar,
      updatedAt: new Date(),
      createdAt: new Date(),
    }

    // create new user
    const res = await database.getCollection('users').insertOne(data)
    return { success: res.result.ok === 1 }
  },
}
