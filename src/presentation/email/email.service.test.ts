import { EmailService } from './email.service';
import fs from 'fs';

const mockSend = jest.fn();

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: mockSend },
  })),
}));

jest.mock('../../config/plugins/envs.plugins', () => ({
  envs: { RESEND_API_KEY: 'test-api-key' },
}));

jest.mock('fs');

describe('EmailService', () => {
  let emailService: EmailService;

  beforeEach(() => {
    jest.clearAllMocks();
    emailService = new EmailService();
  });

  describe('sendEmail', () => {
    it('should return true when email is sent successfully', async () => {
      mockSend.mockResolvedValue({ id: 'test-id' });

      const result = await emailService.sendEmail({
        to: 'test@test.com',
        subject: 'Test',
        html: '<p>Test</p>',
      });

      expect(result).toBe(true);
    });

    it('should use default from when not provided', async () => {
      mockSend.mockResolvedValue({ id: 'test-id' });

      await emailService.sendEmail({
        to: 'test@test.com',
        subject: 'Test',
        html: '<p>Test</p>',
      });

      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({ from: 'onboarding@resend.dev' }),
      );
    });

    it('should use custom from when provided', async () => {
      mockSend.mockResolvedValue({ id: 'test-id' });

      await emailService.sendEmail({
        to: 'test@test.com',
        subject: 'Test',
        html: '<p>Test</p>',
        from: 'custom@sender.com',
      });

      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({ from: 'custom@sender.com' }),
      );
    });

    it('should use empty attachments array when not provided', async () => {
      mockSend.mockResolvedValue({ id: 'test-id' });

      await emailService.sendEmail({
        to: 'test@test.com',
        subject: 'Test',
        html: '<p>Test</p>',
      });

      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({ attachments: [] }),
      );
    });

    it('should pass provided attachments to resend', async () => {
      mockSend.mockResolvedValue({ id: 'test-id' });
      const attachments = [{ content: 'base64data', filename: 'file.log' }];

      await emailService.sendEmail({
        to: 'test@test.com',
        subject: 'Test',
        html: '<p>Test</p>',
        attachments,
      });

      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({ attachments }),
      );
    });

    it('should accept an array of recipients', async () => {
      mockSend.mockResolvedValue({ id: 'test-id' });
      const recipients = ['a@test.com', 'b@test.com'];

      const result = await emailService.sendEmail({
        to: recipients,
        subject: 'Test',
        html: '<p>Test</p>',
      });

      expect(result).toBe(true);
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({ to: recipients }),
      );
    });

    it('should return false when resend throws an error', async () => {
      mockSend.mockRejectedValue(new Error('Network error'));

      const result = await emailService.sendEmail({
        to: 'test@test.com',
        subject: 'Test',
        html: '<p>Test</p>',
      });

      expect(result).toBe(false);
    });
  });

  describe('sendEmailWithFileSytemLogs', () => {
    const mockBuffer = Buffer.from('log content');

    it('should read all three log files', async () => {
      (fs.readFileSync as jest.Mock).mockReturnValue(mockBuffer);
      mockSend.mockResolvedValue({ id: 'test-id' });

      await emailService.sendEmailWithFileSytemLogs('test@test.com');

      expect(fs.readFileSync).toHaveBeenCalledTimes(3);
      expect(fs.readFileSync).toHaveBeenCalledWith('./logs/logs-all.log');
      expect(fs.readFileSync).toHaveBeenCalledWith('./logs/logs-high.log');
      expect(fs.readFileSync).toHaveBeenCalledWith('./logs/logs-medium.log');
    });

    it('should send email with correct subject and html', async () => {
      (fs.readFileSync as jest.Mock).mockReturnValue(mockBuffer);
      mockSend.mockResolvedValue({ id: 'test-id' });

      await emailService.sendEmailWithFileSytemLogs('test@test.com');

      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          subject: 'Logs del servidor',
          html: expect.stringContaining('Logs de sistema - NOC'),
        }),
      );
    });

    it('should attach all three log files with correct filenames', async () => {
      (fs.readFileSync as jest.Mock).mockReturnValue(mockBuffer);
      mockSend.mockResolvedValue({ id: 'test-id' });

      await emailService.sendEmailWithFileSytemLogs('test@test.com');

      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          attachments: expect.arrayContaining([
            expect.objectContaining({ filename: 'Logs-all.log' }),
            expect.objectContaining({ filename: 'Logs-high.log' }),
            expect.objectContaining({ filename: 'Logs-medium.log' }),
          ]),
        }),
      );
    });

    it('should return true when email is sent successfully', async () => {
      (fs.readFileSync as jest.Mock).mockReturnValue(mockBuffer);
      mockSend.mockResolvedValue({ id: 'test-id' });

      const result =
        await emailService.sendEmailWithFileSytemLogs('test@test.com');

      expect(result).toBe(true);
    });

    it('should return false when sendEmail fails', async () => {
      (fs.readFileSync as jest.Mock).mockReturnValue(mockBuffer);
      mockSend.mockRejectedValue(new Error('Send error'));

      const result =
        await emailService.sendEmailWithFileSytemLogs('test@test.com');

      expect(result).toBe(false);
    });

    it('should accept an array of recipients', async () => {
      (fs.readFileSync as jest.Mock).mockReturnValue(mockBuffer);
      mockSend.mockResolvedValue({ id: 'test-id' });
      const recipients = ['a@test.com', 'b@test.com'];

      const result = await emailService.sendEmailWithFileSytemLogs(recipients);

      expect(result).toBe(true);
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({ to: recipients }),
      );
    });
  });
});
