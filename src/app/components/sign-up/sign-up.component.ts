import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserAccount } from '../../models/user-account';
import { UserAccountService } from '../../services/user-account.service';
import { Router } from '@angular/router';
import { CommonUtility } from '../../shared/common-utility';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  statusMessage:string;
  showModal:boolean;
  isSucceed:boolean;
  constructor(private _userAccountService: UserAccountService,
              private _router:Router) {
  }

  ngOnInit() {
    this.createValidationControls();
  }

  private createValidationControls(): void {

    this.signUpForm = new FormGroup({
      first_Name: new FormControl(),
      last_Name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      user_Name: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirm_Password: new FormControl('', [Validators.required, this.passwordConfirming])
    });
  }

  createNewUser(signUpForm: FormControl) {
    if (this.signUpForm.valid) {
      let newUser = {
        FirstName: this.signUpForm.get('first_Name').value,
        LastName: this.signUpForm.get('last_Name').value,
        Email: this.signUpForm.get('email').value,
        UserName: this.signUpForm.get('user_Name').value,
        Password: this.signUpForm.get('password').value
      };
      
      this._userAccountService.createUser(newUser)
        .subscribe( res => {
          this.statusMessage=res.displayMessage;
          this.isSucceed=res.result;
          this.showModal=true;          
        });

    }
    else {
      CommonUtility.validateAllFormFields(this.signUpForm);
    }

  }

 
  closeModal()
  {
    this.showModal=false;  
    if(this.isSucceed)
    {  
    this.signUpForm.reset();
    this.statusMessage='';
    }
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