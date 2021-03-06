import { Component, Input, OnInit } from '@angular/core';
import { Iquestion } from '../../models/iquestion';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { QuizResult } from '../../models/quiz-result';

@Component({
  selector: 'quiz-answer-sheet',
  templateUrl: './quiz-answer-sheet.component.html',
  styleUrls: ['./quiz-answer-sheet.component.css']
})
export class QuizAnswerSheetComponent implements OnInit {

  attemptId: number;
  quizResult: QuizResult;

  constructor(private _activedRouter: ActivatedRoute,
              private _quizService: QuizService) {
                this.quizResult = new QuizResult();
               }

  ngOnInit() {
    this.attemptId = this._activedRouter.snapshot.params['id'];

    this._quizService.getQuizResult(this.attemptId)
    .subscribe(
      res => this.quizResult = res,
      err => console.log(err)
    );
  }
}
