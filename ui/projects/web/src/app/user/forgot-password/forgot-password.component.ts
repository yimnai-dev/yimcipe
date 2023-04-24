import { ChangeDetectionStrategy, Component, OnInit, SkipSelf } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { catchError, throwError, Subject } from 'rxjs';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ToastService } from '../../shared/services/toastr/toast.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'yimcipe-forgot-password',
    templateUrl: './forgot-password.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgIf, LoadingSpinnerComponent, AsyncPipe]
})

export class ForgotPasswordComponent {

  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  isLoading$: Subject<boolean> = new Subject<boolean>()

  constructor(@SkipSelf() private authService: AuthService, private toastService: ToastService, private router: Router) {}


  forgotPassword() {
    const payload = {
      email: this.forgotPasswordForm.get('email')?.value
    }
    this.isLoading$.next(true)
    this.authService.forgotPassword(payload).pipe(
      tap((result: any) => {
        this.isLoading$.next(false)
      if(result.success === true){
        localStorage.setItem('confirmationEmail', payload.email)
        this.toastService.showSuccess('Password Reset Link has been sent to your email')
        this.router.navigate(['/user/forgot/sent'])
      }
      else{
        this.toastService.showError('Could not send reset link: \nError: ' + result.message)
      }
      this.forgotPasswordForm.reset()
      }),
      catchError((error: Error) => {
        this.isLoading$.next(false)
        return throwError(() => {error})
      })
    ).subscribe(() => {
      this.isLoading$.next(false)
    })
  }

}
