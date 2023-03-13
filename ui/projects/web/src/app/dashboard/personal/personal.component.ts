import { BehaviorSubject } from 'rxjs';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RecipeService } from '../../shared/services/recipe/recipe.service';

@Component({
  selector: 'yimcipe-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
