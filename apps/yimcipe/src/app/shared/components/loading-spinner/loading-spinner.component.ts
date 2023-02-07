import { Component } from '@angular/core';

@Component({
  selector: 'yimcipe-loading-spinner',
  template: `
  <main class="flex h-screen items-center justify-center bg-darkChocolate">
      <div class="border-gray mr-3 h-96 w-96 animate-spin rounded-full border-8 border-t-8 border-white"></div>
  </main>
  `,
  styles: [],
  standalone: true
})
export class LoadingSpinnerComponent {}
