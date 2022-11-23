import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'yimcipe-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCardComponent {
  @Input() $recipes!: [];
  count = [1, 2, 3, 4, 5]
  // commentSectionController(sectionId?: number){

  // }

}
