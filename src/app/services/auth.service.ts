import { Injectable } from '@angular/core';
//import {JwtHelperService} from '@auth0/angular-jwt'

@Injectable()
export class AuthService {

  constructor() { }

  public isAuthenticated(): boolean {
    const user =localStorage.getItem("user");
    //  return !this.jwtHelper.isTokenExpired(token);
    if(user ) //&& JSON.parse(user).token
    {
       return true; 
    }
   return false; 
  }

}
