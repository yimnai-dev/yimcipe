import { ToastService } from '../toastr/toast.service';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { RecipeService } from '../recipe/recipe.service';

@Injectable()
export class VoteService {

  voteBaseUrl = 'recipes/vote'
  votes: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private readonly http: HttpService, private recipeService: RecipeService, private toastService: ToastService) { }

  vote(payload: { recipeId: string; voterId: string; voteType: 'upvote' | 'downvote' }) {
    return this.http.post(`${this.voteBaseUrl}/make-vote?voterId=${payload.voterId}&recipeId=${payload.recipeId}&voteType=${payload.voteType}`)
  }

  getVotes() {
    return this.http.get(`${this.voteBaseUrl}/all`)
  }
  getAllVotes() {
    this.getVotes().subscribe((result: any) => {
      this.votes.next(result.votes)
    })
  }

  makeVote({ recipeId, voterId, voteType }: { recipeId: string, voterId: string, voteType: 'upvote' | 'downvote' }) {
    return this.vote({ recipeId, voterId, voteType }).pipe(
      tap((result: any) => {
        this.getAllVotes()
        this.recipeService.queryRecipes().subscribe(() => {
            this.recipeService.recipes.next(this.recipeService.recipeTemplate.getValue())
        })
        if (result.success) {
          this.toastService.showSuccess(result.message)
        } else {
          this.toastService.showError(result.message)
        }
      }),
      catchError((error: any) => {
        this.toastService.showError(error.error.message)
        return throwError(() => { error })
      })
    )

  }
}
