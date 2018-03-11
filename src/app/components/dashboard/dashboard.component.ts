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

  constructor(private _router: Router,
    private _authService: AuthService) { }

  ngOnInit() {
  }

  onLogout() {
    localStorage.clear();
    this._authService.isLoggedIn = false;
    this._router.navigateByUrl('/login')
  }

}
