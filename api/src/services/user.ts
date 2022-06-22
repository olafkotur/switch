import { database } from '..';
import { IUserModel } from '../typings/models';

export const UserService = {
  /**
   * Fetches single user by email.
   * @param email - user email
   */
  fetchSingle: async (email: string): Promise<IUserModel | null> => {
    const user = await database.getCollection('users').findOne({ email });
    return user || null;
  },

  /**
   * Fetches single user by credentials
   * @param email - user email
   * @param password - hashed user password
   */
  fetchByCredentials: async (email: string, password: string): Promise<IUserModel | null> => {
    const user = await database.getCollection('users').findOne({ email, password });
    return user || null;
  },

  /**
   * Creates new user and saves in db.
   * @param email - user email
   * @param password - user password
   */
  createUser: async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    const exists = await database.getCollection('users').findOne({ email });
    if (exists) {
      return { success: false, message: 'User already exists' };
    }

    // define user model
    const data: IUserModel = {
      email,
      password,
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    // create new user
    const res = await database.getCollection('users').insertOne(data);
    return { success: res.result.ok === 1 };
  },
};
