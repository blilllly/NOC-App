import { Attachment, Resend } from 'resend';
import { envs } from '../../config/plugins/envs.plugins';
import fs from 'fs';

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

  constructor() {
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
      return true;
    } catch (error) {
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

    return this.sendEmail({
      to,
      subject,
      attachments,
      html,
    });
  }
}
