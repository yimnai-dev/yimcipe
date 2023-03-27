import { BehaviorSubject } from 'rxjs';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RecipeService } from '../../shared/services/recipe/recipe.service';
import { RecipeCardComponent } from '../shared/components/recipe-card/recipe-card.component';
import { SearchBarComponent } from '../shared/components/search-bar/search-bar.component';

@Component({
    selector: 'yimcipe-personal',
    templateUrl: './personal.component.html',
    styleUrls: ['./personal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [SearchBarComponent, RecipeCardComponent]
})
export class PersonalComponent {

  authUser = JSON.parse(localStorage.getItem('authUser') || '{}')

  constructor(public recipeService: RecipeService){
    this.recipeService.recipes.subscribe((result: any) => {
      const outcome = result.filter((recipe: any) => recipe.userId === this.authUser.userId )
      this.recipeService.personalRecipes.next(outcome)
    })

  }
}
