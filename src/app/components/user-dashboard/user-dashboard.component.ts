import { Component, OnInit } from '@angular/core';
import { QuizMaster } from '../../models/quiz-master';
import { QuizService } from '../../services/quiz.service';
import { Iquestion } from '../../models/iquestion';
import { Router } from '@angular/router';
import { CommonUtility } from '../../shared/common-utility';

@Component({
  selector: 'app-quiz-master',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  quizes: QuizMaster[];
  statusMessage = 'loading...';

  constructor(private _quiz: QuizService,
              private _router:Router) { }

  ngOnInit() {

    this._quiz.getQuizes()
    .subscribe(
      (res) => this.quizes = res.result,
      (error) =>  this.statusMessage = error);
  }

  

}
