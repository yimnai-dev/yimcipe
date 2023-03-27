import { CategoryService } from '../../../../shared/services/category/category.service';
import { RecipeService } from '../../../../shared/services/recipe/recipe.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { NgFor, AsyncPipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'yimcipe-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule, NgFor, AsyncPipe, UpperCasePipe]
})
export class SearchBarComponent implements OnInit {

  categories!: string[]

  model = {
    title: '',
    category: 'Select category'
  }

  constructor(public categoryService: CategoryService, public recipeService: RecipeService) { }

  ngOnInit(): void { }
}
