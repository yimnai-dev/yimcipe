import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, SkipSelf } from '@angular/core';
import { User } from '../../shared/interfaces/interface';
import { AuthService } from '../../shared/services/auth/auth.service';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { ToastService } from '../../shared/services/toastr/toast.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Store } from '@ngxs/store';
import { LoginUser } from '../../actions/user.actions';

@Component({
  selector: 'yimcipe-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {


  loginForm: FormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(8)])
  })

  isLoading$: Subject<boolean> = new Subject<boolean>()

  passwordVisibilityState = false;
  constructor(@SkipSelf() private authService: AuthService, private toastService: ToastService, private router: Router, private store: Store) { }

  loginUser(){
    const user: Pick<User, 'email' | 'password'> = {
      email: this.loginForm.get('email')?.value as string,
      password: this.loginForm.get('password')?.value as string
    };
    this.isLoading$.next(true)
    this.authService.loginUser(user)
    .pipe(
      tap((response: any) => {
        this.isLoading$.next(false)
        if(!response.access_token){
          this.toastService.showError(`${response.status}: ${response.message}`)
        }
        else{
          const userInfo = this.getDecodedAccessToken(response.access_token)
          localStorage.setItem('authUser', JSON.stringify(userInfo))
          this.store.dispatch(new LoginUser(user)).pipe(
            tap(() => {
              this.authService.setUserSession(response)
              this.toastService.showSuccess('Successfully Logged in!')
              this.router.navigate(['/dashboard/home/main']);
            })
          ).subscribe()

        }
      }),
      catchError(error => {
        this.isLoading$.next(false)
        this.toastService.showError(error.message);
        return throwError(() => {})
      }),
      shareReplay()
    ).subscribe()
  }

  getDecodedAccessToken(token: string){
    try{
      return jwt_decode(token);
    }catch(error){
      return null
    }
  }

}
