import { CommentFormService } from '../../../shared/services/forms/comments.service';
import { VoteService } from '../../../shared/services/vote/vote.service';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../../shared/services/recipe/recipe.service';
import { CommentService } from '../../../shared/services/comment/comment.service';
@Component({
  selector: 'yimcipe-single-recipe',
  templateUrl: './single-recipe.component.html',
})
export class SingleRecipeComponent implements OnInit {

  authUser = JSON.parse(localStorage.getItem('authUser') || '{}');

  constructor(public recipeService: RecipeService, public voteService: VoteService, public commentFormService: CommentFormService, public commentService: CommentService,) { }

  ngOnInit(): void {
    const activeRecipeId = window.location.pathname.split('/').reverse()[0]
    this.recipeService.recipes.getValue().find(recipe => {
      if (recipe.recipeId === activeRecipeId) {
        this.recipeService.activeRecipe = recipe;
      }
    })
  }
}
