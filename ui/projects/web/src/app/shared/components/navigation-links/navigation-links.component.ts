import { AuthService } from '../../services/auth/auth.service';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
    selector: 'yimcipe-nav-links',
    templateUrl: './navigation-links.component.html',
    standalone: true,
    imports: [NgIf, RouterLink, RouterLinkActive]
})

export class NavigationLinksComponent {

  @Input() dropdownLocationState!: string;
  @Input() menuItemsClassList!: string;
  @Input() parentContainerClassList!: string;

  constructor(public authService: AuthService) { }

}
