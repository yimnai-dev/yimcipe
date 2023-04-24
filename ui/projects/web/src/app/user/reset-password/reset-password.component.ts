import { tap, catchError, throwError, Subject } from 'rxjs';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ToastService } from '../../shared/services/toastr/toast.service';
import { CommonModule, NgIf } from '@angular/common';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
    selector: 'yimcipe-reset-password',
    templateUrl: './reset-password.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgIf, LoadingSpinnerComponent, CommonModule]
})
export class ResetPasswordComponent implements OnInit {

  isLoading$: Subject<boolean> = new Subject<boolean>()

    resetPasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  })
passwordVisibilityState = false;
  constructor(@SkipSelf() private authService: AuthService, private toastService: ToastService, private router: Router) {}

  ngOnInit(): void {}

  resetPassword() {
    this.isLoading$.next(true)
    const payload = {
      email: localStorage.getItem('confirmationEmail') as string,
      newPass: this.resetPasswordForm.get('newPassword')?.value,
      confirmPass: this.resetPasswordForm.get('confirmPassword')?.value
    }
    this.authService.resetPassword(payload).pipe(
      tap((result: any) => {
        this.isLoading$.next(false)
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
        this.isLoading$.next(false)
        return throwError(() => {error})
      })
    ).subscribe()
  }
}
