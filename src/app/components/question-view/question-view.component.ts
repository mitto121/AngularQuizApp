import { Component, OnInit } from '@angular/core';
import { Question } from '../../models/question';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../services/question-service.service';
import {Location} from '@angular/common'
import { Ioption } from '../../models/ioption';

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.css']
})
export class QuestionViewComponent implements OnInit {

  questionId:number;
  viewMode:string;
  question:Question;
  isEditable:boolean;
  constructor(private _activedRoute:ActivatedRoute,
              private _questionService:QuestionService,
              private _location:Location) { }

  ngOnInit() {
    this.questionId=Number(this._activedRoute.snapshot.params['id']);
    this.viewMode=this._activedRoute.snapshot.params['viewMode'];
    this.isEditable=this.viewMode=='EDIT';
    this._questionService.getQuestionById(this.questionId)
    .subscribe(
          res=>this.question=res,
          error=>console.error('server error'),
          ()=>console.log(this.question)          
    );
  }
  selectAnswer(option: Ioption) {      
    this.question.options.forEach((x) => { x.isAnswer = (x.code == option.code); }); 
  }
  onCancel()
  {
    this._location.back();
  }
}
