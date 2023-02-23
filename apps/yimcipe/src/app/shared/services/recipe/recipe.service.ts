import { ToastService } from './../toastr/toast.service';
import { Injectable } from '@angular/core';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpService } from '../http/http.service';

@Injectable()
export class RecipeService {

  recipes: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private toastService: ToastService, private readonly http: HttpService) { }

  recipesBaseUrl = "recipes"

   getAllRecipes(){
    return this.http.get(`${this.recipesBaseUrl}/all`)
  }

}
