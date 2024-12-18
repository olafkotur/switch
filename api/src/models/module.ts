import { ObjectId } from 'mongodb';
import { model, Schema, Types } from 'mongoose';
import { ModelBase } from '../typings';

export interface ModuleModelData extends ModelBase {
  userId: Types.ObjectId;
  url: string;
  icon: string;
  position: number;
}

const schema = new Schema({
  _id: { type: ObjectId, required: true },
  userId: { type: ObjectId, required: true },
  url: { type: String, required: false },
  icon: { type: String, required: true },
  position: { type: Number, required: true },
  updatedAt: { type: Date, required: true },
  createdAt: { type: Date, required: true },
});

export const ModuleModel = model<ModuleModelData>('modules', schema);
