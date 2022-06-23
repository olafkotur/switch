import MongoClient from 'mongodb'
import { config } from '../config'
import { Collection } from '../typings/models'

let database: MongoClient.Db | null = null

export const DatabaseService = {
  /**
   * Establishes the database connection.
   * @param uri - connection uri
   */
  connect: async (uri: string): Promise<boolean> => {
    return await new Promise((resolve, reject) => {
      MongoClient.connect(
        uri,
        { useUnifiedTopology: true },
        (error: Error, db: MongoClient.MongoClient) => {
          if (error) {
            reject(false)
          }
          database = db.db(config.mongoName)
          console.log(
            `Database.connect :: Succesfully connected to ${config.mongoName}`
              .green,
          )
          resolve(true)
        },
      )
    })
  },

  /**
   * Returns requested collection.
   * @param col - collection name
   */
  getCollection: (col: Collection) => {
    return DatabaseService.getDb().collection(col)
  },

  /**
   * Fetches the database object.
   */
  getDb: (): MongoClient.Db => {
    return database as MongoClient.Db
  },
}
