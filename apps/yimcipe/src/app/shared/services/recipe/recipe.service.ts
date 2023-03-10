import { DashboardService } from './../dashboard/dashboard.service';
import { ToastService } from './../toastr/toast.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, shareReplay, tap, throwError } from 'rxjs';
import { HttpService } from '../http/http.service';

@Injectable()
export class RecipeService {

  recipes: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  recipeTemplate: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  personalRecipes: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  favouriteRecipes: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  activeRecipe: any;

  constructor(private readonly http: HttpService, private toastService: ToastService, private dashboardService: DashboardService) { }

  recipesBaseUrl = "recipes"

   getAllRecipes(){
    return this.http.get(`${this.recipesBaseUrl}/all`)
  }

  createRecipe(user: {userId: string}, recipe: any){
    return this.http.post(`${this.recipesBaseUrl}/create?userId=${user.userId}`, recipe)
  }

  filterRecipesByCategory(event: any){
    this.recipeTemplate.subscribe(recipes => {
      const filteredRecipes = recipes.filter(recipe => recipe.category.category === event.target.value)
      if(event.target.value === 'Select category'){
        this.recipes.next(this.recipeTemplate.getValue());
      }
      else{
        this.recipes.next(filteredRecipes)
      }
    })
  }

  filterByTitle(event: any){
    this.recipeTemplate.subscribe(recipes => {
      setTimeout(() => {
        const filteredRecipes = recipes.filter(recipe => recipe.recipeTitle.toLowerCase().includes(event.target.value.toLowerCase()))
        this.recipes.next(filteredRecipes)
      }, 1000)
    })
  }

  queryRecipes(){
    this.dashboardService.isLoading$.next(true)
    this.getAllRecipes()
    .pipe(
      tap((result: any) => {
        this.dashboardService.isLoading$.next(false)
        if(result.success){
          this.recipeTemplate.next(
            result.recipes.map((recipe: any) => {
              return {
                ...recipe,
                status: false,
                showComments: false,
              }
            })
          )
        }
        else{
          this.toastService.showWarning('Could not load recipes. Try again later or reload the page!')
        }
      }),
      catchError((error: Error) => {
        this.dashboardService.isLoading$.next(false)
        this.toastService.showError(error.message)
        return throwError(() => {error})
      }),
      shareReplay(1)
    ).subscribe(() => {
      this.recipes.next(this.recipeTemplate.getValue())
    })
  }

  toggleRecipeStatus(recipe: any) {
    recipe.status = !recipe.status
  }

}
