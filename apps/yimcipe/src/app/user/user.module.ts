import { SharedModule } from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../shared/services/auth/auth.service'

import { UserRoutingModule } from './user-routing.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PasswordChangeVerificationComponent } from './password-change-verification/password-change-verification.component';
import { EmailVerifierComponent } from './email-verifier/email-verifier.component';
import { LoadingSpinnerComponent } from "../shared/components/loading-spinner/loading-spinner.component";

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        UserComponent,
        PasswordChangeVerificationComponent,
        EmailVerifierComponent,
    ],
    providers: [
        AuthService
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        LoadingSpinnerComponent
    ]
})
export class UserModule {}
