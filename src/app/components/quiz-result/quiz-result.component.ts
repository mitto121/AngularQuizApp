import { Component, Input, OnInit } from '@angular/core';
import { Iquestion } from '../../models/iquestion';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { QuizMaster } from '../../models/quiz-master';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit {


  @Input()
  quizId: Number;
  quizResult:QuizMaster;
  

  constructor(private _activedRouter: ActivatedRoute,
              private _quizService:QuizService) {
                this.quizResult=new QuizMaster();
               }

  ngOnInit() {
    this.quizId = this._activedRouter.snapshot.params["id"];

    this._quizService.getQuizResult(this.quizId)
    .subscribe(
      res=>this.quizResult=res,
      err=>console.log(err)
    );
  }





}
