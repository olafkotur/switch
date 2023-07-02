import { InviteModel, UserModel } from './models';

/**
 * Date: July 2, 2023
 * Reason: Introduced `registered` flag to the InviteModel
 * Affected: All records in the InviteModel updated with a new `registered` value
 */
export const setRegisteredFlag = async () => {
  const invites = await InviteModel.find({ registered: null as any });

  for (const invite of invites) {
    const registered = await UserModel.exists({ email: invite.email });
    await InviteModel.updateOne({ _id: invite._id }, { $set: { registered } });
  }

  console.info(`setRegisteredFlag :: Updated ${invites.length} records`);
};
