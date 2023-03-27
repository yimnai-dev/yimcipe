import { CommentFormService } from '../../../shared/services/forms/comments.service';
import { VoteService } from '../../../shared/services/vote/vote.service';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../../shared/services/recipe/recipe.service';
import { CommentService } from '../../../shared/services/comment/comment.service';
import { VotePipe } from '../../../pipes/vote.pipe';
import { CommentsSectionComponent } from '../../shared/components/comments-section/comments-section.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
@Component({
    selector: 'yimcipe-single-recipe',
    templateUrl: './single-recipe.component.html',
    standalone: true,
    imports: [NgIf, FormsModule, ReactiveFormsModule, NgFor, CommentsSectionComponent, VotePipe]
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
