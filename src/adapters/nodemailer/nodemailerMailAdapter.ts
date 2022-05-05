import nodemailer, { Transporter } from 'nodemailer';

import { MailAdapter, SendMailData } from '../mailAdapter';

export class NodemailerMailAdapter implements MailAdapter {
  private readonly transport: Transporter;

  constructor() {
    this.transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async sendMail({ body, from, subject, to }: SendMailData): Promise<void> {
    await this.transport.sendMail({
      subject,
      html: body,
      from: {
        address: from.email,
        name: from.name,
      },
      to: {
        address: to.email,
        name: to.name,
      },
    });
  }
}
