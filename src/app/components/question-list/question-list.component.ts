import { Component, OnInit, Input } from '@angular/core';
import { Iquestion } from '../../models/iquestion';
import { QuizService } from '../../services/quiz.service';
import { QuizMaster } from '../../models/quiz-master';
import { Question } from '../../models/question';
import { QuestionService } from '../../services/question-service.service';
import { PagingModel } from '../../models/paging-model';
import { CommonUtility } from '../../shared/common-utility';

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

  questionId:number;
  actionMode:string;
  showModal:boolean;

  pager: PagingModel<Iquestion[]>;

  constructor(private _quizService: QuizService,
    private _questionService: QuestionService) {
    this.pager = new PagingModel<Iquestion[]>();
  }

  ngOnInit() {
    this._quizService.getQuizes()
      .subscribe(res => {
        this.quizes = res.result;
        this.selectedQuizId = this.quizes[0].id;
      },
        err => console.error(err),
        () => this.loadQuestionbyQuiz()
      );
  }

  onChange(id: number) {
    localStorage.removeItem('quizId');
    localStorage.setItem('quizId', String(id));
    this.selectedQuizId = id;
    this.loadQuestionbyQuiz();
  }

  loadQuestionbyQuiz() {
    if (localStorage.getItem('quizId')) {
      this.selectedQuizId = Number(localStorage.getItem('quizId'));
    }

    this.questions = this.quizes.find(x => x.id == this.selectedQuizId).questions;
    //this.setPaging();
  }

  setPaging(currentIndex: number = 1) {
    this.pager = CommonUtility.getPaging<Iquestion[]>(this.questions.length, currentIndex, 3);
    let pageResult:Iquestion[]=[];
    Object.assign(pageResult,this.questions);    
    this.pager.result=pageResult.slice(this.pager.startIndex,this.pager.endIndex);    
  }
  removeQuestions(id: number) {
    if (confirm("Are you sure to remove this question ?")) {
      let isSucceeded: boolean;
      this._questionService.removeQuestion(id)
        .subscribe(
          res => this.questionListSuccessViewRender(res, id, false, 'Deletion'),
          error => console.error(error)
        );
    }
  }
  activateQuestionsInQuiz(questionId: number) {
    let isSucceeded: boolean;
    this._questionService.activateQuestion(questionId)
      .subscribe(
        res => this.questionListSuccessViewRender(res, questionId, true, 'Add to Quiz has'),
        error => console.error(error)
      );
  }
  questionListSuccessViewRender(isSuccess: boolean, questionId: number, isActive: boolean, msg: string) {
    if (isSuccess) {
      this.questions.find(x => x.id == questionId).isActive = isActive;
    }
    else {
      let statusMessage = msg + " failed !!";
      alert(statusMessage);
    }
  }
  openQuestionModal(id:number,mode:string)
  {
     this.questionId=id;
     this.actionMode=mode;
     this.showModal=true;
  }
  closeModal(isShow)
  {
      this.showModal=isShow;
  }
  

}
