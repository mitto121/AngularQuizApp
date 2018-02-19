import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccount } from '../../models/user-account';
import { FormGroup,FormControl,Validators  } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authUser: UserAccount;
  loginForm: FormGroup;


  constructor(private _router: Router) {
    this.authUser = new UserAccount();
  }

  ngOnInit() {

  }
  
  private createForm() {
    this.loginForm = new FormGroup({     
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  logInUser() {
    if (UserAccount)
    {
      localStorage.setItem('user',JSON.stringify(this.authUser));
      this._router.navigateByUrl("/dashboard");
    }
  }

}
