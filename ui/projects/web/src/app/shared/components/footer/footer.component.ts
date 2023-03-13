import { AuthService } from '../../services/auth/auth.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe/recipe.service';

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

  constructor(public recipeService: RecipeService, public readonly authService: AuthService) { }

  ngOnInit(): void { }

}
