import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuizMaster } from '../../models/quiz-master';
import { Iquestion } from '../../models/iquestion';
import { QuizService } from '../../services/quiz.service';
import { QuestionService } from '../../services/question.service';


@Component({
  selector: 'app-questions-list-dialog',
  templateUrl: './questions-list-dialog.component.html',
  styleUrls: ['./questions-list-dialog.component.css']
})
export class QuestionsListDialogComponent implements OnInit {
  @Input()
  quizId: number;
  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter();
  quizes: QuizMaster[];
  questions: Iquestion[]
  selectedQuizId?: number = null;
  filterValue: string;
  isAllChecked: boolean;
  displayMessage: string;
  constructor(private _quizService: QuizService,
    private _questionService: QuestionService) { }

  ngOnInit() {

    this._quizService.getQuizes()
      .subscribe(res => {
        if (res && res.result) {
          this.quizes = res.result.filter(x => x.id != this.quizId && x.isActive);
        }
      },
        err => console.error(err),
        () => this.loadQuestions()
      );
  }

  loadQuestions() {
    this.isAllChecked = false;
    if (!this.selectedQuizId) {
      this._questionService.getQuestions()
        .subscribe(
          res => this.questions = res.filter(x => x.quizId != this.quizId),
          err => console.error(err)
        );
    }
    else {
      this.questions = this.quizes.find(x => x.id == this.selectedQuizId).questions;
    }
  }
  selectAll() {
    this.questions.forEach(x => x.isSelected = this.isAllChecked);
    this.displayMessage = "";
  }

  selectQuestion() {
    let totalQuestion = this.questions.length;
    let checkedCount = this.questions.filter(x => x.isSelected).length;
    this.isAllChecked = (totalQuestion === checkedCount);
    this.displayMessage = "";
  }
  addToQuiz() {
    let checkedCount = this.questions.filter(x => x.isSelected).length;
    if (checkedCount) {
      let questionArray: number[] = [];
      this.questions.filter(x => x.isSelected).forEach(
        x => questionArray.push(x.id)
      );
   
      this._questionService.addQuestionsToQuiz(this.quizId,questionArray)
        .subscribe(
          res => {
            if (res) {
              this.onSuccess.emit();
            }
          },
          error => console.error(error)
        );

    }
    else {
      this.displayMessage = "please select atleast one checkbox";
    }

  }
}
