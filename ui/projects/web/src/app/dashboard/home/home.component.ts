import { RecipeService } from '../../shared/services/recipe/recipe.service';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ProfileService } from '../../shared/services/profile/profile.service';

@Component({
  selector: 'yimcipe-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;

  nameInitial!: string;
  profile!: any;

  constructor(public authService: AuthService, public recipeService: RecipeService, private profileService: ProfileService) {
    const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
    this.nameInitial = authUser.username.split('')[0].toUpperCase();
    this.profileService.getProfile(authUser.userId)
  }

  closeDropdownMenu() {
    this.dropdownMenu.nativeElement.classList.add('hidden')
  }

  get fixFooterToBottom() {
    if (window.location.href.includes('/profile') || window.location.href.includes('/new')) {
      return false
    }
    return this.recipeService.recipes.getValue().length === 0 || (window.location.href.includes('/personal') && this.recipeService.personalRecipes.getValue().length === 0)
  }
}
