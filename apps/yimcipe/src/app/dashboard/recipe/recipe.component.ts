import { CategoryService } from './../../shared/services/category/category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from 'apps/yimcipe/src/app/shared/services/recipe/recipe.service';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';
import { tap, Subject, catchError, throwError } from 'rxjs';
import { ToastService } from '../../shared/services/toastr/toast.service';

@Component({
  selector: 'yimcipe-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeComponent implements OnInit, OnDestroy {
  selectedCategory: string = 'Select meal category';
  isLoading$: Subject<boolean> = new Subject<boolean>();
  state = false

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


  model = {
    title: '',
    content: '',
    category: this.selectedCategory,
  }

  authUser = JSON.parse(localStorage.getItem('authUser') || '{}')


  constructor(
    private recipeService: RecipeService,
    public categoryService: CategoryService,
    private toastService: ToastService,
    ) { }

  ngOnInit(): void {
    this.editor = new Editor()
    this.categoryService.queryCategories().subscribe((result: any) => {
      this.categoryService.categories.next(result.categories)
    })

  }

  manageCategories(event: any) {
    this.selectedCategory = event.target.value
    if(this.selectedCategory == 'Add new category'){
      this.state = !this.state
    }
    if(this.state){
      this.model.category = ''
    }
  }

  manageCheckbox(event: any){
    if(event.target.checked){
      this.state = false
      this.model.category = this.selectedCategory
    }
  }

  addRecipe(){
    this.isLoading$.next(true)
    const recipe = {
      title: this.model.title,
      content: this.model.content,
      category: this.model.category,
    }
    this.recipeService.createRecipe({userId: this.authUser.userId}, recipe).pipe(
      tap((result: any) => {
        this.isLoading$.next(false)
        if(result.success){
          this.toastService.showSuccess(result.message)
        }else{
          this.toastService.showError(result.message)
        }
      }),
      catchError((err) => {
        this.isLoading$.next(false)
        this.toastService.showError(err.message)
        return throwError(() => {err})
      })
    ).subscribe(() => {
      this.isLoading$.next(false)
      this.model.category = ''
      this.model.content = ''
      this.model.title = ''
    })
  }

  ngOnDestroy(): void {
    this.editor.destroy()
}
}
