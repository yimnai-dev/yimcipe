import { Router } from '@angular/router';
import { CommentFormService } from '../../../../shared/services/forms/comments.service';
import { ProfileService } from '../../../../shared/services/profile/profile.service';
import { CategoryService } from '../../../../shared/services/category/category.service';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { CommentService } from 'projects/web/src/app/shared/services/comment/comment.service';
import { RecipeService } from 'projects/web/src/app/shared/services/recipe/recipe.service';
import { SubscriptionService } from 'projects/web/src/app/shared/services/subscription/subscription.service';
import { VoteService } from 'projects/web/src/app/shared/services/vote/vote.service';
import { BehaviorSubject } from 'rxjs';
import { ExcerptPipe } from '../../../../pipes/excerpt.pipe';
import { SubscriptionPipe } from '../../../../pipes/subscription.pipe';
import { VotePipe } from '../../../../pipes/vote.pipe';
import { CommentsSectionComponent } from '../comments-section/comments-section.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgFor, AsyncPipe, LowerCasePipe } from '@angular/common';

@Component({
    selector: 'yimcipe-recipe-card',
    templateUrl: './recipe-card.component.html',
    styleUrls: ['./recipe-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NgFor, FormsModule, ReactiveFormsModule, CommentsSectionComponent, AsyncPipe, LowerCasePipe, VotePipe, SubscriptionPipe, ExcerptPipe]
})
export class RecipeCardComponent implements OnInit {

  @Input() desiredRecipes: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  authUser = JSON.parse(localStorage.getItem('authUser') || '{}')

  constructor(
    public recipeService: RecipeService,
    public categoryService: CategoryService,
    public subscriptionService: SubscriptionService,
    public voteService: VoteService,
    public commentService: CommentService,
    private profileService: ProfileService,
    public commentFormService: CommentFormService,
    private router: Router,
  ) {
    this.getUserProfile()
  }

  ngOnInit(): void {
    this.voteService.getAllVotes()
    this.recipeService.queryRecipes().subscribe(() => {
      this.recipeService.recipes.next(this.recipeService.recipeTemplate.getValue())
    })
    this.categoryService.queryCategories().subscribe((result: any) => {
      this.categoryService.categories.next(result.categories)
    })
  }

  makeVote({ recipeId, voterId, voteType }: { recipeId: string, voterId: string, voteType: 'upvote' | 'downvote' }) {
    this.voteService.makeVote({ recipeId, voterId, voteType }).subscribe()
  }

  getUserProfile() {
    this.profileService.getProfile(this.authUser.userId)
  }

  viewFullRecipe(recipeId: string) {
    this.router.navigate([`/dashboard/home/main/recipe/${recipeId}`])
  }

}
