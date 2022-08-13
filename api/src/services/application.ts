import { Types } from 'mongoose'
import { IApplicationData } from '../../../app/oldsrc/typings/data'
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
   * @param icon - app icon
   */
  create: async (args: {
    username: string
    url: string
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
    const existingCount = await col.find({ userId: user._id }).count()
    const order = existingCount + 1

    const data: IApplicationModel = {
      userId: user._id,
      url: args.url,
      order,
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
  update: async (data: IApplicationData[]): Promise<boolean> => {
    const col = DatabaseService.getCollection('applications')

    // TODO: convert to bulk update once this becomes an issue
    const results: boolean[] = []
    for (const application of data) {
      const updateData: Partial<IApplicationModel> = {
        url: application.url,
        icon: application.icon,
        order: application.order,
        updatedAt: new Date(),
      }
      const _id = new Types.ObjectId(application._id)
      const result = await col.updateOne({ _id }, { $set: { ...updateData } })
      results.push(result.result.ok === 1)
    }

    return results.every((v) => v === true)
  },

  /**
   * Delete existing application.
   * @param id - app id
   */
  delete: async (id: string): Promise<boolean> => {
    const col = DatabaseService.getCollection('applications')
    const _id = new Types.ObjectId(id)
    const result = await col.deleteOne({ _id })
    return result.result.ok === 1
  },
}
