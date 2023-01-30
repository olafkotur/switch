import { ObjectId } from 'mongodb';
import { model, Schema } from 'mongoose';
import { ModelBase } from '../typings';

export interface UserModelData extends ModelBase {
  username: string;
  password: string;
}

const schema = new Schema({
  _id: { type: ObjectId, required: true, index: true },
  username: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  updatedAt: { type: Date, required: true },
  createdAt: { type: Date, required: true },
});

export const UserModel = model<UserModelData>('users', schema);
