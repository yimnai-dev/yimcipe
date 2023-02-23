import { shareReplay } from 'rxjs/operators';
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
  ngOnInit(): void {

  }
 }
