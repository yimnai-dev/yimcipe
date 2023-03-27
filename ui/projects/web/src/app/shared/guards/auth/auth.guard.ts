import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';


export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const isLoggedIn = authService.isLoggedIn();
  if(isLoggedIn){
    return true
  }
  else{
    router.navigate(['/user/login'])
    return false
  }

}
