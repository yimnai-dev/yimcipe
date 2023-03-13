import { tap, catchError, throwError } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ToastService } from '../../shared/services/toastr/toast.service';

@Component({
  selector: 'yimcipe-reset-password',
  templateUrl: './reset-password.component.html',
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
