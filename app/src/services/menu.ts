import * as _ from 'lodash'
import { Icon, IMenuItem, IStoredData } from '../typings/d'
import { StorageService } from './storage'
import { UtilService } from './util'

const STORAGE_KEY = 'menuItems'

const defaultMenu: IMenuItem[] = [
  {
    id: 'default-notion',
    url: 'https://www.notion.so',
    order: 0,
    icon: require('../../assets/suggestions/notion.png'),
  },
  {
    id: 'default-messenger',
    url: 'https://www.messenger.com',
    order: 1,
    icon: require('../../assets/suggestions/messenger.png'),
  },
  {
    id: 'default-youtube',
    url: 'https://www.youtube.com',
    order: 2,
    icon: require('../../assets/suggestions/youtube.png'),
  },
]

export const MenuService = {
  /**
   * Fetches list of menu items
   */
  fetchList: async (): Promise<IMenuItem[]> => {
    const res: IStoredData<IMenuItem> | null = (await StorageService.get(
      STORAGE_KEY,
    )) as IStoredData<IMenuItem> | null
    return res && res.data ? res.data : defaultMenu
  },

  /**
   * Appends new menu items to the existing data
   * @param url - menu item url
   * @param icon - menu item icon
   */
  save: async (url: string, icon?: Icon): Promise<boolean> => {
    const previousData = await MenuService.fetchList()

    // create menu item
    const formattedUrl =
      url.includes('http://') || url.includes('https://')
        ? url
        : `https://${url}`
    const newData: IMenuItem = {
      url: formattedUrl,
      id: UtilService.generateId(url),
      order: previousData.length,
      icon: icon || '',
    }

    // append new data to previous
    const saveData: IStoredData<IMenuItem> = {
      data: [...previousData, newData],
    }

    return await StorageService.set(STORAGE_KEY, saveData)
  },

  /**
   * Updates existing menu item data
   * @param data - update data
   */
  update: async (data: IMenuItem): Promise<boolean> => {
    // find item to update
    const previousData = await MenuService.fetchList()
    const toUpdate = previousData.find((v) => v.id === data.id)
    if (!toUpdate) {
      return false
    }

    // update data
    const icon =
      data.icon && typeof data.icon !== 'string'
        ? await StorageService.base64(data.icon)
        : ''
    const updatedData: IMenuItem[] = previousData
      .filter((v) => v.id !== data.id)
      .concat([
        {
          ...toUpdate,
          icon: icon || toUpdate.icon,
          order: data.order || toUpdate.order,
        },
      ])

    const saveData: IStoredData<IMenuItem> = { data: [...updatedData] }
    return await StorageService.set(STORAGE_KEY, saveData)
  },

  /**
   * Deletes menu item by id
   * @param id - menu item id
   */
  delete: async (id: string): Promise<boolean> => {
    const previousData = await MenuService.fetchList()

    // remove deleted item
    const updatedData: IMenuItem[] = previousData.filter((v) => id !== v.id)
    const saveData: IStoredData<IMenuItem> = { data: [...updatedData] }

    return await StorageService.set(STORAGE_KEY, saveData)
  },

  /**
   * Handles re-ordering logic of menu items, does not update in db
   * @param _id - application id
   * @param order - new application order
   */
  reorder: async (args: {
    _id: string
    order: number
  }): Promise<IMenuItem[]> => {
    // fetch previous data
    const previousData = await MenuService.fetchList()

    // separate target from the group
    const excludedData = previousData.filter((v) => v.id !== args._id)
    const toUpdate = previousData.find((v) => v.id === args._id) as IMenuItem

    // order and update
    const reorderedData: IMenuItem[] = []
    _.sortBy(excludedData, 'order').forEach((v, i) => {
      i === args.order ? reorderedData.push(toUpdate, v) : reorderedData.push(v)
    })
    args.order > excludedData.length - 1 && reorderedData.push(toUpdate)
    return reorderedData.map((v, i) => ({ ...v, order: i }))
  },

  /**
   * Saves the provided order of menu items in db
   * @param items - ordered menu items
   */
  confirmReorder: async (items: IMenuItem[]): Promise<boolean> => {
    const saveData: IStoredData<IMenuItem> = { data: [...items] }
    return await StorageService.set(STORAGE_KEY, saveData)
  },
}
