import mongoose from 'mongoose';

export const DatabaseService = {
  /**
   * Establishes the database connection.
   * @param uri - target uri to connect to
   * @param name - name of the database
   */
  connect: async (args: { uri: string; name: string }): Promise<boolean> => {
    return await new Promise((resolve) => {
      mongoose.connect(args.uri, {
        dbName: args.name,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
      mongoose.connection.on('connected', () => {
        console.log(`DatabaseService:connect :: Succesfully connected to "${args.name}" database`.green);
        resolve(true);
      });
    });
  },

  /**
   * Safely disconnects database connection.
   */
  disconnect: async (): Promise<void> => {
    await mongoose.connection.close();
    console.log('DatabaseService:disconnect :: Succesfully disconnected from database');
  },
};
