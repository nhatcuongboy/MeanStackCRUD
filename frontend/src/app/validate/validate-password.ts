import { AbstractControl } from '@angular/forms';

export class ValidatePassword {
  static MatchPassword(abstractControl: AbstractControl) {
    let password = abstractControl.get('password').value;
    let repeatpassword = abstractControl.get('repeatpassword').value;
     if (password != repeatpassword) {
         abstractControl.get('repeatpassword').setErrors({
           MatchPassword: true
         })
    } else {
      return null
    }
  }
  
}
