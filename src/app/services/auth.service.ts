import { Injectable } from '@angular/core';
import { UserAccount } from '../models/user-account';

@Injectable()
export class AuthService {
  isLoggedIn: boolean; 
  user:UserAccount;
  
  constructor() { }

  public isAuthenticated(): boolean {
    this.user = JSON.parse(localStorage.getItem('user'));

    if (this.user && this.user.authToken) {
      this.isLoggedIn = true;    
    }
   return this.isLoggedIn;
  }

}
