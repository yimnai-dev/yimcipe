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
        const unsubIfSubbed = await this.subscriberModel.findOne({where: {userId: userId, subscriberId: subId}})
        if(unsubIfSubbed){
          const unsubbed = await this.subscriberModel.destroy({where: {userId: userId, subscriberId: subId}})
          if(!unsubbed){
            return {
              success: false,
              message: 'Unsubscription failed',
              status: HttpStatus.INTERNAL_SERVER_ERROR
            }
          }
          return {
            success: true,
            message: 'Unsubscription successful',
            status: HttpStatus.OK
          }
        }
        const subIfNoSub = await this.subscriberModel.create({userId: userId, subscriberId: subId})
        if(!subIfNoSub){
            return {
                success: false,
                message: 'Something went wrong',
                status: HttpStatus.INTERNAL_SERVER_ERROR
            }
        }
        return {
            success: true,
            message: 'You have successfully subscribed to this User',
            status: HttpStatus.OK
        }
      }
}
