import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit() {
   
  }
  onLogout()
  {
    localStorage.clear();
    this._router.navigateByUrl('/login')
  }

 
}
