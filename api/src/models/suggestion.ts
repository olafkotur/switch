import { ObjectId } from 'mongodb';
import { model, Schema } from 'mongoose';
import { ModelBase, SuggestionCategory } from '../typings';

export interface SuggestionModelData extends ModelBase {
  url: string;
  icon: string;
  category: SuggestionCategory;
}

const schema = new Schema({
  _id: { type: ObjectId, required: true, index: true },
  url: { type: String, required: false },
  icon: { type: String, required: true },
  category: { type: String, required: true },
  updatedAt: { type: Date, required: true },
  createdAt: { type: Date, required: true },
});

export const SuggestionModel = model<SuggestionModelData>('suggestions', schema);
