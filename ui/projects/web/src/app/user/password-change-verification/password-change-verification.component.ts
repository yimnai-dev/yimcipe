/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'yimcipe-password-change-verification',
    template: `
  <main class="w-screen h-screen bg-white flex flex-col items-center justify-center">
  <img src="assets/images/email-confirmation.svg" class="w-24 h-24">
  <h1 class="text-green-500 font-bold text-4xl md:text-5xl py-3 px-2 text-center">Check your email. A message has been sent to </h1>
  <h1 class="text-darkChocolate font-bold text-xl sm:text-2xl md:text-3xl py-3 px-2 text-center">{{ email }}</h1>
  <button class="px-3 py-2 rounded-md bg-darkChocolate text-white font-light" [routerLink]="['/user/forgot/confirm-token']">Confirm Token</button>
</main>

  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterLink]
})
export class PasswordChangeVerificationComponent implements OnInit {
  email!: string;
  constructor() { }

  ngOnInit(): void {
    this.email = localStorage.getItem('confirmationEmail') as string
  }
}
