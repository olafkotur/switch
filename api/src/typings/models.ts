import { Types } from 'mongoose'

export type Collection = 'users' | 'settings' | 'applications'
export type SettingsMeta = { [name: string]: string | boolean | number }
interface IModelBase {
  updatedAt: Date
  createdAt: Date
}

export interface IUserModel extends IModelBase {
  username: string
  password: string
  avatar: string // base64
}

export interface ISettingsModel extends IModelBase {
  userId: Types.ObjectId
  meta: SettingsMeta
}

export interface IApplicationModel extends IModelBase {
  userId: Types.ObjectId
  url: string
  order: number
  icon?: string
}
