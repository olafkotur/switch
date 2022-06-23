import { Types } from 'mongoose'
import { IApplicationModel } from '../typings/models'
import { DatabaseService } from './database'

export const ApplicationService = {
  /**
   * Fetches application list.
   * @param username - user name
   */
  fetch: async (username: string): Promise<IApplicationModel[] | null> => {
    // find user
    const user = await DatabaseService.getCollection('users').findOne({
      username,
    })
    if (!user || !user._id) {
      return null
    }

    // fetch applications
    const applications = await DatabaseService.getCollection('applications')
      .find({
        userId: user._id,
      })
      .toArray()
    return applications
  },

  /**
   * Create new application.
   * @param username - user name
   * @param url - app url
   * @param order - app order
   * @param icon - app icon
   */
  create: async (args: {
    username: string
    url: string
    order: number
    icon?: string
  }): Promise<boolean> => {
    // find user
    const user = await DatabaseService.getCollection('users').findOne({
      username: args.username,
    })
    if (!user || !user._id) {
      return false
    }

    const col = DatabaseService.getCollection('applications')
    const data: IApplicationModel = {
      userId: user._id,
      url: args.url,
      order: args.order,
      icon: args.icon,
      updatedAt: new Date(),
      createdAt: new Date(),
    }

    const result = await col.insertOne(data)
    return result.result.ok === 1
  },

  /**
   * Update existing application.
   * @param id - app id
   * @param url - app url
   * @param order - app order
   * @param icon - app icon
   */
  update: async (args: {
    id: string
    url: string
    order: number
    icon: string
  }): Promise<boolean> => {
    // find application
    const _id = new Types.ObjectId(args.id)
    const col = DatabaseService.getCollection('applications')
    const application = await col.findOne({ _id })
    if (!application || !application._id) {
      return false
    }

    const data: Partial<IApplicationModel> = {
      url: args.url,
      order: args.order,
      icon: args.icon,
      updatedAt: new Date(),
    }

    const result = await col.updateOne({ _id }, { $set: { ...data } })
    return result.result.ok === 1
  },
}
