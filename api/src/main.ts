import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { ConfigService } from '@nestjs/config';
import * as MongoDBStore from 'connect-mongodb-session';

import { AppModule } from './app/app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true, credentials: true });
  const globalPrefix = 'api/v1.0';
  const configService = app.get(ConfigService);
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());

  const mongoDBSession = MongoDBStore(session);
  const mongoStore = new mongoDBSession({
    uri: 'mongodb+srv://yimnai_dev:FbEnYNInzc1fQJqR@yimcipe.d835tqx.mongodb.net/?retryWrites=true&w=majority',
    collection: 'sessions',
    databaseName: 'yimcipe',
    expires: 900000,
    connectionOptions: {
      serverSelectionTimeoutMS: 10000,
    },
  });

  mongoStore.on('error', console.error);

  //Express Sessions
  app.use(
    session({
      // store: mongoStore,
      secret: configService.get<string>('EXPRESS_SESSION_SECRET') as string,
      resave: false,
      saveUninitialized: false,
      // cookie: { secure: false, sameSite: 'none' },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('YIMCIPE - Recipe Sharing Platform')
    .setDescription(
      'API and description for the YIMCIPE platform with examples on how to use them',
    )
    .setVersion('1.0')
    .addTag('YIMCIPE')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1.0/docs', app, document);
  const port = process.env.PORT || process.env.WEBSITE_PORT || 3333;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
