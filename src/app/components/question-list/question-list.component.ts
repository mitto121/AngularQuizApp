import { Component, OnInit } from '@angular/core';
import { Iquestion } from '../../models/iquestion';
import { QuizService } from '../../services/quiz.service';
import { QuizMaster } from '../../models/quiz-master';
import { Question } from '../../models/question';
import { QuestionService } from '../../services/question-service.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  quizes: QuizMaster[];
  questions: Iquestion[]
  selectedQuizId: number;
  filterValue: string; 
  startIndex:number;

  constructor(private _quizService: QuizService,
              private _questionService:QuestionService) { }

  ngOnInit() {
    this._quizService.getQuizes()
      .subscribe(res => {
        this.quizes = res.result;
        this.selectedQuizId=this.quizes[0].id;        
      },
        err => console.error(err),
        () => this.loadQuestionbyQuiz()
      );
  }

  onChange(id:number) {
    localStorage.removeItem('quizId');
    localStorage.setItem('quizId',String(id));
    this.selectedQuizId = id;
    this.loadQuestionbyQuiz();
  }

  loadQuestionbyQuiz() {
    debugger;
    if(localStorage.getItem('quizId'))
    {
      this.selectedQuizId=Number(localStorage.getItem('quizId'));
    }
    
    this.questions = this.quizes.find(x => x.id == this.selectedQuizId).questions;
  }
  removeQuestions(id:number)
  {
    if (confirm("Are you sure to remove this question ?")) {
      let isSucceeded: boolean;
      this._questionService.removeQuestion(id)
        .subscribe(
          res => this.questionListSuccessViewRender(res, id,false,'Deletion'),
          error => console.error(error)
        );
    }
  }
  activateQuestionsInQuiz(questionId:number)
  {   
      let isSucceeded: boolean;
      this._questionService.activateQuestion(questionId)
        .subscribe(
          res => this.questionListSuccessViewRender(res, questionId,true,'Add to Quiz has'),
          error => console.error(error)
        );    
  }
  questionListSuccessViewRender(isSuccess: boolean, questionId: number,isActive:boolean,msg:string) {
    if (isSuccess) {
      this.questions.find(x => x.id == questionId).isActive = isActive;
    }
    else {
      let statusMessage=msg+" failed !!";
      alert(statusMessage);
    }
  }
 
 

}
