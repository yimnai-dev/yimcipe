import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NavigationLinksComponent } from '../navigation-links/navigation-links.component';

@Component({
    selector: 'yimcipe-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NavigationLinksComponent]
})
export class ToolbarComponent implements OnInit {
  @Input() nameInitial = 'Y'
  @Input() dropdownMenu!: HTMLDivElement;

  profileImageClass!: string;
  profile!: any;
  constructor() {
  }

  ngOnInit(): void {
    this.profile = JSON.parse(localStorage.getItem('profile') || '{}')
    document.addEventListener('click', (event: any) => {
      if(event.target.id === 'controller'){
        this.dropdownMenu.classList.toggle('hidden')
      }
      if((event.target.id !== 'controller' && event.target.id !== 'dropdown' && event.target.id !== 'content')){
        this.dropdownMenu.classList.add('hidden')
      }
    })
  }

}


