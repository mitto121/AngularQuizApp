import { Injectable } from '@angular/core';
//import {JwtHelperService} from '@auth0/angular-jwt'

@Injectable()
export class AuthService {

  constructor() { }

  public isAuthenticated(): boolean {
    const user =localStorage.getItem("user");
    if(user && JSON.parse(user).authToken) 
    {
       return true; 
    }
   return false; 
  }

}
