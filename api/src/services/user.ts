import { Types } from 'mongoose';
import { UserModel, UserModelData } from '../models';
import { PreferenceService } from './preference';

export const UserService = {
  /**
   * Fetches single user by email.
   * @param email - email addreess
   */
  fetchSingle: async (email: string): Promise<UserModelData | null> => {
    const user = await UserModel.findOne({ email });
    return user || null;
  },

  /**
   * Fetches single user by credentials
   * @param email - email addreess
   * @param password - hashed user password
   */
  fetchByCredentials: async (email: string, password: string): Promise<UserModelData | null> => {
    const user = await UserModel.findOne({ email, password });
    return user || null;
  },

  /**
   * Fetches single user by email
   * @param email - email addreess
   */
  fetchByEmail: async (email: string): Promise<UserModelData | null> => {
    const user = await UserModel.findOne({ email });
    return user || null;
  },

  /**
   * Creates new user and saves in db.
   * @param email - email addreess
   * @param password - user password
   */
  createUser: async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    const exists = await UserModel.findOne({ email });
    if (exists) {
      return { success: false, message: 'User already exists' };
    }

    // define user model
    const data: UserModelData = {
      _id: Types.ObjectId(),
      email,
      password,
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
