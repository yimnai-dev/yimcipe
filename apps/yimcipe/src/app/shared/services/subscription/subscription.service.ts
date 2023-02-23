import { HttpService } from './../http/http.service';
import { Injectable } from "@angular/core";

@Injectable()

export class SubscriptionService {

  subscriptionBaseUrl = 'users/subscriptions'
  constructor(private http: HttpService) {}

  subscribeOrUnsubscribe(payload: {userId: string, subId: string}){
    return this.http.post(`${this.subscriptionBaseUrl}/sub-status?userId=${payload.userId}&subId=${payload.subId}`)
  }

}
