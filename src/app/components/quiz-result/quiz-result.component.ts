import { Component, Input, OnInit } from '@angular/core';
import { Iquestion } from '../../models/iquestion';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { QuizResult } from '../../models/quiz-result';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit {

  quizId: Number;
  participantId:number;
  quizResult:QuizResult; 

  constructor(private _activedRouter: ActivatedRoute,
              private _quizService:QuizService) {
                this.quizResult=new QuizResult();               
               }

  ngOnInit() {
    this.quizId = this._activedRouter.snapshot.params["id"];
    this.participantId = this._activedRouter.snapshot.params["participantId"];
    
    this._quizService.getQuizResult(this.quizId,this.participantId)
    .subscribe(
      res=>this.quizResult=res,
      err=>console.log(err)  
    );
  }





}
