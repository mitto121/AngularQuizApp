import { Component, OnInit } from '@angular/core';
import { Iquestion } from '../../models/iquestion';
import { QuizService } from '../../services/quiz.service';
import { QuizMaster } from '../../models/quiz-master';
import { Question } from '../../models/question';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {


  quizes:QuizMaster[];
  questions:Iquestion[]
  selectedQuizId:number;
  
  constructor(private _quizService:QuizService ) { }

  ngOnInit() {
    this._quizService.getQuizes()
    .subscribe(res=>{     
      this.quizes=res.result;
      this.selectedQuizId=this.quizes[0].id;        
    },
      err=>console.error(err) ,
      ()=>this.loadQuestionbyQuiz()      
    ); 
  }

  onChange(id)
  { 
    this.selectedQuizId=id;  
    this.loadQuestionbyQuiz();
  }

  loadQuestionbyQuiz()
  {
   this.questions= this.quizes.find(x=>x.id==this.selectedQuizId).questions;
  }

}
