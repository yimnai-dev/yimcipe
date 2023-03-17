import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable()
export class CategoryService {
  catBaseUrl = 'recipes/categories'

  categories: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])

  constructor(private readonly http: HttpService) {}

  queryCategories(){
    return this.http.get(`${this.catBaseUrl}/all`)
  }
}
