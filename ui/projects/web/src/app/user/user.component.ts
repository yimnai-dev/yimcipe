import { ToastService } from './../shared/services/toastr/toast.service';
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AuthService } from "../shared/services/auth/auth.service";
import { RouterOutlet } from "@angular/router";

@Component({
    template: `<router-outlet></router-outlet>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterOutlet],
})

export class UserComponent {
  constructor(private authService: AuthService, private toastService: ToastService){}
 }
