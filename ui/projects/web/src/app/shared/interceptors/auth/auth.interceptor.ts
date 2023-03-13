import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Location } from '@angular/common'
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private location: Location){}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = localStorage.getItem('access_token');

    if(accessToken){
      const cloned = request.clone({
        headers: request.headers.set('Authorization', "Bearer " + accessToken)
      })
      if (this.location.path() === '/') {
        this.router.navigate(['/dashboard/home/main'])
      }
      return next.handle(cloned)
    }
    else{
      return next.handle(request);
    }
  }
}
