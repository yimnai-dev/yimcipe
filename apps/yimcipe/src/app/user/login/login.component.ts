import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit, SkipSelf } from '@angular/core';
import { User } from '../../shared/interfaces/interface';
import { AuthService } from '../../shared/services/auth/auth.service';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastService } from '../../shared/services/toastr/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'yimcipe-login',
  template: `
    <main class="w-screen min-h-screen bg-darkChocolate flex justify-center">
  <!-- Container -->
  <div
    class="container mx-auto flex flex-col md:flex-row items-center justify-between md:justify-around space-x-3 space-y-11 md:space-y-0"
  >
    <!-- Intro Message -->
    <div class="flex flex-col justify-between items-start px-6 md:w-96 pt-12">
      <h1 class="text-4xl md:text-6xl text-pinkChocolate py-4 font-bold">
        Welcome To YimCipe
      </h1>
      <p class="text-md md:text-xl text-white py-4 font-light">
        You want to do it yourself but don't know exactly where to start? We've
        got you covered.
      </p>
      <p class="text-md md:text-xl text-white py-4 font-light">
        Do not have an account yet? You can create one
        <a
          [routerLink]="['/user/verify']"
          class="text-2xl underline text-pinkChocolate font-semibold hover:text-darkGray"
          >Here</a
        >
      </p>
    </div>
    <!-- Signup Form-->
    <div class="bg-white md:rounded-lg md:w-96 w-screen h-auto pb-6">
      <form class="w-96 md:w-80 pt-6" [formGroup]="loginForm">
        <div class="relative mb-6 w-screen md:w-96 md:px-2">
          <input
            type="email"
            id="email"
            class="block border-solid border-2 border-pinkChocolate rounded-md w-full h-12 focus:outline-none focus:border-darkGray text-md text-darkChocolate peer"
            placeholder=" "
            autocomplete="off"
            formControlName="email"
          />
          <label
            for="email"
            class="absolute duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-darkChocolate peer-focus:dark:text-pinkChocolate peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Email</label
          >
        <p class="text-red-500 font-bold" *ngIf="loginForm.get('email')?.dirty && loginForm.get('email')?.hasError('required')">*Email is required</p>
        <p class="text-red-500 font-bold" *ngIf="loginForm.get('email')?.dirty && loginForm.get('email')?.hasError('email')">*Email is incorrect</p>
        </div>
        <div class="relative mb-6 w-screen md:w-96 md:px-2">
          <input
            [type]="passwordVisibilityState ? 'text' : 'password'"
            id="password"
            class="block border-solid border-2 border-pinkChocolate rounded-md w-full h-12 focus:outline-none focus:border-darkGray text-md text-darkChocolate peer"
            placeholder=" "
            autocomplete="off"
            formControlName="password"
          />
          <label
            for="password"
            class="absolute duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-whitepx-2 peer-focus:px-2 peer-focus:text-darkChocolate peer-focus:dark:text-pinkChocolate peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Password</label
          >
          <p class="text-red-500 font-bold" *ngIf="loginForm.get('password')?.dirty && loginForm.get('password')?.hasError('required')">Password field is required!</p>
          <!-- <p class="text-red-500 font-bold z-[9999]" *ngIf="loginForm.get('password')?.dirty && loginForm.get('password')?">Password length must be contain at least 8 characters!</p> -->

          <img
            src="assets/images/visibility.svg"
            alt="Visibility Icon"
            (click)="passwordVisibilityState = !passwordVisibilityState"
            *ngIf="passwordVisibilityState"
            class="absolute -translate-y-8 md:translate-x-80 translate-x-128"
          />
          <img
            src="assets/images/hide-visibility.svg"
            alt="Visibility Icon"
            (click)="passwordVisibilityState = !passwordVisibilityState"
            *ngIf="!passwordVisibilityState"
            class="absolute -translate-y-8 md:translate-x-80 translate-x-128"
          />
        </div>
        <div class="w-screen md:w-96 mx-auto text-center">
          <button
            class="bg-darkChocolate text-white px-4 py-2 rounded-md hover:bg-pinkChocolate hover:text-darkChocolate"
            (click)="loginUser()"
          >
            LOGIN
          </button>
        </div>
        <div class="w-screen md:w-96 mx-auto flex flex-col items-center pt-3">
          <a
            href="#"
            class="border-solid border-2 border-pinkChocolate w-1/2 mb-2 text-center pb-2 rounded-xl hover:border-transparent hover:bg-darkChocolate hover:text-white"
            >Login with google?</a
          >
          <a
            href="#"
            class="border-solid border-2 border-pinkChocolate w-1/2 mt-2 text-center pb-2 rounded-xl hover:border-transparent hover:bg-darkChocolate hover:text-white"
            >Login with facebook?</a
          >
          <a
            class="text-pinkChocolate font-bold hover:text-darkChocolate"
            [routerLink]="['/user/forgot']"
            >Forgot password?</a
          >
        </div>
      </form>
    </div>
  </div>
</main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(8)])
  })
  passwordVisibilityState = false;
  constructor(@SkipSelf() private authService: AuthService, private toastService: ToastService, private router: Router) { }


  loginUser(){
    const user: Pick<User, 'email' | 'password'> = {
      email: this.loginForm.get('email')?.value as string,
      password: this.loginForm.get('password')?.value as string
    };
    this.authService.loginUser(user)
    .pipe(
      catchError((error: Error) => {
        this.toastService.showError(error.message);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return throwError(() => {})
      }),
      tap((response: any) => {
        if(response.status >= 400){
          this.toastService.showWarning(`${response.status}: ${response.message}`)
        }
        else{
          this.authService.setUserSession(response)
          this.toastService.showSuccess('Successfully Logged in!')
          this.router.navigate(['/dashboard/home/main']);
        }
      }),
      shareReplay()
    ).subscribe((response: any) => {
      console.log('Response: ', response)
    })
  }

}
