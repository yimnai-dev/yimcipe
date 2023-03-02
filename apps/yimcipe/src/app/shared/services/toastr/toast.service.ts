import { Injectable, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastrService: ToastrService){}

  config = {
    timeOut: 5000,
    autoDismiss: true
  }


  showSuccess(message: string){
    return this.toastrService.success(message, 'Success', this.config);
  }

  showError(message: string){
    return this.toastrService.error(message, 'Error', this.config)
  }

  showWarning(message: string){
    return this.toastrService.warning(message, 'Warning', this.config)
  }

  showInfo(message: string){
    return this.toastrService.info(message, 'Info', this.config)
  }
}
