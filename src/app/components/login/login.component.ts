import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccount } from '../../models/user-account';
import { FormGroup, FormControl, Validators , NgForm } from '@angular/forms';
import { AuthenticateUserService } from '../../services/authenticate-user.service';
import { ApiResponse } from '../../models/api-response';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  validateOnSubmit: boolean;
  loginStatusMsg: string;

  constructor(private _router: Router,
              private _authenticateUserService: AuthenticateUserService ) {
                this.loginStatusMsg = '';
               }

  ngOnInit() {
     this.createForm();
  }

  private createForm() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  userLogIn() {
    let isSuccess: boolean;
    if (this.loginForm.valid) {
     const userName = this.loginForm.controls['userName'].value;
     const password = this.loginForm.controls['password'].value;

     this._authenticateUserService.login(userName, password)                    
                   .subscribe((res) =>  this.authenticateUser(res));

    } else {
       this.validateAllFormFields(this.loginForm);
    }
  }

  authenticateUser(response: ApiResponse<UserAccount>) {  
    if (response && response.isSucceeded) {
        localStorage.clear();
        localStorage.setItem('user', JSON.stringify(response.result));
        if (response.result) {
          this._router.navigateByUrl('home');
        }
    } else {
        this.loginStatusMsg = response.displayMessage;
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
}
