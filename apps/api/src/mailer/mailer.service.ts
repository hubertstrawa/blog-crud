import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private readonly fromEmail: string;
  private readonly transport: nodemailer.Transporter;

  constructor(configService: ConfigService) {
    const host = configService.get<string>('SMTP_HOST') ?? 'localhost';
    const port = Number(configService.get<string>('SMTP_PORT') ?? 1025);
    const secure = configService.get<string>('SMTP_SECURE') === 'true';
    this.fromEmail =
      configService.get<string>('NEWSLETTER_FROM') ?? 'noreply@blog.local';

    this.transport = nodemailer.createTransport({
      host,
      port,
      secure,
    });
  }

  async sendNewPostEmail({
    to,
    title,
    postUrl,
  }: {
    to: string;
    title: string;
    postUrl: string;
  }) {
    await this.transport.sendMail({
      from: this.fromEmail,
      to,
      subject: `Nowy post: ${title}`,
      text: `Na blogu pojawil sie nowy post: ${title}\n\nLink: ${postUrl}`,
      html: `<p>Na blogu pojawil sie nowy post:</p><p><strong>${title}</strong></p><p><a href="${postUrl}">${postUrl}</a></p>`,
    });
  }
}
