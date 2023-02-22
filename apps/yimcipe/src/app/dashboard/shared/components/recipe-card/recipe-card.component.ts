import { DashboardService } from './../../../../shared/services/dashboard/dashboard.service';
import { AfterContentChecked, AfterContentInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'yimcipe-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCardComponent {
  @Input() recipes$!: any[];

  constructor(private dashboardService: DashboardService) { }

  toggleRecipeStatus(recipe: any) {
    this.recipes$ = this.recipes$.map((singleRecipe: any) => {
     return  singleRecipe.id === recipe.id && {...singleRecipe, status: !singleRecipe.status};
    })
    console.log('We are here..', this.recipes$);
  }
}
