import { Routes } from '@angular/router';
import { ConfirmPasswordTokenComponent } from './confirm-password-token/confirm-password-token.component';
import { EmailVerifierComponent } from './email-verifier/email-verifier.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { PasswordChangeVerificationComponent } from './password-change-verification/password-change-verification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user.component';


export const USER_ROUTES: Routes = [
  // {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '', component: UserComponent,
  children: [
    {path: 'verify', component: EmailVerifierComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'login', component: LoginComponent},
    {path: 'forgot', component: ForgotPasswordComponent},
    {path: 'reset', component: ResetPasswordComponent},
    {path: 'forgot/sent', component: PasswordChangeVerificationComponent},
    {path: 'forgot/confirm-token', component: ConfirmPasswordTokenComponent},
  ]}
]
