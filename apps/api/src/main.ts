/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as cors from 'cors'
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app/app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin: 'http://localhost:4200', credentials: true})
  const globalPrefix = 'api/v1.0';
  const configService = app.get(ConfigService)
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(new ValidationPipe());

  //Express Sessions
  app.use(
    session({
      secret: configService.get<string>('EXPRESS_SESSION_SECRET') as string,
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
