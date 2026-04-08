import { Resend } from 'resend';
import { envs } from '../../config/plugins/envs.plugins';

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

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
  }: SendEmailOptions): Promise<boolean> {
    try {
      await this.resend.emails.send({
        from: from ?? this.defautlFrom,
        to,
        subject,
        html,
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
