import { ObjectId } from 'mongodb';
import { model, Schema } from 'mongoose';
import { ModelBase } from '../typings';

export interface ModuleModelData extends ModelBase {
  url: string;
  favicon: string;
}

const schema = new Schema({
  _id: { type: ObjectId, required: true, index: true },
  url: { type: String, required: true },
  favicon: { type: String },
  updatedAt: { type: Date, required: true },
  createdAt: { type: Date, required: true },
});

export const ModuleModel = model<ModuleModelData>('modules', schema);
