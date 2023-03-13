import { Subject, tap, BehaviorSubject } from 'rxjs';
import { DashboardService } from '../../shared/services/dashboard/dashboard.service';
import { ChangeDetectionStrategy, Component, Input, OnInit, SkipSelf, AfterViewInit } from '@angular/core';
import { RecipeService } from '../../shared/services/recipe/recipe.service';

@Component({
  selector: 'yimcipe-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainDashboardComponent implements OnInit, AfterViewInit {

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(@SkipSelf() public dashboardService: DashboardService, public recipeService: RecipeService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const navigationType = window.performance.getEntriesByType('navigation')[0].entryType;
      if(navigationType === 'reload'){
        this.initRecipes()
      }
  }

  initRecipes(){
    this.isLoading$.next(true)
    this.recipeService.queryRecipes().subscribe(() => {
      this.isLoading$.next(false)
      this.recipeService.recipes.next(this.recipeService.recipeTemplate.getValue())
    })
  }
}
