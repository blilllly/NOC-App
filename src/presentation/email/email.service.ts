import { Attachment, Resend } from 'resend';
import { envs } from '../../config/plugins/envs.plugins';
import fs from 'fs';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  attachments?: Attachment[];
}

// interface Attachment {
//   filename: string;
//   content: string;
// }

export class EmailService {
  private resend: Resend;
  private defautlFrom = 'onboarding@resend.dev';

  constructor(private readonly logRepository: LogRepository) {
    this.resend = new Resend(envs.RESEND_API_KEY);
  }

  async sendEmail({
    to,
    subject,
    html,
    from,
    attachments = [],
  }: SendEmailOptions): Promise<boolean> {
    try {
      const information = await this.resend.emails.send({
        from: from ?? this.defautlFrom,
        to,
        subject,
        html,
        attachments,
      });

      // console.log(information);
      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'Email Sent',
        origin: 'email.service.ts',
      });
      this.logRepository.saveLog(log);
      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: 'Email not Sent',
        origin: 'email.service.ts',
      });
      this.logRepository.saveLog(log);
      return false;
    }
  }

  async sendEmailWithFileSytemLogs(to: string | string[]) {
    const subject = 'Logs del servidor';
    const html = `
      <h3>Logs de sistema - NOC</h3>
      <p>Sint aliquip consectetur aute cupidatat velit labore tempor qui sunt adipisicing. Exercitation adipisicing exercitation occaecat deserunt id. Quis est duis eu aute pariatur aliqua enim in sint.</p>
      <p>Ver logs adjuntos</p>
    `;
    const attachments: Attachment[] = [
      {
        content: fs.readFileSync('./logs/logs-all.log').toString('base64'),
        filename: 'Logs-all.log',
      },
      {
        content: fs.readFileSync('./logs/logs-high.log').toString('base64'),
        filename: 'Logs-high.log',
      },
      {
        content: fs.readFileSync('./logs/logs-medium.log').toString('base64'),
        filename: 'Logs-medium.log',
      },
    ];

    this.sendEmail({
      to,
      subject,
      attachments,
      html,
    });
  }
}
