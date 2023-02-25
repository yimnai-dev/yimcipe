import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'yimcipe-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent implements OnInit {
  @Input() nameInitial = 'Y'
  @Input() dropdownMenu!: HTMLDivElement;

  constructor() { }

  ngOnInit(): void {
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


