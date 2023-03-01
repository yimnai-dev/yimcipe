import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subscriber } from '../../models/subscriber.model';
import { User } from '../../models/user.model';

@Injectable()
export class SubscriptionService {

      constructor(
        @InjectModel(Subscriber)
        private readonly subscriberModel: typeof Subscriber,
        @InjectModel(User)
        private readonly userModel: typeof Subscriber,
      ){}

      subscribeOrUnsubscribe = async (userId: string, subId: string) => {
          if(userId === subId){
            return {
              success: false,
              message: 'You cannot subscribe to yourself',
              status: HttpStatus.BAD_REQUEST
            }
          }
          const userExists = await this.userModel.findOne({where: {userId: userId}})
            if(!userExists){
                return {
                    success: false,
                    message: 'USER TO WHOM YOU WANT TO SUBSCRIBE DOES NOT EXIST!',
                    status: HttpStatus.NOT_FOUND
                }
            }
        const subscriberExists = await this.userModel.findOne({where: {userId: subId}})
        if(!subscriberExists){
            return {
                success: false,
                message: 'subscriber does not exist',
                status: HttpStatus.NOT_FOUND
            }
        }
        const subscriptionExists = await this.subscriberModel.findOne({where: {userId: userId, subscriberId: subId}})
        if(subscriptionExists){
            const unsub = await this.subscriberModel.destroy({where: {subscriberId: subId}})
            if(unsub !== 1){
                return {
                    success: false,
                    message: 'Could not unsubscribe for this user!',
                    payload: unsub
                }
            }
            return {
                success: true,
                message: 'Unsubscribed successfully',
                status: HttpStatus.OK
            }
        }
        const sub = await this.subscriberModel.create({userId: userId, subscriberId: subId})
        if(!sub){
            return {
                success: false,
                message: 'Could not subscribe to particular user',
                status: HttpStatus.FAILED_DEPENDENCY
            }
        }

        return {
            success: true,
            message: 'Subscribed Successfully!',
            status: HttpStatus.OK
        }
      }
}
