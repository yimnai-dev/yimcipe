import { CategoryService } from './../../../../shared/services/category/category.service';
import { RecipeService } from './../../../../shared/services/recipe/recipe.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';

@Component({
  selector: 'yimcipe-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnInit {

  categories!: string[]
  constructor(public categoryService: CategoryService) {}

  ngOnInit(): void {}
}
