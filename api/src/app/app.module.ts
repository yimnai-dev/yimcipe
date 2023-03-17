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

const configService: ConfigService = new ConfigService();

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
    // CacheModule.register<RedisClientOptions>({
    //   store: redisStore as unknown as CacheStore,
    //   isGlobal: true,
    //   url: '127.0.0.1:6379',
    //   ttl: environment.cacheTTL,
    // }),
    MulterModule.register(),
  ],
  controllers: [],
})
export class AppModule {}
