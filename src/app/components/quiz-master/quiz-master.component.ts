import { Component, OnInit } from '@angular/core';
import { QuizMaster } from '../../models/quiz-master';
import { QuizService } from '../../services/quiz.service';
import { Iquestion } from '../../models/iquestion';
import { Router } from '@angular/router';
import { CommonUtility } from '../../shared/common-utility';

@Component({
  selector: 'app-quiz-master',
  templateUrl: './quiz-master.component.html',
  styleUrls: ['./quiz-master.component.css']
})
export class QuizMasterComponent implements OnInit {
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
