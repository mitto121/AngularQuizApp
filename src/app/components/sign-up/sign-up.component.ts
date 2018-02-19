import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {UserAccount} from '../../models/user-account';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  newUser:UserAccount;

  

  constructor() {
   this.newUser=new UserAccount();
   }

  ngOnInit() {
  }

}
