import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommonUtility } from '../../shared/common-utility';
import { QuizService } from '../../services/quiz.service';
import { QuizMaster } from '../../models/quiz-master';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  quizId: number;
  quiz: QuizMaster;
  hasAttempt: boolean;
  displayMessage: string;

  constructor(private _activatedRoute: ActivatedRoute,
    private _quizService: QuizService,
    private _location: Location) {
      this.quiz=new QuizMaster();
     }

  ngOnInit() {
    this.quizId = this._activatedRoute.snapshot.params['id'];
    if (this.quizId && this.quizId > 0) {
      this._quizService.getQuizById(this.quizId)
        .subscribe(res => this.quiz = res)

        this.hasQuizAttemptEarlier(this.quizId);
    }
  }

  hasQuizAttemptEarlier(quizId) {

    this._quizService.CheckQuizHasAttemptedOrNot(quizId)
      .subscribe(res => this.hasAttempt = res,
      error => console.error(error));
  }

  closeModal() {
    this._location.back();
  }


}
