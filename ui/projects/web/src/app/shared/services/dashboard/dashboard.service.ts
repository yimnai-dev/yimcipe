import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private readonly http: HttpService) { }

  profileBaseUrl = "users/profile";
  categoriesBaseUrl = ""
  recipesBaseUrl = "recipes"

  profile$!: any;
  categories$!: any[];
  recipes$!: any[]
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  getAllRecipes() {
    return this.http.get(`${this.recipesBaseUrl}/all`)
  }

  getUserProfile(profileId: string) {
    return this.http.get(`${this.profileBaseUrl}/get-profile?profileId=${profileId}`)
  }
}
