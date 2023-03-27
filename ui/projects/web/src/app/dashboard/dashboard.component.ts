import { ToastService } from './../shared/services/toastr/toast.service';
import { DashboardService } from '../shared/services/dashboard/dashboard.service';
import { ChangeDetectionStrategy, Component, OnInit, SkipSelf } from "@angular/core";
import { VoteService } from '../shared/services/vote/vote.service';
import { RouterOutlet } from '@angular/router';

@Component({
    templateUrl: './dashboard.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DashboardService, ToastService],
    standalone: true,
    imports: [
      RouterOutlet,
    ],
})

export class DashboardComponent implements OnInit {

  constructor(private voteService: VoteService) { }
  ngOnInit(): void {
    this.voteService.getAllVotes()
  }


}
