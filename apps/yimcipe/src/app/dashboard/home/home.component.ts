import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'yimcipe-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;

  closeDropdownMenu(){
    this.dropdownMenu.nativeElement.classList.add('hidden')
  }
}
