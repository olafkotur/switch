import { ObjectId } from 'mongodb';
import { model, Schema, Types } from 'mongoose';
import { ModelBase } from '../typings';

export interface InviteModelData extends ModelBase {
  userId: Types.ObjectId;
  email: string;
}

const schema = new Schema({
  _id: { type: ObjectId, required: true },
  userId: { type: ObjectId, required: true },
  email: { type: String, required: true, unique: true },
  updatedAt: { type: Date, required: true },
  createdAt: { type: Date, required: true },
});

export const InviteModel = model<InviteModelData>('invites', schema);
