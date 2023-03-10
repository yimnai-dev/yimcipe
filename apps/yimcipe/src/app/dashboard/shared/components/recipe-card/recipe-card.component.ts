import { Router } from '@angular/router';
import { CommentFormService } from './../../../../shared/services/forms/comments.service';
import { ProfileService } from './../../../../shared/services/profile/profile.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from './../../../../shared/services/category/category.service';
import { ToastService } from './../../../../shared/services/toastr/toast.service';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { RecipeService } from 'apps/yimcipe/src/app/shared/services/recipe/recipe.service';
import { tap, catchError, throwError, shareReplay, map, BehaviorSubject } from 'rxjs';
import { SubscriptionService } from 'apps/yimcipe/src/app/shared/services/subscription/subscription.service';
import { VoteService } from 'apps/yimcipe/src/app/shared/services/vote/vote.service';
import { CommentService } from 'apps/yimcipe/src/app/shared/services/comment/comment.service';

@Component({
  selector: 'yimcipe-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCardComponent implements OnInit{

  @Input() desiredRecipes: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);


  authUser = JSON.parse(localStorage.getItem('authUser') || '{}')

  constructor(private store: Store,
     public recipeService: RecipeService,
     public categoryService: CategoryService,
     public subscriptionService: SubscriptionService,
     public voteService: VoteService,
     public commentService: CommentService,
     private profileService: ProfileService,
     public commentFormService: CommentFormService,
     private router: Router
     ){
      this.getUserProfile()
     }

  ngOnInit(): void {
    this.voteService.getAllVotes()
    this.recipeService.queryRecipes()
    this.categoryService.queryCategories().subscribe((result: any) => {
      this.categoryService.categories.next(result.categories)
    })
  }

  makeVote({recipeId, voterId, voteType}: {recipeId: string, voterId: string, voteType: 'upvote' | 'downvote'}){
    this.voteService.makeVote({recipeId, voterId, voteType}).subscribe()
  }

  getUserProfile(){
    this.profileService.getProfile(this.authUser.userId)
  }

  viewFullRecipe(recipeId: string){
    this.router.navigate([`/dashboard/home/main/recipe/${recipeId}`])
  }

}
