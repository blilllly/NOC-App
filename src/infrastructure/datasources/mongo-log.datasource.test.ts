import mongoose from 'mongoose';
import { envs } from '../../config/plugins/envs.plugins';
import { LogModel, MongoDatabase } from '../../data/mongodb';
import { MongoLogDatasource } from './mongo-log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

describe('mongo-log.datasource.ts', () => {
  const logDataSource = new MongoLogDatasource();
  const log = new LogEntity({
    level: LogSeverityLevel.medium,
    message: 'test message',
    origin: 'mongo-log.datasource.test.ts',
  });

  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
  });

  afterEach(async () => {
    await LogModel.deleteMany();
  });

  afterAll(async () => {
    await LogModel.deleteMany();
    mongoose.disconnect();
  });

  it('should create a log', async () => {
    const logSpy = jest.spyOn(console, 'log');

    await logDataSource.saveLog(log);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(
      'Mongo Log created:',
      expect.any(String),
    );
  });

  it('should get logs', async () => {
    await logDataSource.saveLog(log);
    const logs = await logDataSource.getLogs(LogSeverityLevel.medium);
    expect(logs.length).toBe(1);
    expect(logs[0]!.level).toBe(LogSeverityLevel.medium);
  });
});
