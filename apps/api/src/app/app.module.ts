import { CommentsModule } from './comments/comments.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { VoteModule } from './vote/vote.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { SharesModule } from './shares/shares.module';
import { RecipeModule } from './recipe/recipe.module';

const configService: ConfigService = new ConfigService()

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: configService.get<string>('DATABASE_HOST'),
      port: +configService.get<string>('DATABASE_PORT'),
      username: configService.get<string>('DATABASE_USERNAME'),
      password: configService.get<string>('DATABASE_PASSWORD'),
      database: configService.get<string>('DATABASE_NAME'),
      autoLoadModels: true,
      synchronize: true,
    }),
    SharesModule,
    UserModule,
    ProfileModule,
    VoteModule,
    SubscriptionModule,
    RecipeModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
