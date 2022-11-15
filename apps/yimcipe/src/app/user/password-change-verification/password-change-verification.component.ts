/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'yimcipe-password-change-verification',
  templateUrl: './password-change-verification.component.html',
  styleUrls: ['./password-change-verification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordChangeVerificationComponent implements OnInit {
  @Input() email = 'neruszaumuy@gmail.com'
  constructor() { }

  ngOnInit(): void {}
}
