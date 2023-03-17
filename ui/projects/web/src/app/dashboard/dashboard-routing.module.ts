import { SingleRecipeComponent } from './recipe/single-recipe/single-recipe.component';
import { ProfileComponent } from './profile/profile.component';
import { RecipeComponent } from './recipe/recipe.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { PersonalComponent } from './personal/personal.component';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { AuthGuard } from '../shared/guards/auth/auth.guard';
import { AuthService } from '../shared/services/auth/auth.service';

const routes: Routes = [
  { path: '', redirectTo: '/home/main', pathMatch: 'full' },
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'home', component: HomeComponent, children: [
          { path: 'main', component: MainDashboardComponent },
          { path: 'personal', component: PersonalComponent },
          { path: 'favourite', component: FavouriteComponent },
          { path: 'new', component: RecipeComponent },
          { path: 'profile', component: ProfileComponent },
          { path: 'main/recipe/:recipeId', component: SingleRecipeComponent }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AuthService,
  ]
})
export class DashboardRoutingModule { }
