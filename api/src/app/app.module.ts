import { CommentsModule } from './comments/comments.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { VoteModule } from './vote/vote.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { SharesModule } from './shares/shares.module';
import { RecipeModule } from './recipe/recipe.module';
import { SharedModule } from './shared/shared.module';
import { MulterModule } from '@nestjs/platform-express';
import RedisStore from 'connect-redis';
import { Redis } from 'ioredis';
import { SessionModule } from 'nestjs-session';
import { createClient } from 'redis';

const configService: ConfigService = new ConfigService();

const client = createClient({
  password: configService.get<string>('REDIS_CACHE_PASSWORD'),
  socket: {
    host: 'redis-17799.c251.east-us-mz.azure.cloud.redislabs.com',
    port: 17799,
  },
});

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      logging: false,
      ssl: true,
      dialectOptions: {
        require: true,
        rejectUnauthorized: false,
      },
      autoLoadModels: true,
      synchronize: true,
      uri: configService.get<string>('DATABASE_CONNECTION_STRING'),
    }),
    SharesModule,
    UserModule,
    ProfileModule,
    VoteModule,
    SubscriptionModule,
    RecipeModule,
    CommentsModule,
    SharedModule,
    MulterModule.register(),
    SessionModule.forRoot({
      session: {
        secret: configService.get<string>('REDIS_CACHE_SECRET'),
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 3600000,
        },
        store: new RedisStore({
          client: client,
          ttl: 3600,
        }),
      },
    }),
  ],
  controllers: [],
})
export class AppModule {}
