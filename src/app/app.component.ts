import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  welcomeMessage = 'Welcome to Quiz Master';
  isAuthenticateUser:boolean=false;
  
  constructor(){
    let user= localStorage.getItem('user');
    this.isAuthenticateUser=user?true:false;  
  }
 
}
