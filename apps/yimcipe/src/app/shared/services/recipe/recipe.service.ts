import { ToastService } from './../toastr/toast.service';
import { Injectable } from '@angular/core';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpService } from '../http/http.service';

@Injectable()
export class RecipeService {

  recipes: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  recipeTemplate: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  personalRecipes: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  favouriteRecipes: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private toastService: ToastService, private readonly http: HttpService) { }

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

}
