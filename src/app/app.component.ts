import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { LoadingIndicatorService } from './services/loading-indicator.service';
import 'hammerjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
 
})
export class AppComponent {
  title = 'Welcome to Quiz Master';

  constructor(private _loadingIndicatorService:LoadingIndicatorService) {  
  }


}
