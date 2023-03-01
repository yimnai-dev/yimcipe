import { ProfileService } from './../../../../shared/services/profile/profile.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from './../../../../shared/services/category/category.service';
import { ToastService } from './../../../../shared/services/toastr/toast.service';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { RecipeService } from 'apps/yimcipe/src/app/shared/services/recipe/recipe.service';
import { tap, catchError, throwError, shareReplay, map, BehaviorSubject } from 'rxjs';
import { Buffer } from 'buffer';
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

  commentForm: FormGroup = new FormGroup({
    comment: new FormControl('', [Validators.required])
  })

  authUser = JSON.parse(localStorage.getItem('authUser') || '{}')

  constructor(private store: Store,
     public recipeService: RecipeService,
     private toastService: ToastService,
     public categoryService: CategoryService,
     public subscriptionService: SubscriptionService,
     public voteService: VoteService,
     private commentService: CommentService,
     private profileService: ProfileService,
     ){
      this.getUserProfile()
     }

  ngOnInit(): void {
    this.voteService.getAllVotes()
    this.queryRecipes()
    this.categoryService.queryCategories().subscribe((result: any) => {
      this.categoryService.categories.next(result.categories)
    })
  }

  makeVote({recipeId, voterId, voteType}: {recipeId: string, voterId: string, voteType: 'upvote' | 'downvote'}){
    this.voteService.vote({recipeId, voterId, voteType}).pipe(
      tap((result: any) => {
        this.voteService.getAllVotes()
        this.queryRecipes()
        if(result.success){
          this.toastService.showSuccess(result.message)
        }else{
          this.toastService.showError(result.message)
        }
      }),
      catchError((error: any) => {
        this.toastService.showError(error.error.message)
        return throwError(() => {error})
      })
    ).subscribe()

  }

  subOrUnSub(userId: string, subId: string){
    this.subscriptionService.subscribeOrUnsubscribe({userId: userId, subId: subId}).pipe(
      tap((result: any) => {
        this.queryRecipes()
        if(result.success){
          this.toastService.showSuccess(result.message)
        }
        else{
          this.toastService.showError(result.message)
        }
      }),
      catchError((error: any) => {
        this.toastService.showError(error.error.message)
        return throwError(() => {error})
      })
    ).subscribe()
  }

  toggleRecipeStatus(recipe: any) {
    recipe.status = !recipe.status
  }

  toggleComments(recipe: any){
    recipe.showComments = !recipe.showComments;
  }

  queryRecipes(){
    this.recipeService.getAllRecipes()
    .pipe(
      tap((result: any) => {
        if(result.success){
          this.recipeService.recipeTemplate.next(
            result.recipes.map((recipe: any) => {
              return {
                ...recipe,
                status: false,
                showComments: false,
              }
            })
          )
        }
        else{
          this.toastService.showWarning('Could not load recipes. Try again later or reload the page!')
        }
      }),
      catchError((error: Error) => {
        this.toastService.showError(error.message)
        return throwError(() => {error})
      }),
      shareReplay(1)
    ).subscribe(() => {
      this.recipeService.recipes.next(this.recipeService.recipeTemplate.getValue())
    })
  }

  makeComment(commenterId: string, recipeId: string){
    const payload = {
      commenterId: commenterId,
      recipeId: recipeId,
      comment: this.commentForm.get('comment')?.value
    }
    this.commentService.makeComment(payload).pipe(
      tap((result: any) => {
        this.queryRecipes()
        if(result.success){
          this.commentForm.reset()
          this.toastService.showSuccess(result.message)
        }else{
          this.toastService.showError(result.message)
        }
      })
    ).subscribe()
  }

  getUserProfile(){
    this.profileService.getProfile(this.authUser.userId)
  }

}
