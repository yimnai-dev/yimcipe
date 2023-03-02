import { tap, catchError, throwError } from 'rxjs';
import { UUIDValidator } from './../validators/form.validator';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ToastService } from '../../shared/services/toastr/toast.service';

@Component({
  selector: 'yimcipe-confirm-password-token',
  template: `
      <main
  [class]="'w-screen min-h-screen bg-darkChocolate flex items-center justify-between'"
  [formGroup]="tokenForm"
>
  <section
    [class]="'container mx-auto md:rounded-lg md:shadow-lg bg-white w-screen h-screen md:h-[90vh] md:w-[80vw] flex flex-col items-center justify-center md:pb-6'"
  >
    <div
      [class]="'container w-[100vw] mx-auto flex flex-col justify-center items-center md:w-auto'"
    >
      <img src="assets/images/logo.svg" class="px-3 md:px-0 md:w-[30%]" />
      <p
        [class]="'text-darkChocolate text-2xl md:text-3xl text-center px-3 mt-6 md:px-0'"
      >
        Confirm Reset Token Here
      </p>
    </div>
    <div
      [class]="'relative mb-6 w-96 md:px-2 mt-12 mx-auto flex items-center justify-center'"
    >
      <input
        type="text"
        id="token"
        [class]="'block border-solid border-2 border-pinkChocolate rounded-md w-full h-12 focus:outline-none focus:border-darkGray text-md text-darkChocolate peer'"
        autocomplete="off"
        formControlName="token"
      />
      <label
        for="token"
        [class]="'absolute duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-darkChocolate peer-focus:dark:text-pinkChocolate peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'"
        >Token</label
      >
    </div>
    <div class="container w-96 mx-auto text-center">
      <button
        [class]="'bg-darkChocolate text-white px-6 py-2 rounded-md hover:bg-pinkChocolate hover:text-darkChocolate'"
        (click)="validateToken()"
      >
        VALIDATE
      </button>
    </div>
  </section>
</main>
  `,
changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ConfirmPasswordTokenComponent {

  tokenForm: FormGroup = new FormGroup({
    token: new FormControl('', [Validators.required, UUIDValidator.validToken])
  })

  constructor(@SkipSelf() private authService: AuthService, private toastService: ToastService, private router: Router){}

  validateToken(){
    const payload = {
      token: this.tokenForm.get('token')?.value as string
    }
    return this.authService.validateResetToken(payload).pipe(
      tap((token: any) => {
        if(token.success){
          this.toastService.showSuccess('You can now change your password!')
          this.router.navigate(['/user/reset'])
        }
        else{
          this.router.navigate(['/user/reset'])
          this.toastService.showError('Could not confirm reset token: ' + token.message)
        }
        this.tokenForm.reset()
      }),
      catchError((error: Error) => {
        return throwError(() => {error})
      })
    ).subscribe()
  }

}
