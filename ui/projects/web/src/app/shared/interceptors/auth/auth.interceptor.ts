import { Router } from '@angular/router';
import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpEvent,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { Location } from '@angular/common'
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const accessToken = localStorage.getItem('access_token');
  const router = inject(Router)
  const location = inject(Location)
  if(accessToken){
    const cloned = req.clone({
      headers: req.headers.set('Authorization', "Bearer " + accessToken)
    })
    if(location.path() === '/'){
      router.navigate(['/dashboard/home/main'])
    }
    return next(cloned)
  }
  return next(req)
}
