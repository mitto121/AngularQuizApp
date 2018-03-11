import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonUtility } from '../../shared/common-utility';
import { QuizService } from '../../services/quiz.service';
import { QuizMaster } from '../../models/quiz-master';

@Component({
  selector: 'start-quiz-dialog',
  templateUrl: './start-quiz-dialog.component.html',
  styleUrls: ['./start-quiz-dialog.component.css']
})
export class StartQuizDialogComponent implements OnInit {
  @Input()
  quizId: number;
  @Input()
  participantId: number;
  hasAttempt: boolean;
  quiz: QuizMaster;

  constructor(private _activatedRoute: ActivatedRoute,
    private _quizService: QuizService,
    private _location: Location,
    private _router:Router) {
    this.quiz = new QuizMaster();
  }

  ngOnInit() {
    if (this.quizId) {
      this._quizService.getQuizById(this.quizId)
        .subscribe(res => this.quiz = res)
      this.hasQuizAttemptEarlier();
    }
  }

  hasQuizAttemptEarlier() {

    this._quizService.CheckQuizHasAttemptedOrNot(this.quizId, this.participantId)
      .subscribe(res => this.hasAttempt = res,
      error => console.error(error));
  }

  beginQuiz()
  {
    this._router.navigate(['/quiz',this.quiz.quizLinkId,btoa(String(this.participantId))])
  }


}
