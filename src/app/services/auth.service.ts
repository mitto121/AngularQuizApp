import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  isLoggedIn:boolean;
  name:string;
  constructor() { }

  public isAuthenticated(): boolean {
    const user =JSON.parse(localStorage.getItem("user"));
    
    if(user && user.authToken) 
    {
      this.isLoggedIn=true;
      this.name=user.name;    
    }
   return this.isLoggedIn; 
  }

}
