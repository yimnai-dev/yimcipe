import { tap, catchError, throwError } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ToastService } from '../../shared/services/toastr/toast.service';

@Component({
  selector: 'yimcipe-reset-password',
  template: `
  <main class="w-screen h-screen bg-darkChocolate flex items-center justify-center">
  <div class="w-full h-full md:w-[70vw] md:h-[90vh] bg-white shadow-lg rounded-lg flex items-center justify-center">
    <form class="flex flex-col items-center justify-center " [formGroup]="resetPasswordForm">
      <div class="flex items-center justify-center py-4">
        <img src="assets/images/logo.svg" alt="Logo" class="">
      </div>
      <div class="flex flex-col items-center justify-center space-y-6">
        <div class="relative mb-6 w-screen md:w-96 md:px-2 py-3 px-1">
          <input [type]="passwordVisibilityState ? 'text' : 'password'" id="password" class="block border-solid border-2 border-pinkChocolate rounded-md w-full h-12 focus:outline-none focus:border-darkGray text-md text-darkChocolate peer" placeholder=" " autocomplete="off" formControlName="newPassword">
          <label for="password" class="absolute duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-darkChocolate peer-focus:dark:text-pinkChocolate peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">New Password</label>
          <img src="assets/images/visibility.svg" alt="Visibility Icon" (click)="passwordVisibilityState = !passwordVisibilityState" *ngIf="passwordVisibilityState" class="absolute z-[9999] -translate-y-9 translate-x-[85vw] md:translate-x-80">
          <img src="assets/images/hide-visibility.svg" alt="Visibility Icon" (click)="passwordVisibilityState = !passwordVisibilityState" *ngIf="!passwordVisibilityState" class="absolute z-[9999] -translate-y-9 translate-x-[85vw] md:translate-x-80">
        </div>
        <div class="relative mb-6 w-screen md:w-96 md:px-2 py-3 px-1">
          <input [type]="passwordVisibilityState ? 'text' : 'password'" id="confirmPassword" class="block border-solid border-2 border-pinkChocolate rounded-md w-full h-12 focus:outline-none focus:border-darkGray text-md text-darkChocolate peer" placeholder=" " autocomplete="off" formControlName="confirmPassword">
          <label for="confirmPassword" class="absolute duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-darkChocolate peer-focus:dark:text-pinkChocolate peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Confirm Password</label>
          <img src="assets/images/visibility.svg" alt="Visibility Icon" (click)="passwordVisibilityState = !passwordVisibilityState" *ngIf="passwordVisibilityState" class="absolute z-[9999] -translate-y-9 translate-x-[85vw] md:translate-x-80">
          <img src="assets/images/hide-visibility.svg" alt="Visibility Icon" (click)="passwordVisibilityState = !passwordVisibilityState" *ngIf="!passwordVisibilityState" class="absolute z-[9999] -translate-y-9 translate-x-[85vw] md:translate-x-80">
        </div>
      </div>
      <div class="block py-6">
        <button class="bg-darkChocolate text-white rounded-md hover:bg-pinkChocolate hover:text-darkChocolate px-3 py-3" (click)="resetPassword()">CHANGE</button>
      </div>
    </form>
  </div>
</main>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent implements OnInit {

    resetPasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  })
passwordVisibilityState = false;
  constructor(@SkipSelf() private authService: AuthService, private toastService: ToastService, private router: Router) {}

  ngOnInit(): void {}

  resetPassword() {
    const payload = {
      email: localStorage.getItem('confirmationEmail') as string,
      newPass: this.resetPasswordForm.get('newPassword')?.value,
      confirmPass: this.resetPasswordForm.get('confirmPassword')?.value
    }
    this.authService.resetPassword(payload).pipe(
      tap((result: any) => {
        if(result.success){
          this.toastService.showSuccess('Password Change successful')
          localStorage.removeItem('confirmationEmail')
          this.router.navigate(['/user/login'])
        }
        else{
          this.toastService.showSuccess('Password change unsuccessful: ' + result.message)
        }
        this.resetPasswordForm.reset()
      }),
      catchError((error: Error) => {
        this.toastService.showError(error.message)
        return throwError(() => {error})
      })
    ).subscribe()
  }
}
