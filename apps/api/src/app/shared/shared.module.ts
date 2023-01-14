import { SendMailService } from './services/mail/mail.service';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

const configService: ConfigService = new ConfigService()


@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.office365.com',
        secure: false,
        auth: {
          user: 'yimnai.dev@outlook.com',
          pass: '.Kvrag7C2yFinOL()',
        },
      },
      defaults: {
        from: `"No Reply" <yimnai.dev@outlook.com`,
      },
    }),
  ],
  exports: [SendMailService],
  providers: [SendMailService]
})
export class SharedModule {}
