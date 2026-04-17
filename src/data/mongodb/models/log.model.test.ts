import mongoose from 'mongoose';
import { envs } from '../../../config/plugins/envs.plugins';
import { MongoDatabase } from '../init';
import { LogModel } from './log.model';

describe('log.model.test.ts', () => {
  beforeAll(async () => {
    await MongoDatabase.connect({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should return logModel', async () => {
    const logData = {
      origin: 'log.model.test.ts',
      message: 'test-message',
      level: 'low',
    };

    const log = await LogModel.create(logData);

    expect(log).toEqual(
      expect.objectContaining({
        ...logData,
        createdAt: expect.any(Date),
        id: expect.any(String),
      }),
    );

    // delete the entry
    await LogModel.findByIdAndDelete(log.id);
  });

  it('should return the schema object', () => {
    const schema = LogModel.schema.obj;

    expect(schema).toEqual(
      expect.objectContaining({
        message: { type: expect.any(Function), required: true },
        origin: { type: expect.any(Function) },
        level: {
          type: expect.any(Function),
          enum: ['low', 'medium', 'high'],
          default: 'low',
        },
        createdAt: expect.any(Object),
      }),
    );
  });
});
