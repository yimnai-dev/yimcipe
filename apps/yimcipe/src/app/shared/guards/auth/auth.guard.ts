import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const baseUrl = 'http://localhost:4200'
    const isLoggedIn = this.authService.isLoggedIn()
    if(isLoggedIn){
      // if(route.url.join('/') === baseUrl){
      //   this.router.navigate(['/dashboard/home/main'])
      // }
      return true
    }
    else{
      this.router.navigate(['/user/login'])
      return false
    }
  }

}
