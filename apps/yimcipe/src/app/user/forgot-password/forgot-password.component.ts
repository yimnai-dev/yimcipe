import { ChangeDetectionStrategy, Component, OnInit, SkipSelf } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ToastService } from '../../shared/services/toastr/toast.service';

@Component({
  selector: 'yimcipe-forgot-password',
  template: `
  <main
  class="w-screen min-h-screen bg-darkChocolate flex items-center justify-between"
  [formGroup]="forgotPasswordForm"
>
  <section
    class="container mx-auto md:rounded-lg md:shadow-lg bg-white w-screen h-screen md:h-[90vh] md:w-[80vw] flex flex-col items-center justify-center md:pb-6"
  >
    <div
      class="container w-[100vw] mx-auto flex flex-col justify-center items-center md:w-auto"
    >
      <img src="assets/images/logo.svg" class="px-3 md:px-0 md:w-[30%]" />
      <p
        class="text-darkChocolate text-2xl md:text-3xl text-center px-3 mt-6 md:px-0"
      >
        Enter email to receive password reset link
      </p>
    </div>
    <div
      class="relative mb-6 w-96 md:px-2 mt-12 mx-auto flex items-center justify-center"
    >
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
    </div>
    <div class="container w-96 mx-auto text-center">
      <button
        class="bg-darkChocolate text-white px-6 py-2 rounded-md hover:bg-pinkChocolate hover:text-darkChocolate"
        (click)="forgotPassword()"
      >
        SEND
      </button>
    </div>
  </section>
</main>
`,
changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ForgotPasswordComponent {

  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })
  constructor(@SkipSelf() private authService: AuthService, private toastService: ToastService, private router: Router) {}


  forgotPassword() {
    const payload = {
      email: this.forgotPasswordForm.get('email')?.value
    }
    this.authService.forgotPassword(payload).pipe(
      tap((result: any) => {
      if(result.success){
        localStorage.setItem('confirmationEmail', payload.email)
        this.toastService.showSuccess('Password Reset Link has been sent to your email')
        this.router.navigate(['user/forgot/sent'])
      }
      else{
        this.toastService.showError('Could not send reset link: ' + result.message)
      }
      this.forgotPasswordForm.reset()
      }),
      catchError((error: Error) => {
        return throwError(() => {error})
      })
    ).subscribe()
  }

}
