import { SendMailService } from './services/mail/mail.service';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

const configService: ConfigService = new ConfigService();

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: configService.get<string>('SMTP_HOST'),
        secure: false,
        auth: {
          user: configService.get<string>('YIMCIPE_EMAIL'),
          pass: configService.get<string>('YIMCIPE_PASSWORD'),
        },
      },
      defaults: {
        from: `"No Reply" <admin@yimcipe.com>`,
      },
    }),
  ],
  exports: [SendMailService],
  providers: [SendMailService],
})
export class SharedModule {}
