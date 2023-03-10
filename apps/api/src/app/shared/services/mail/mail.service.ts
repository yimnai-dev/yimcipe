import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SendMailService {
  constructor(private readonly mailerService: MailerService){}

  async sendEmail(toEmail: string, subject: string, message: string){
    return await this.mailerService.sendMail({
      to: toEmail,
      from: 'jamespeterson5250@gmail.com',
      subject: subject,
      html: `
        ${message}
      `,
    })
  }
}
