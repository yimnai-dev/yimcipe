import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SearchBarComponent } from '../shared/components/search-bar/search-bar.component';

@Component({
    selector: 'yimcipe-favourite',
    templateUrl: './favourite.component.html',
    styleUrls: ['./favourite.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [SearchBarComponent]
})
export class FavouriteComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
