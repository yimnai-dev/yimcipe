import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { inject } from '@angular/core';

@Component({
    selector: 'yimcipe-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet],
    providers: [
    ]
})
export class AppComponent implements OnInit{

  private router = inject(Router)

  ngOnInit(): void {
    const accessToken = localStorage.getItem('access_token');
    accessToken ? this.router.navigate(['/dashboard/home/main']) : this.router.navigate(['/user/login'])
  }
}
