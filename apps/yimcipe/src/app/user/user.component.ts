import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AuthService } from "../shared/services/auth/auth.service";

@Component({
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AuthService
  ]
})

export class UserComponent {
  constructor(private authService: AuthService){}
 }
