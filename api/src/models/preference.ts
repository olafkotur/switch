import { ObjectId } from 'mongodb';
import { model, Schema, Types } from 'mongoose';
import { ModelBase } from '../typings';

export interface PreferenceModelData extends ModelBase {
  userId: Types.ObjectId;
  theme: 'light' | 'dark';
}

const schema = new Schema({
  _id: { type: ObjectId, required: true, index: true },
  userId: { type: ObjectId, required: true, index: true },
  theme: { type: String, required: true },
  updatedAt: { type: Date, required: true },
  createdAt: { type: Date, required: true },
});

export const PreferenceModel = model<PreferenceModelData>('preferences', schema);
