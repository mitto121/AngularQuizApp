import { Component, OnInit } from '@angular/core';
import { QuizMaster } from '../../models/quiz-master';
import { QuizService } from '../../services/quiz.service';
import { Iquestion } from '../../models/iquestion';

@Component({
  selector: 'app-quiz-master',
  templateUrl: './quiz-master.component.html',
  styleUrls: ['./quiz-master.component.css']
})
export class QuizMasterComponent implements OnInit {
  quizes:QuizMaster[]; 
  statusMessage:string='loading...';

  constructor(private _quiz:QuizService) { }

  ngOnInit() {

    this._quiz.getQuizes()
    .subscribe(
      (res)=>this.quizes=res,
      (error) =>  this.statusMessage = error);   
  }

}
