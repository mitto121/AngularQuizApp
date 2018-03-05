import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input()
  title: string;   

  constructor(private _authService:AuthService,
               private _router:Router) {  
   }

  ngOnInit() {
  }
  logOut()
  {
    localStorage.clear();
    this._authService.isLoggedIn=false;
    this._router.navigateByUrl('/login')
  }

}
