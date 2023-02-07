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
  template: `
  <yimcipe-loading-spinner *ngIf="isLoading$ | async"></yimcipe-loading-spinner>
<main class="w-screen min-h-screen bg-darkChocolate flex justify-center" *ngIf="!(isLoading$ | async)">
  <!-- Container -->
  <div class="container mx-auto flex flex-col md:flex-row items-center justify-between md:justify-around space-x-3 space-y-11 md:space-y-0">
    <!-- Intro Message -->
  <div class="flex flex-col justify-between items-start px-6 md:w-96 pt-12">
    <h1 class="text-4xl md:text-6xl text-pinkChocolate py-4 font-bold">Welcome To YimCipe</h1>
    <p class="text-md md:text-xl text-white py-4 font-light">You want to do it yourself but don't know exactly where to start? We've got you covered.</p>
    <p class="text-md md:text-xl text-white py-4 font-light">Have an account already? You can log in <a [routerLink]="['/user/login']" class="text-2xl underline text-pinkChocolate font-semibold hover:text-darkGray">Here</a></p>
  </div>
  <!-- Signup Form-->
  <div class="bg-white md:rounded-lg md:w-96 w-screen h-auto pb-6">
    <form class="w-96 md:w-80 pt-6" [formGroup]="registrationForm">
      <div class="relative mb-6 w-screen md:w-96 md:px-2">
        <input type="text" id="verificationCode" class="block border-solid border-2 border-pinkChocolate rounded-md w-full h-12 focus:outline-none focus:border-darkGray text-md text-darkChocolate peer" placeholder=" " autocomplete="off" formControlName="verificationCode">
        <label for="username" class="absolute duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-darkChocolate peer-focus:dark:text-pinkChocolate peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Verification Code</label>
        <p class="text-red-500 font-bold" *ngIf="registrationForm.get('verificationCode')?.dirty && registrationForm.get('verificationCode')?.invalid">Verification code is invalid!</p>
      </div>
      <div class="relative mb-6 w-screen md:w-96 md:px-2">
        <input type="text" id="username" class="block border-solid border-2 border-pinkChocolate rounded-md w-full h-12 focus:outline-none focus:border-darkGray text-md text-darkChocolate peer" placeholder=" " autocomplete="off" formControlName="username">
        <label for="username" class="absolute duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-darkChocolate peer-focus:dark:text-pinkChocolate peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Username</label>
        <p class="text-red-500 font-bold" *ngIf="registrationForm.get('username')?.dirty && registrationForm.get('username')?.invalid">Username field cannot be left empty!</p>

      </div>
      <div class="relative mb-6 w-screen md:w-96 md:px-2">
        <input type="email" id="email" class="block border-solid border-2 border-pinkChocolate rounded-md w-full h-12 focus:outline-none focus:border-darkGray text-md text-darkChocolate peer" placeholder=" " autocomplete="off" formControlName="email">
        <label for="email" class="absolute duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-darkChocolate peer-focus:dark:text-pinkChocolate peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
        <p class="text-red-500 font-bold" *ngIf="registrationForm.get('email')?.dirty && registrationForm.get('email')?.hasError('required')">Email is required!</p>
        <p class="text-red-500 font-bold" *ngIf="registrationForm.get('email')?.dirty && registrationForm.get('email')?.hasError('email')">Email is incorrect!</p>

      </div>
      <div class="relative mb-6 w-screen md:w-96 md:px-2">
        <input [type]="passwordVisibilityState ? 'text' : 'password'" id="password" class="block border-solid border-2 border-pinkChocolate rounded-md w-full h-12 focus:outline-none focus:border-darkGray text-md text-darkChocolate peer" placeholder=" " autocomplete="off" formControlName="password">
        <label for="password" class="absolute duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-darkChocolate peer-focus:dark:text-pinkChocolate peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Password</label>
        <img src="assets/images/visibility.svg" alt="Visibility Icon" (click)="passwordVisibilityState = !passwordVisibilityState" *ngIf="passwordVisibilityState" class="absolute -translate-y-8 md:translate-x-80 translate-x-128">
        <img src="assets/images/hide-visibility.svg" alt="Visibility Icon" (click)="passwordVisibilityState = !passwordVisibilityState" *ngIf="!passwordVisibilityState" class="absolute -translate-y-8 md:translate-x-80 translate-x-128">
        <p class="text-red-500 font-bold" *ngIf="registrationForm.get('password')?.dirty && registrationForm.get('password')?.hasError('required')">Password field is required!</p>
        <p class="text-red-500 font-bold" *ngIf="registrationForm.get('password')?.dirty">Password length must be contain at least 8 characters!</p>

      </div>
      <div class="w-screen md:w-96 mx-auto text-center">
        <button class="bg-darkChocolate text-white px-4 py-2 rounded-md hover:bg-pinkChocolate hover:text-darkChocolate" [disabled]="registrationForm.invalid" (click)="registerUser()">SIGNUP</button>
      </div>
      <div class="w-screen md:w-96 mx-auto flex flex-col items-center pt-3">
        <a href="#" class="border-solid border-2 border-pinkChocolate w-1/2 mb-2 text-center pb-2 rounded-xl hover:border-transparent hover:bg-darkChocolate hover:text-white">Login with google?</a>
        <a href="#" class="border-solid border-2 border-pinkChocolate w-1/2 mt-2 text-center pb-2 rounded-xl hover:border-transparent hover:bg-darkChocolate hover:text-white">Login with facebook?</a>
        <a class="text-pinkChocolate font-bold hover:text-darkChocolate" [routerLink]="['/user/login']">Login instead?</a>
      </div>
    </form>
  </div>
  </div>
</main>

  `,
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
    const user: Pick<User, 'verificationCode' | 'username' | 'email' | 'password'> = {
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
        if(response.status >= 400){
          this.toastService.showError(response.message)
        }
        else{
          this.toastService.showSuccess('Account Created Successfully');
          this.router.navigate(['/user/login']);
        }
      })
    )
    .subscribe()
  }

}
