import { Component, OnInit } from '@angular/core';
import { Iquestion } from '../../models/iquestion';
import { QuizService } from '../../services/quiz.service';
import { QuizMaster } from '../../models/quiz-master';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {


  quizes:QuizMaster;
  constructor(private _quizService:QuizService ) { }

  ngOnInit() {
    var a=this._quizService.getQuizes()
    .subscribe(res=>this.quizes=res[0],
      err=>console.error(err));    
    
  }

}
