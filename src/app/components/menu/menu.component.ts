import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input()
  title: string;

  isLoggedIn$: boolean; 
  

  constructor(private _authService:AuthService) {
    this.isLoggedIn$=this._authService.isAuthenticated();
   }

  ngOnInit() {
  }

}
