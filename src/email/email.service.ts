import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: configService.get<string>('EMAIL_USER'),
        pass: configService.get<string>('EMAIL_APP_PASSWORD'),
      },
    });
  }

  async sendVerificationEmail(email: string, token: string) {
    console.log(this.configService.get<string>('EMAIL_USER'));
    console.log(this.configService.get<string>('EMAIL_PASSWORD'));
    const url = `http://localhost:4000/users/verify?token=${token}`;

    await this.transporter.sendMail({
      to: email,
      subject: 'Verify your email',
      html: `Click <a href="${url}">here</a> to confirm your email address`,
    });
  }
}
