import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import {Location} from '@angular/common';
import { Ioption } from '../../models/ioption';
import { Iquestion } from '../../models/iquestion';
import { Question } from '../../models/question';



@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.css']
})
export class QuestionViewComponent implements OnInit {

  @Input()
  questionId: number;
  @Input()
  viewMode: string;
  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter();
  question: Iquestion;
  isEditable: boolean;
  constructor(private _activedRoute: ActivatedRoute,
              private _questionService: QuestionService,
              private _location: Location) { }

  ngOnInit() {
    this.isEditable = this.viewMode == 'EDIT';
    this._questionService.getQuestionById(this.questionId)
    .subscribe(
          res => this.question = res,
          error => console.error('server error')
    );
  }
  selectAnswer(option: Ioption) {
    this.question.options.forEach((x) => { x.isAnswer = (x.code == option.code); });
  }

  onSubmit() {
    this._questionService.UpdateQuestion(this.question)
    .subscribe(
      res => {
        if (res) {
         this.onSuccess.emit(this.question);
        } else {
          alert('Failed !! something is wrong ,please try agin');
        }
      },
      error => console.error(error)
    );
  }
}
