import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl,Validators,AbstractControl  } from '@angular/forms';
import {UserAccount} from '../../models/user-account';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm:FormGroup;

  constructor() {
  }

  ngOnInit(){
    this.createValidationControls();
  }

  private createValidationControls():void { 

    this.signUpForm=new FormGroup({
      first_Name:new FormControl(),
      last_Name:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      user_Name:new FormControl('',Validators.required),
      password:new FormControl('',[Validators.required,Validators.minLength(6)]),
      confirm_Password:new FormControl('',[Validators.required,this.passwordConfirming])    
    });
  }

  createNewUser(signUpForm:FormControl)
  {
    if(this.signUpForm.valid)
    {
      console.log(signUpForm);
    }
    else
    {
      this.validateAllFormFields(this.signUpForm)
    }

  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  passwordConfirming(c: FormControl): { isNotEqual: boolean } {
    if (c.parent) {
      if (c.parent.value['password'] !== c.value) {
        c.setErrors({ MatchPassword: true })
      } else {
        return null
      }
  }

  return null;
}
}


