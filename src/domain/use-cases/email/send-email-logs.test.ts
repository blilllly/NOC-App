import { SendEmailLogs } from './send-email-logs';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';

describe('SendEmailLogs', () => {
  const mockEmailService = {
    sendEmailWithFileSytemLogs: jest.fn(),
  };

  const mockLogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const sendEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockLogRepository,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call sendEmailWithFileSytemLogs and saveLog on success', async () => {
    mockEmailService.sendEmailWithFileSytemLogs.mockResolvedValue(true);

    await sendEmailLogs.execute('test@test.com');

    expect(mockEmailService.sendEmailWithFileSytemLogs).toHaveBeenCalledWith('test@test.com');
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  it('should return true and save a low severity log when email is sent', async () => {
    mockEmailService.sendEmailWithFileSytemLogs.mockResolvedValue(true);

    const result = await sendEmailLogs.execute('test@test.com');

    expect(result).toBeTruthy();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.objectContaining({ level: LogSeverityLevel.low }),
    );
  });

  it('should return false and save a high severity log when email service returns false', async () => {
    mockEmailService.sendEmailWithFileSytemLogs.mockResolvedValue(false);

    const result = await sendEmailLogs.execute('test@test.com');

    expect(result).toBeFalsy();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.objectContaining({ level: LogSeverityLevel.high }),
    );
  });

  it('should return false and save a high severity log when email service throws', async () => {
    mockEmailService.sendEmailWithFileSytemLogs.mockRejectedValue(new Error('Connection error'));

    const result = await sendEmailLogs.execute('test@test.com');

    expect(result).toBeFalsy();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.objectContaining({ level: LogSeverityLevel.high }),
    );
  });
});
