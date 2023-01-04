/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app/app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin: 'http://localhost:4200'})
  const globalPrefix = 'api/v1.0';
  const configService = app.get(ConfigService)
  const sessionSecret = configService.get<string>('EXPRESS_SESSION_TOKEN')
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(new ValidationPipe());

  //Express Sessions
  app.use(
    session({
      secret: '493dd42ea9f5369dfe933a61903466a3add05e8d5bd4954efe5ef9a25acdeb43',
      resave: false,
      saveUninitialized: false,
    }),
  );

  const config = new DocumentBuilder()
  .setTitle('YIMCIPE - Recipe Sharing Platform')
  .setDescription('API and description for the YIMCIPE platform with examples on how to use them')
  .setVersion('1.0')
  .addTag('YIMCIPE')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('yimcipe-api-docs', app, document);

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
