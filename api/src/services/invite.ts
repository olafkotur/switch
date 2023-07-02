import { Types } from 'mongoose';
import { EMAIL_USERNAME } from '../const';
import { InviteModel, InviteModelData } from '../models';
import { EmailService } from './email';

export const InviteService = {
  /**
   * Fetches list of invites.
   * @param userId - user id
   */
  fetch: async (userId: Types.ObjectId): Promise<InviteModelData[]> => {
    return await InviteModel.find({ userId }).sort({ createdAt: -1 });
  },

  /**
   * Fetches single invite by email address.
   * @param email - email address
   */
  fetchByEmail: async (email: string): Promise<InviteModelData | null> => {
    return await InviteModel.findOne({ email });
  },

  /**
   * Create a new invite.
   * @param userId - user id
   * @param email - invited email address
   *
   */
  create: async (userId: Types.ObjectId, email: string): Promise<InviteModelData> => {
    const data: InviteModelData = {
      _id: Types.ObjectId(),
      userId,
      email,
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    // send invite email
    await EmailService.send({
      to: email,
      from: EMAIL_USERNAME,
      subject: "You've been invited to Switch",
      html: 'Hello World',
    });

    return await InviteModel.create(data);
  },
};
