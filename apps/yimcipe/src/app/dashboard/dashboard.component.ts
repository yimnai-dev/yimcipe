import { ToastService } from './../shared/services/toastr/toast.service';
import { tap, Subject, catchError, throwError } from 'rxjs';
import { DashboardService } from './../shared/services/dashboard/dashboard.service';
import { ChangeDetectionStrategy, Component, OnInit, SkipSelf } from "@angular/core";
import { Store } from "@ngxs/store";

@Component
({
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DashboardService]
})

export class DashboardComponent implements OnInit{
  constructor(private store: Store, private dashboardService: DashboardService, private toastService: ToastService){}


  ngOnInit(): void {
    this.dashboardService.isLoading$.next(true)
    this.dashboardService.getAllRecipes()
    .pipe(
      tap((result: any) => {
        this.dashboardService.isLoading$.next(false)
        if(result.success){
          this.dashboardService.recipes$ = result.recipes
          console.log('Recipes: ', this.dashboardService.recipes$);

        }
        else{
          this.toastService.showWarning('Could not load recipes. Try again later or reload the page!')
        }
      }),
      catchError((error: Error) => {
        this.dashboardService.isLoading$.next(false)
        this.toastService.showError(error.message)
        return throwError(() => {error})
      })
    ).subscribe()
  }
 }
