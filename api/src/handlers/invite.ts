import { Request, Response } from 'express';
import { UserModelData } from '../models';
import { InviteService, ResponseService, UserService, UtilService } from '../services';

export const InviteHandler = {
  /**
   * Fetches list of invited emails for a given user.
   * @param req - request object
   * @param res - response object
   */
  fetch: async (_req: Request, res: Response): Promise<void> => {
    const user: UserModelData = res.locals.user;
    const response = await InviteService.fetch(user._id);
    const data = response.map((invite) => ({ email: invite.email, createdAt: invite.createdAt }));

    return ResponseService.data(data, res);
  },

  /**
   * Send an invite to an email address.
   * @param req - request object
   * @param res - response object
   */
  create: async (req: Request, res: Response): Promise<void> => {
    const user: UserModelData = res.locals.user;
    const email = req.body.email || '';

    const isEmailValid = UtilService.validateEmail(email);
    if (isEmailValid === false) {
      return ResponseService.bad('Invite email is not valid', res);
    }

    const isAlreadyInvited = await InviteService.fetchByEmail(email);
    const isAlreadySignedUp = await UserService.fetchByEmail(email);
    if (isAlreadyInvited || isAlreadySignedUp) {
      return ResponseService.bad('Email is already invited', res);
    }

    // TODO: send an email to this user, TBC of how this can be done
    await InviteService.create(user._id, email);
    return ResponseService.ok('Invite sent!', res);
  },
};
