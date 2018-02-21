import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  welcomeMessage = 'Welcome to Quiz Master';
  isAuthenticateUser = false;

  constructor() {
    const user = localStorage.getItem('user');
    this.isAuthenticateUser = user ? true : false;
  }

}
