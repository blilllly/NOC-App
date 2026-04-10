import mongoose from 'mongoose';

interface ConnectionOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connet(options: ConnectionOptions) {
    const { mongoUrl, dbName } = options;
    try {
      await mongoose.connect(mongoUrl, { dbName });
      console.log('Mongo connected!');
    } catch (error) {
      console.log('Mongo not connected!');
      throw error;
    }
  }
}
