import { Component } from '@angular/core';

@Component({
  selector: 'yimcipe-loading-spinner',
  template:  `
  <main [class]="'w-screen h-screen flex flex-col items-center justify-center space-y-12'">
  <div [class]="'z-50 w-24 h-24 border-4 border-solid border-darkChocolate rounded-full animate-bounce'"></div>
</main>

  `
})
export class LoadingSpinnerComponent {}
