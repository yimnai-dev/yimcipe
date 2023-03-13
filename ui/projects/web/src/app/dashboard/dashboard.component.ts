import { DashboardService } from '../shared/services/dashboard/dashboard.service';
import { ChangeDetectionStrategy, Component, OnInit, SkipSelf } from "@angular/core";
import { VoteService } from '../shared/services/vote/vote.service';

@Component
  ({
    templateUrl: './dashboard.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DashboardService]
  })

export class DashboardComponent implements OnInit {

  constructor(private voteService: VoteService) { }
  ngOnInit(): void {
    this.voteService.getAllVotes()
  }


}
