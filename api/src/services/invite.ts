import { Types } from 'mongoose';
import { EMAIL_USERNAME, INVITE_EMAIL } from '../const';
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
      registered: false,
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    // send invite email
    await EmailService.send({
      to: email,
      from: EMAIL_USERNAME,
      subject: "You've been invited to Switch",
      html: INVITE_EMAIL,
    });

    return await InviteModel.create(data);
  },

  /**
   * Update existing new invite.
   * @param _id - invite id
   * @param registered - registered
   *
   */
  update: async (_id: Types.ObjectId, registered: boolean): Promise<boolean> => {
    const result = await InviteModel.updateOne({ _id }, { $set: { registered } });
    return result.ok === 1;
  },
};
