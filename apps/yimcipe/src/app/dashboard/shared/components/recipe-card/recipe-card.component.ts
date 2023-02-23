import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { CommentService } from './../../../../../../../api/src/app/comments/service/comments.service';
import { CategoryService } from './../../../../shared/services/category/category.service';
import { ToastService } from './../../../../shared/services/toastr/toast.service';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngxs/store';
import { RecipeService } from 'apps/yimcipe/src/app/shared/services/recipe/recipe.service';
import { tap, catchError, throwError, shareReplay, map } from 'rxjs';
import { Buffer } from 'buffer';
import { SubscriptionService } from 'apps/yimcipe/src/app/shared/services/subscription/subscription.service';
import { VoteService } from 'apps/yimcipe/src/app/shared/services/vote/vote.service';
import { CommentService } from 'apps/yimcipe/src/app/shared/services/comment/comment.service';

@Component({
  selector: 'yimcipe-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [VotePipe, SubscriptionPipe]
})
export class RecipeCardComponent implements OnInit{

  recipes!: any[]
  votes!: any[]

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
     private commentService: CommentService
     ){}

  ngOnInit(): void {
    this.queryRecipes()
    // this.getAllVotes()
    this.categoryService.queryCategories().subscribe((result: any) => {
      this.categoryService.categories.next(result.categories)
    })
  }

  makeVote({recipeId, voterId, voteType}: {recipeId: string, voterId: string, voteType: 'upvote' | 'downvote'}){
    this.voteService.vote({recipeId, voterId, voteType}).pipe(
      tap((result: any) => {
        console.log('Vote Result: ', result);
        this.queryRecipes()
        this.getAllVotes()

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
        this.getAllVotes()
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
        console.log('Result: ', result.recipes);

        if(result.success){
          this.recipeService.recipes.next(
            result.recipes.map((recipe: any) => {
              return {
                ...recipe,
                status: false,
                showComments: false,
                avatar: this.convertBlobToImage(recipe.user?.profile?.photo)
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
    ).subscribe()
  }

  convertBlobToImage(blobData: any){
    const buff = Buffer.from(blobData.data).toString('base64')
    const imageUrl = "data:image/jpeg;base64," + buff;
    console.log(imageUrl);
    return imageUrl
  }

  makeComment(commenterId: string, recipeId: string){
    const payload = {
      commenterId: commenterId,
      recipeId: recipeId,
      comment: this.commentForm.get('comment')?.value
    }
    this.commentService.makeComment(payload).pipe(
      tap((result: any) => {
        console.log('Comment Result: ', result);
        this.getAllVotes()
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

  getAllVotes(){
    this.voteService.getVotes()
    .pipe(
      tap((result: any) => {
        this.voteService.votes.next(result.votes)
        this.votes = result.votes
      })
    ).subscribe()
  }

}
