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
    return this.toastrService.success(message, 'Toastr fun', this.config);
  }

  showError(message: string){
    return this.toastrService.error(message, 'Major Error', this.config)
  }

  showWarning(message: string){
    return this.toastrService.warning(message, 'Major Error', this.config)
  }

  showInfo(message: string){
    return this.toastrService.info(message, 'Toastr fun', this.config)
  }
}
