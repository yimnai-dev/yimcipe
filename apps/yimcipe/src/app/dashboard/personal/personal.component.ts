import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'yimcipe-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalComponent {
}
