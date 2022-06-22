import { Types } from 'mongoose'

export type Collection = 'users' | 'settings'
export type SettingsMeta = { [name: string]: string | boolean | number }
interface IModelBase {
  updatedAt: Date
  createdAt: Date
}

export interface IUserModel extends IModelBase {
  username: string
  password: string
}

export interface ISettingsModel extends IModelBase {
  uid: Types.ObjectId
  meta: SettingsMeta
}
