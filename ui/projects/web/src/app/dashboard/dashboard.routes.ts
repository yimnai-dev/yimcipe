import { CommentFormService } from './../shared/services/forms/comments.service';
import { NavigationService } from './../shared/services/navigation/navigation.service';
import { SubscriptionService } from './../shared/services/subscription/subscription.service';
import { DashboardService } from './../shared/services/dashboard/dashboard.service';
import { CommentService } from './../shared/services/comment/comment.service';
import { CategoryService } from './../shared/services/category/category.service';
import { ProfileService } from './../shared/services/profile/profile.service';
import { RecipeService } from './../shared/services/recipe/recipe.service';
import { VoteService } from './../shared/services/vote/vote.service';
import { authGuard } from './../shared/guards/auth/auth.guard';
import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { FavouriteComponent } from "./favourite/favourite.component";
import { HomeComponent } from "./home/home.component";
import { MainDashboardComponent } from "./main-dashboard/main-dashboard.component";
import { PersonalComponent } from "./personal/personal.component";
import { ProfileComponent } from "./profile/profile.component";
import { RecipeComponent } from "./recipe/recipe.component";
import { SingleRecipeComponent } from "./recipe/single-recipe/single-recipe.component";

export const  DASHBOARD_ROUTES: Routes = [
  { path: '', redirectTo: '/home/main', pathMatch: 'full' },
  {
    path: '', component: DashboardComponent, canActivate: [authGuard],
    providers: [
      VoteService,
      RecipeService,
      ProfileService,
      CategoryService,
      CommentService,
      DashboardService,
      SubscriptionService,
      NavigationService,
      CommentFormService
    ],
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
]
