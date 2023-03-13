import { Controller, Post, Query, UseGuards } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../user/guards/jwt-auth.guard';
import { SubscriptionService } from '../service/subscription.service';

@ApiTags('Subscriptions')
@UseGuards(JwtAuthGuard)
@Controller('users/subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('sub-status')
  changeSubStatus(
    @Query('userId') userId: string,
    @Query('subId') subId: string,
  ) {
    return this.subscriptionService.subscribeOrUnsubscribe(userId, subId);
  }
}
