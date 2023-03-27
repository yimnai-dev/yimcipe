import { AuthService } from '../../services/auth/auth.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe/recipe.service';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'yimcipe-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterLink, RouterLinkActive, FormsModule]
})
export class FooterComponent implements OnInit {

  model = {
    title: '',
  }

  constructor(public recipeService: RecipeService, public readonly authService: AuthService) { }

  ngOnInit(): void { }

}
