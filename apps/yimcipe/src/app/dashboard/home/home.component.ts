import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'yimcipe-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;

  nameInitial!: string;
  profile!: any;

  constructor(public authService: AuthService) {
    const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
    this.nameInitial = authUser.username.split('')[0].toUpperCase();
   }

  closeDropdownMenu(){
    this.dropdownMenu.nativeElement.classList.add('hidden')
  }
}
