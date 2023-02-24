import { BehaviorSubject } from 'rxjs';
import { RecipeService } from 'apps/yimcipe/src/app/shared/services/recipe/recipe.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'yimcipe-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalComponent {

  authUser = JSON.parse(localStorage.getItem('authUser') || '{}')

  personalRecipes: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])

  constructor(public recipeService: RecipeService){
    this.recipeService.recipes.subscribe((result: any) => {
      const outcome = result.filter((recipe: any) => recipe.userId === this.authUser.userId )
      this.personalRecipes.next(outcome)
    })

  }
}
