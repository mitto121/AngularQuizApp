import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonUtility } from '../../shared/common-utility';
import { QuizMaster } from '../../models/quiz-master';
import { QuizService } from '../../services/quiz.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  quizMasterForm: FormGroup;
  statusMessage: string;

  @Input()
  quizId: number;
  quiz: QuizMaster;
  constructor(private _location: Location,
    private _activatedRoute: ActivatedRoute,
    private _quizService: QuizService) {
    this.quiz = new QuizMaster();
  }

  ngOnInit() {
    this.createValidationControls();
    this.quizId = this._activatedRoute.snapshot.params['id'];
    if (this.quizId) {
      this._quizService.getQuizById(this.quizId)
        .subscribe(
          res => this.quiz = res,
          err => console.error(err),
          () => this.createValidationControls()
        )
    }
  }

  private createValidationControls(): void {
    this.quizMasterForm = new FormGroup({
      Name: new FormControl(this.quiz.name, Validators.required),
      Description: new FormControl(this.quiz.description, Validators.required),
      Duration: new FormControl(this.quiz.duration, [Validators.required, Validators.min(20), Validators.max(1000),]),
      Passing_Percentage: new FormControl(this.quiz.passingPercentage, [Validators.required, Validators.max(100), Validators.min(30)])
    });
  }

  onSubmit() {
    if (this.quizMasterForm.valid) {
      let quiz = new QuizMaster()
      quiz.name = this.quizMasterForm.get('Name').value;
      quiz.description = this.quizMasterForm.get('Description').value;
      quiz.duration = this.quizMasterForm.get('Duration').value;
      quiz.passingPercentage = this.quizMasterForm.get('Passing_Percentage').value;
      quiz.isActive = true;

      if (this.quizId) {
       quiz.id=this.quizId; 
       this.updateQuiz(quiz)
      }
      else {
        this.addQuiz(quiz);
      }
    }
    else {
      CommonUtility.validateAllFormFields(this.quizMasterForm);
    }
  }

  onCancel()
  {
    this.quizMasterForm.reset();
    this._location.back();
  }


  private addQuiz(quiz: QuizMaster) {
    this._quizService.createQuiz(quiz).subscribe(res => {
      if (res.isSucceeded) {
        this._location.back();
      }
      else {
        this.statusMessage = "Failed, Please try again !!";
      }
    }, error => console.error(error));
  }
  private updateQuiz(quiz: QuizMaster) {
    this._quizService.updateQuiz(quiz).subscribe(res => {
      if (res.isSucceeded) {
        this._location.back();
      }
      else {
        this.statusMessage = "Failed, Please try again !!";
      }
    }, error => console.error(error));
  }
}


