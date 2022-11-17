import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { PersonalComponent } from './personal/personal.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { RecipeComponent } from './recipe/recipe.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchBarComponent } from './shared/search-bar/search-bar.component';
import { RecipeCardComponent } from './shared/recipe-card/recipe-card.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    MainDashboardComponent,
    PersonalComponent,
    FavouriteComponent,
    RecipeComponent,
    ProfileComponent,
    SearchBarComponent,
    RecipeCardComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, RouterModule, SharedModule],
})
export class DashboardModule {}
