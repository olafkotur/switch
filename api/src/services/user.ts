import { Types } from 'mongoose';
import { UserModel, UserModelData } from '../models';
import { PreferenceService } from './preference';

export const UserService = {
  /**
   * Fetches single user by username.
   * @param username - user name
   */
  fetchSingle: async (username: string): Promise<UserModelData | null> => {
    const user = await UserModel.findOne({ username });
    return user || null;
  },

  /**
   * Fetches single user by credentials
   * @param username - user name
   * @param password - hashed user password
   */
  fetchByCredentials: async (username: string, password: string): Promise<UserModelData | null> => {
    const user = await UserModel.findOne({ username, password });
    return user || null;
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
    const exists = await UserModel.findOne({ username });
    if (exists) {
      return { success: false, message: 'User already exists' };
    }

    // define user model
    const data: UserModelData = {
      _id: Types.ObjectId(),
      username,
      password,
      avatar,
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    // create new user
    const user = await UserModel.create(data);
    const success = user._id != null;

    // create default user preferences
    if (success) {
      await PreferenceService.create(user._id);
    }

    return { success, message: 'Could not create a user' };
  },
};
