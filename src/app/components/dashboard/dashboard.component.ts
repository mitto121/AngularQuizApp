import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { QuizMaster } from '../../models/quiz-master';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  statusMessage = 'loading...';
  themeColor='#ffffff';
  constructor(private _router: Router,
    private _authService: AuthService) { }

  ngOnInit() {
    if(localStorage.getItem('themeColor'))
    {
      this.themeColor=localStorage.getItem('themeColor');
      document.body.style.backgroundColor =this.themeColor;
    }
  }

  onLogout() {
    localStorage.clear();
    this._authService.isLoggedIn = false;
    this._router.navigateByUrl('/login');
  }

  onColorChange(evt)
  {       
    this.themeColor==evt.target.value;
    localStorage.setItem('themeColor', this.themeColor);    
    document.body.style.backgroundColor = this.themeColor;
  }
}
