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
}
