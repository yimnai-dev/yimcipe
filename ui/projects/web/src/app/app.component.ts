import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'yimcipe-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet],
    providers: [
    ]
})
export class AppComponent {
  constructor(private http: HttpClient) {}
}
