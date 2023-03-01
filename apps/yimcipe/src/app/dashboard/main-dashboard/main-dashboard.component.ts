import { RecipeService } from 'apps/yimcipe/src/app/shared/services/recipe/recipe.service';
import { Subject } from 'rxjs';
import { DashboardService } from './../../shared/services/dashboard/dashboard.service';
import { ChangeDetectionStrategy, Component, Input, OnInit, SkipSelf } from '@angular/core';

@Component({
  selector: 'yimcipe-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainDashboardComponent implements OnInit {
  constructor(@SkipSelf() public dashboardService: DashboardService, public recipeService: RecipeService) {}

  ngOnInit(): void {
  }
}
