import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { QuizMaster } from '../../models/quiz-master';

@Component({
  selector: 'quiz-board',
  templateUrl: './quiz-board.component.html',
  styleUrls: ['./quiz-board.component.css']
})
export class QuizBoardComponent implements OnInit {

  quizes: QuizMaster[];

  constructor(private _quiz: QuizService) { }

  ngOnInit() {
    this._quiz.getQuizes()
      .subscribe(
      (res) => {
        if (res) {
          this.quizes = res.result.filter(x => x.isActive);
        }
      },
      (error) => console.log(error));
  }



}
