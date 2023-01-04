import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Subject, catchError, tap, throwError } from 'rxjs';
import { ToastService } from '../../shared/services/toastr/toast.service';
import { Router } from '@angular/router';
import { User } from '../../shared/interfaces/interface';

@Component({
  selector: 'yimcipe-email-verifier',
  templateUrl: './email-verifier.component.html',
  styleUrls: ['./email-verifier.component.scss'],
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
      tap(() => {
        this.isLoading$.next(false);
        this.toastService.showSuccess('A verification Code has been sent to your email!');
        this.router.navigate(['/user/signup']);
      })
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ).subscribe(() => {});
  }

}
