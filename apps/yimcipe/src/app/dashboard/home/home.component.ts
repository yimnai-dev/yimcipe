import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'yimcipe-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef

  openCloseDropdownMenu(){
    console.log('Classlist: ', this.dropdownMenu.nativeElement.classList)
  }
}
