import { ObjectId } from 'mongodb';
import { model, Schema, Types } from 'mongoose';
import { ModelBase } from '../typings';

export interface PreferenceModelData extends ModelBase {
  userId: Types.ObjectId;
  theme: 'light' | 'dark';
  overlayMode: boolean;
  disableOverlayPrompt: boolean;
  animatePresets: boolean;
}

const schema = new Schema({
  _id: { type: ObjectId, index: true },
  userId: { type: ObjectId, required: true, index: true, unique: true },
  theme: { type: String, required: true },
  overlayMode: { type: Boolean, required: true },
  disableOverlayPrompt: { type: Boolean, required: true },
  animatePresets: { type: Boolean, required: true },
  updatedAt: { type: Date, required: true },
  createdAt: { type: Date, required: true },
});

export const PreferenceModel = model<PreferenceModelData>('preferences', schema);
