import mongoose from 'mongoose';
import { MongoDatabase } from './init';

describe('init MongoDB', () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should connect to MongoDB', async () => {
    const connected = await MongoDatabase.connect({
      dbName: process.env.MONGO_DB_NAME!,
      mongoUrl: process.env.MONGO_URL!,
    });

    expect(connected).toBeTruthy();
  });

  it('should throw an error', async () => {
    try {
      const connected = await MongoDatabase.connect({
        dbName: process.env.MONGO_DB_NAME!,
        mongoUrl: 'anotherUrl',
      });

      expect(true).toBe(false);
    } catch (error) {}
  });
});
