import { SubscriberManager } from './../models/subscriber-manager.model';
import { Subscriber } from './../models/subscriber.model';
import { Module } from '@nestjs/common';
import { SubscriptionController } from './controller/subscription.controller';
import { SubscriptionService } from './service/subscription.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Subscriber, SubscriberManager, User])],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
