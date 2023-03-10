import { CommentFormService } from './../forms/comments.service';
import { ToastService } from './../toastr/toast.service';
import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { RecipeService } from '../recipe/recipe.service';
import { tap } from 'rxjs';

@Injectable()
export class CommentService {
  constructor(private http: HttpService, private recipeService: RecipeService, private toastService: ToastService, private commentFormService: CommentFormService) {}

  commentBaseUrl = 'recipes/comments'

  makeComment(commenterId: string, recipeId: string){
    const commentOb = {
      commenterId: commenterId,
      recipeId: recipeId,
      comment: this.commentFormService.commentForm.get('comment')?.value
    }
    this.http.post(`${this.commentBaseUrl}/make-comment`, {...commentOb})
    .pipe(
      tap((result: any) => {
        this.recipeService.queryRecipes()
        if(result.success){
          this.commentFormService.commentForm.reset()
          this.toastService.showSuccess(result.message)
        }else{
          this.toastService.showError(result.message)
        }
      })
    ).subscribe()
  }

  toggleComments(recipe: any){
    recipe.showComments = !recipe.showComments;
  }

}
