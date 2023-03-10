import { ToastService } from './../toastr/toast.service';
import { HttpService } from './../http/http.service';
import { Injectable } from "@angular/core";
import { catchError, tap, throwError } from 'rxjs';
import { RecipeService } from '../recipe/recipe.service';

@Injectable()

export class SubscriptionService {

  subscriptionBaseUrl = 'users/subscriptions'
  constructor(private http: HttpService, private toastService: ToastService, private recipeService: RecipeService) {}

  subscribeOrUnsubscribe(userId: string, subId: string){
    this.http.post(`${this.subscriptionBaseUrl}/sub-status?userId=${userId}&subId=${subId}`).pipe(
      tap((result: any) => {
        this.recipeService.queryRecipes()
        if(result.success){
          this.toastService.showSuccess(result.message)
        }
        else{
          this.toastService.showError(result.message)
        }
      }),
      catchError((error: any) => {
        this.toastService.showError(error.error.message)
        return throwError(() => {error})
      })
    ).subscribe()

  }
}

