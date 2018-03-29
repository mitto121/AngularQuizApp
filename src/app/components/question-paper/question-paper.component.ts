import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { Question } from '../../models/question';
import { Iquestion } from '../../models/iquestion';
import { QuizMaster } from '../../models/quiz-master';
import { Observable } from 'rxjs/Observable';
import { Ioption } from '../../models/ioption';
import { CommonUtility } from '../../shared/common-utility';
import { Location } from '@angular/common';
import { PlatformLocation } from '@angular/common';
import { setTimeout } from 'timers';


@Component({
  selector: 'app-question-paper',
  templateUrl: './question-paper.component.html',
  styleUrls: ['./question-paper.component.css']
})
export class QuestionPaperComponent implements OnInit {
  quizId: number;
  participantId: number;
  quiz: QuizMaster;
  showModal: boolean;
  noOfQuestions: number;
  PageIndex = 0;

  constructor(private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private _quizService: QuizService,
    private _platformLocation: PlatformLocation) {
    this.quiz = new QuizMaster();
  }

  ngOnInit() {
    this._platformLocation.onPopState(() => {
      this._location.forward();
    });
    this.getQueryStringParam();

    let hasAttempted = localStorage.getItem('hasQuizSubmitted');
    if (hasAttempted) {
      this._router.navigate(['/startQuiz', this.quizId])
    }

    this._quizService.getQuizById(this.quizId)
      .subscribe(
        (res) => {
          this.quiz = res;
        },
        (error) => this.handleError,
        () => this.loadTest()
      );

  }

  loadTest() {
    let attemptedquestion = localStorage.getItem('attemptedQuestion');

    if (attemptedquestion) {
      this.quiz.questions = JSON.parse(attemptedquestion);
    }

    this.noOfQuestions = this.quiz.questions.length;
  }

  pageNavigation(navType: string) {
    if (navType == 'Previous' && this.PageIndex > 0) {
      this.setCurrentPage(this.PageIndex - 1);
    } else if (navType == 'Next' && this.PageIndex < (this.noOfQuestions - 1)) {
      this.setCurrentPage(this.PageIndex + 1);
    }
  }

  setCurrentPage(index: number) {

    localStorage.setItem('attemptedQuestion', JSON.stringify(this.quiz.questions));
    this.PageIndex = index;
  }
  
  setAttemptStatus(question: Question) {
    question.isAttempt = question.options.filter(x => x.isSelected).length > 0;
  }
  submitTest() {
    if (confirm('Are you sure to submit this Test ?')) {
      this.submitQuiz();
    }

  }

  handleError(error: any) {
    console.log(error);
  }


  submitOnTimeOut() {
    this.submitQuiz();
  }

  private getQueryStringParam() {
    const decryptQId = this._activatedRoute.snapshot.params['id'];
    this.quizId = Number(atob(decryptQId));
    const decryptPId = this._activatedRoute.snapshot.params['participantId'];
    this.participantId = Number(atob(decryptPId));
  }

  private submitQuiz() {    
    CommonUtility.removeLocalStorage('remaingTime', 'attemptedQuestion');

    this._quizService.submitTest(this.quiz, this.participantId)
      .subscribe(res => {
        if (res) {
          this.showModal = true;
          const nav = this._router;
          const id = this.quiz.quizLinkId;
          setTimeout((function () {
            nav.navigate(['/startQuiz', id]);
          }), 800);
        }
      }, error => console.log(error),
        () => localStorage.setItem('hasQuizSubmitted', String(true))
      );
  }

}

