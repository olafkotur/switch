import storage from 'electron-json-storage';

export const StorageService = {
  set: async (key: string, data: object): Promise<boolean> => {
    return await new Promise((resolve, reject) => {
      storage.set(key, data, (error) => {
        if (error) {
          reject(false);
        }
        resolve(true);
      });
    });
  },

  get: async (key: string): Promise<object | null> => {
    return await new Promise((resolve, reject) => {
      storage.get(key, (_error, data) => {
        if (data) {
          resolve(data);
        }
        reject(null);
      });
    });
  },
};
