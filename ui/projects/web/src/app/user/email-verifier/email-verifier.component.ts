import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Subject, catchError, tap, throwError } from 'rxjs';
import { ToastService } from '../../shared/services/toastr/toast.service';
import { Router } from '@angular/router';
import { User } from '../../shared/interfaces/interface';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'yimcipe-email-verifier',
    template: `
    <yimcipe-loading-spinner *ngIf="isLoading$ | async"></yimcipe-loading-spinner>
<main
  [class]="'w-screen min-h-screen bg-darkChocolate flex items-center justify-between'"
  *ngIf="!(isLoading$ | async)"
>
<form [formGroup]="emailVerificationForm" [class]="'container mx-auto md:rounded-lg md:shadow-lg bg-white w-screen h-screen md:h-[90vh] md:w-[80vw] flex flex-col items-center justify-center md:pb-6'">

  <div
    [class]="'container w-[100vw] mx-auto flex flex-col justify-center items-center md:w-auto'"
  >
    <img src="assets/images/logo.svg" class="px-3 md:px-0 md:w-[30%]" />
    <p
      [class]="'text-darkChocolate text-2xl md:text-3xl text-center px-3 mt-6 md:px-0'"
    >
      Enter email with which you want to create your account.
      Ensure it is a valid email
    </p>
  </div>
  <div
    [class]="'relative mb-6 w-96 md:px-2 mt-12 mx-auto flex items-center justify-center'"
  >
    <input
      type="email"
      id="email"
      [class]="'block border-solid border-2 border-pinkChocolate rounded-md w-full h-12 focus:outline-none focus:border-darkGray text-md text-darkChocolate peer'"
      placeholder=" "
      autocomplete="off"
      formControlName="email"
    />
    <label
      for="email"
      [class]="'absolute duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-darkChocolate peer-focus:dark:text-pinkChocolate peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'"
      >Email</label
    >
  </div>
  <div [class]="'container w-96 mx-auto text-center'">
    <button
      [class]="'bg-darkChocolate text-white px-6 py-2 rounded-md hover:bg-pinkChocolate hover:text-darkChocolate'"
      (click)="verifyEmail()"
      [disabled]="emailVerificationForm.invalid"
    >
      SEND
    </button>
  </div>
</form>
</main>

  `,
    standalone: true,
    imports: [NgIf, LoadingSpinnerComponent, FormsModule, ReactiveFormsModule, AsyncPipe]
})
export class EmailVerifierComponent {

  emailVerificationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  isLoading$: Subject<boolean> = new Subject<boolean>()

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ){
    this.isLoading$.next(false)
  }

  verifyEmail(){
    const user: Pick<User, 'email'> = {
      email: this.emailVerificationForm.get('email')?.value as string
    }
    this.isLoading$.next(true);
    this.authService.sendVerificationEmail(user)
    .pipe(
      catchError((error: Error) => {
        this.toastService.showError(error.message);
        this.isLoading$.next(false);
        return throwError(() => {error})
      }),
      tap((response: any) => {
        if(response.success){
          this.isLoading$.next(false);
          this.toastService.showSuccess('A verification Code has been sent to your email!');
          this.router.navigate(['/user/signup']);
        }
        else{
          this.isLoading$.next(false);
          this.toastService.showError(response.message);
        }
      })
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ).subscribe(() => {});
  }

}
