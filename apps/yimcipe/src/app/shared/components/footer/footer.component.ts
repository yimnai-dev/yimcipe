import { AuthService } from './../../services/auth/auth.service';
import { RecipeService } from 'apps/yimcipe/src/app/shared/services/recipe/recipe.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'yimcipe-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {

  model = {
    title: '',
  }

  constructor(public recipeService: RecipeService, public readonly authService: AuthService) {}

  ngOnInit(): void {}

}
