import { LogEntity, LogSeverityLevel } from './log.entity';

describe('log.entity.ts LogEntity', () => {
  const dataObj = {
    message: 'Hola Mundo',
    level: LogSeverityLevel.high,
    origin: 'log.entity.test.ts',
  };

  it('should create a LogEntity instance', () => {
    const log = new LogEntity(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  it('should create a LogEntity instance from json', () => {
    const json = `{"level":"low","message":"Service https://google.com working","createdAt":"2026-04-17T02:41:55.916Z","origin":"check.service.ts"}`;

    const log = LogEntity.fromJson(json);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe('Service https://google.com working');
    expect(log.level).toBe(LogSeverityLevel.low);
    expect(log.origin).toBe('check.service.ts');
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  it('should create a LogEntity isntance from object', () => {
    const log = LogEntity.fromObject(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });
});
