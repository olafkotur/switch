import * as _ from 'lodash'
import { config } from '../config'
import { IStoredData } from '../typings/d'
import { IApplicationData } from '../typings/data'
import { RequestService } from './request'
import { StorageService } from './storage'

const STORAGE_KEY = 'applications'

export const ApplicationService = {
  /**
   * Fetches list of menu items, fetches remote and uses local as backup
   */
  fetch: async (): Promise<IApplicationData[]> => {
    const remote = await RequestService.get(`${config.apiUrl}/api/application`)

    // always preference for remote
    if (remote.result.data) {
      await StorageService.set(STORAGE_KEY, remote.result.data as object) // update local
      return remote.result.data as IApplicationData[]
    }

    const res: IStoredData<IApplicationData> | null = (await StorageService.get(
      STORAGE_KEY,
    )) as IStoredData<IApplicationData> | null
    return res && res.data ? res.data : []
  },

  /**
   * Creates a new application.
   * @param url - app url
   * @param icon - app icon
   */
  create: async (args: { url: string; icon?: string }): Promise<boolean> => {
    const formattedUrl =
      args.url.includes('http://') || args.url.includes('https://')
        ? args.url
        : `https://${args.url}`

    const data: Partial<IApplicationData> = {
      url: formattedUrl,
      icon: args.icon,
    }
    const response = await RequestService.post(
      `${config.apiUrl}/api/application/create`,
      data,
    )
    return response.result.code === 201
  },

  /**
   * Updates existing applications.
   * @param data - applications
   */
  update: async (data: IApplicationData[]): Promise<boolean> => {
    const response = await RequestService.put(
      `${config.apiUrl}/api/application/update`,
      data,
    )
    return response.result.code === 200
  },

  /**
   * Deletes target application.
   * @param _id - app id
   */
  delete: async (_id: string): Promise<boolean> => {
    const response = await RequestService.delete(
      `${config.apiUrl}/api/application/delete`,
      { id: _id },
    )
    return response.result.code === 200
  },

  /**
   * Handles re-ordering logic of applications, does not update in db
   * @param _id - application id
   * @param order - new application order
   */
  reorder: async (args: {
    _id: string
    order: number
  }): Promise<IApplicationData[]> => {
    // TODO: may cause performance issues, consider using local cache instead
    const applications = await ApplicationService.fetch()

    // separate target from the group
    const excludedData = applications.filter((v) => v._id !== args._id)
    const toUpdate = applications.find(
      (v) => v._id === args._id,
    ) as IApplicationData

    // order and update
    const reorderedData: IApplicationData[] = []
    _.sortBy(excludedData, 'order').forEach((v, i) => {
      i === args.order ? reorderedData.push(toUpdate, v) : reorderedData.push(v)
    })
    args.order > excludedData.length - 1 && reorderedData.push(toUpdate)
    return reorderedData.map((v, i) => ({ ...v, order: i }))
  },
}
