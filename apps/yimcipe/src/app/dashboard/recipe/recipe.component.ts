import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'yimcipe-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeComponent implements OnInit, OnDestroy {
  selectedCategory!: string;
  categoryFormFieldState = false;
  categoryExists = false;

  $categories: string[] = ['Traditional', 'Modern']

  @ViewChild('category') category!: ElementRef;

  editor!: Editor;

  editorConfig = {
    editable: true,
    spellcheck: false,
    height: '10rem',
    minHeight: '20rem',
  };

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  ngOnInit(): void {
    this.editor = new Editor()
  }

  ngOnDestroy(): void {
      this.editor.destroy()
  }

  getCategory(): string{
    if(this.selectedCategory === undefined || this.selectedCategory === 'Select meal category' || this.selectedCategory === 'Category not here? Add new category') return 'Enter new category'
    return this.selectedCategory
  }
}
