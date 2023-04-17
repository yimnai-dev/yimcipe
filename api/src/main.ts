import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app/app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true, credentials: true });
  const globalPrefix = 'api/v1.0';
  const configService = app.get(ConfigService);
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());

  const redisClient = createClient({
    password: configService.get<string>('REDIS_CACHE_PASSWORD'),
    socket: {
      host: 'redis-17799.c251.east-us-mz.azure.cloud.redislabs.com',
      port: 17799,
    },
  });
  redisClient.connect().catch(console.error);

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'api:',
    ttl: 3600,
  });

  //Express Sessions
  app.use(
    session({
      store: redisStore,
      secret: configService.get<string>('EXPRESS_SESSION_SECRET') as string,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
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
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
