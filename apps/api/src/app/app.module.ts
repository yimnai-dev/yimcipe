import { CommentsModule } from './comments/comments.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { VoteModule } from './vote/vote.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { SharesModule } from './shares/shares.module';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
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
