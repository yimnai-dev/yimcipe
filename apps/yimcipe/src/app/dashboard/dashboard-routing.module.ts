import { ProfileComponent } from './profile/profile.component';
import { RecipeComponent } from './recipe/recipe.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { PersonalComponent } from './personal/personal.component';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';

const routes: Routes = [
  {path: '', redirectTo: '/home/main', pathMatch: 'full'},
  {path: '', component: DashboardComponent, children: [
    {path: 'home', component: HomeComponent, children: [
      {path: 'main', component: MainDashboardComponent},
      {path: 'personal', component: PersonalComponent},
      {path: 'favourite', component: FavouriteComponent},
      {path: 'new', component: RecipeComponent},
      {path: 'profile', component: ProfileComponent}
    ]},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
