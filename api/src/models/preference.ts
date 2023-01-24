import { ObjectId } from 'mongodb';
import { model, Schema } from 'mongoose';
import { ModelBase } from '../typings';

export interface PreferenceModelData extends ModelBase {}

const schema = new Schema({
  _id: { type: ObjectId, required: true, index: true },
  updatedAt: { type: Date, required: true },
  createdAt: { type: Date, required: true },
});

export const PreferenceModel = model<PreferenceModelData>('preferences', schema);
