import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'yimcipe-comments-section',
    templateUrl: './comments-section.component.html',
    styleUrls: ['./comments-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf]
})
export class CommentsSectionComponent {
  viewComments = false
  testComments = [1, 2, 3]
  @Input() commentInfo!: {commenter: string, comment: string}
  $comments = ['The best recipe recommendation ever', 'Was wondering where I would get something like this', 'This is the best thing to ever happen to me']

  commentSectionController(){
    this.viewComments = !this.viewComments
  }
}
