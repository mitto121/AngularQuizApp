import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { Question } from '../../models/question';
import { Iquestion } from '../../models/iquestion';
import { QuizMaster } from '../../models/quiz-master';
import { Observable } from 'rxjs/Observable';
import { Ioption } from '../../models/ioption';
import { CommonUtility } from '../../shared/common-utility';


@Component({
  selector: 'app-question-paper',
  templateUrl: './question-paper.component.html',
  styleUrls: ['./question-paper.component.css']
})
export class QuestionPaperComponent implements OnInit {
  quizId: number;
  quiz: QuizMaster;
  questions: Iquestion[];  
  showModal: boolean;
  noOfQuestions: number;
  PageIndex = 0;



  constructor(private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _quizService: QuizService) {
    this.quiz = new QuizMaster();
  }

  ngOnInit() {

    this.quizId = this._activatedRoute.snapshot.params['id'];
    this._quizService.getQuizById(this.quizId)
      .subscribe(
      (res) => {
        this.quiz = res;
        this.questions = this.quiz.questions;
        this.noOfQuestions = this.questions.length;
      },
      (error) => this.handleError);
   
  }


  showCurrentPage(currentPageNumber: number): boolean {
    return this.PageIndex == currentPageNumber;
  }
  pageNavigation(navType: string) {
    if (navType == 'Previous' && this.PageIndex > 0) {
      this.PageIndex = this.PageIndex - 1;
    } else if (navType == 'Next' && this.PageIndex < (this.noOfQuestions - 1)) {
      this.PageIndex = this.PageIndex + 1;
    }
  }


  setCurrentPage(index: number) {
    this.PageIndex = index;
  }

  applyNavStyle(isAttempt: boolean, currentPageIndex: number): string {
    let navClass: string;
    navClass = isAttempt ? 'answered ' : 'not-answered ';
    if (this.PageIndex == currentPageIndex) {
      navClass += 'highlight';
    }
    return navClass;
  }

  submitTest() {
    this.quiz.hasAttempt = true;
    
    this._quizService.submitTest(this.quiz)
                      .subscribe(res=>this.showModal=res,
                       error=>console.log(error) 
                      );
 
  }

  handleError(error: any) {
    console.log(error);
  }


  closeModal(isShow) {
    this.showModal=isShow;
  }

  selectedAnswer(question: Iquestion) {
    question.isAttempt = true;
  }

}

