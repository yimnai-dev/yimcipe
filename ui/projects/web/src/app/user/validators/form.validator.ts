import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export class UUIDValidator {

  static validToken(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(!control.value){
        return null
      }
      const str = control.value.toString();
      const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
      if(regexExp.test(str)){
        return null
      }
      return {token: true}
    }
  }
}
