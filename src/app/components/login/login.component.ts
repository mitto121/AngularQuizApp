import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccount } from '../../models/user-account';
import { FormGroup, FormControl, Validators , NgForm } from '@angular/forms';
import { AuthenticateUserService } from '../../services/authenticate-user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  validateOnSubmit: boolean;
  loginStatusMsg:string;

  constructor(private _router: Router,
              private _authenticateUserService:AuthenticateUserService ) { 
                this.loginStatusMsg="";
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
    let isSuccess:boolean;
    if (this.loginForm.valid) {
     let userName=this.loginForm.controls['userName'].value;
     let password=this.loginForm.controls['password'].value;

     this._authenticateUserService.login(userName,password)
                   .then((res)=>  this.authenticateUser(res[0]));      
     
    } else {
       this.validateAllFormFields(this.loginForm);
    }
  }

  authenticateUser(userAccount:UserAccount)
  {
    debugger;
    if(userAccount && userAccount.token)
    {
        this.loginStatusMsg="Login failed !!";      
        localStorage.setItem("user", JSON.stringify(userAccount));
        if(userAccount.role && userAccount.role.toLowerCase()=='admin')
        {
          this._router.navigateByUrl('/quizes');
        }
        else{
          this._router.navigateByUrl('/dashboard');
        }          
    }
    else
    {
        this.loginStatusMsg="Login failed !!";
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
