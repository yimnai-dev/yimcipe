import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'subscription',
  standalone: true,
  pure: false
})
export class SubscriptionPipe implements PipeTransform {
  transform(subscriptions: any[], subId: string) {
    const check = subscriptions.find(subscription => subscription.subscriberId === subId)
    return check ? 'Subscribed' : 'Subscribe';
  }
}
