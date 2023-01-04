/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../shared/interfaces/interface';
import { ToastService } from '../../shared/services/toastr/toast.service';
import { catchError, throwError, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'yimcipe-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {

  registrationForm: FormGroup = new FormGroup({
    verificationCode: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  passwordVisibilityState = false;

  isLoading$: Subject<boolean> = new Subject<boolean>()

  constructor(private authService: AuthService, private toastService: ToastService, private router: Router) {
    this.isLoading$.next(false);
  }

  registerUser(){
    const user: User = {
      verificationCode: this.registrationForm.get('verificationCode')?.value,
      username: this.registrationForm.get('username')?.value,
      email: this.registrationForm.get('email')?.value,
      password: this.registrationForm.get('password')?.value
    }
    this.isLoading$.next(true)
    this.authService.registerUser(user)
    .pipe(
      catchError((error: Error) => {
        this.isLoading$.next(false)
        this.toastService.showError(error.message);
        return throwError(() => {error})
      }),
      tap((response: any) => {
        this.isLoading$.next(false)
        this.toastService.showSuccess('Account Created Successfully');
        this.router.navigate(['/user/login']);
      })
    )
    .subscribe((response: any) => {
      console.log(response)
    })
  }

}
