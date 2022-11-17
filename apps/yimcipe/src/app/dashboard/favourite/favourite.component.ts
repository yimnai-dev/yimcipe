import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'yimcipe-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouriteComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
