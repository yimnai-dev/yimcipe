import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'yimcipe-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class AppComponent {
  constructor() {}
}
