import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { Question } from '../../models/question';
import { Iquestion } from '../../models/iquestion';
import { QuizMaster } from '../../models/quiz-master';
import { Observable } from 'rxjs/Observable';
import { Ioption } from '../../models/ioption';
import { CommonUtility } from '../../shared/common-utility';
import { Location } from '@angular/common'
import { PlatformLocation } from '@angular/common'
import { setTimeout } from 'timers';


@Component({
  selector: 'app-question-paper',
  templateUrl: './question-paper.component.html',
  styleUrls: ['./question-paper.component.css']
})
export class QuestionPaperComponent implements OnInit {
  quizId: number;
  participantId:number;
  quiz: QuizMaster;
  questions: Iquestion[];
  showModal: boolean;
  noOfQuestions: number;
  PageIndex = 0;



  constructor(private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private _quizService: QuizService,
    private _platformLocation:PlatformLocation) {
    this.quiz = new QuizMaster();
  }

  ngOnInit() {
    this._platformLocation.onPopState(() => {
      this._location.forward();
    });

    let decryptQId = this._activatedRoute.snapshot.params['id'];
    this.quizId=Number(atob(decryptQId));
    let decryptPId=this._activatedRoute.snapshot.params['participantId'];
    this.participantId = Number(atob(decryptPId));
    this._quizService.getQuizById(this.quizId)
      .subscribe(
        (res) => {
          this.quiz = res;
          this.questions = this.quiz.questions;
          this.noOfQuestions = this.questions.length;
        },
        (error) => this.handleError);
        
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
    if (confirm('Are you sure to submit this Test ?')) {
      this.submitQuiz();
    }

  }

 
  handleError(error: any) {
    console.log(error);
  }
  selectedAnswer(question: Iquestion) {
    question.isAttempt = true;
  }

  submitOnTimeOut()
  {
    this.submitQuiz();
  }
  private submitQuiz() {
    this._quizService.submitTest(this.quiz, this.participantId)
      .subscribe(res => {
        if (res) {
          this.showModal = true;
          var nav = this._router;
          let id = this.quiz.quizLinkId;
          setTimeout((function () {
            nav.navigate(['/startQuiz', id]);
          }), 800);
        }
      }, error => console.log(error));
  }

}

