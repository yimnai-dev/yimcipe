import { AuthService } from '../../services/auth/auth.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'yimcipe-nav-links',
  templateUrl: './navigation-links.component.html',
})

export class NavigationLinksComponent {

  @Input() dropdownLocationState!: string;
  @Input() menuItemsClassList!: string;
  @Input() parentContainerClassList!: string;

  constructor(public authService: AuthService) { }

}
