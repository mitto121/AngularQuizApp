import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonUtility } from '../../shared/common-utility';
import { QuizMaster } from '../../models/quiz-master';
import { QuizService } from '../../services/quiz.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-quiz-master',
  templateUrl: './quiz-master.component.html',
  styleUrls: ['./quiz-master.component.css']
})
export class QuizMasterComponent implements OnInit {

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
      Name: new FormControl(this.quiz.name, [Validators.required,Validators.maxLength(300)]),
      Description: new FormControl(this.quiz.description, [Validators.required,Validators.maxLength(500)]),
      Duration: new FormControl(this.quiz.duration, [Validators.required, Validators.min(20), Validators.max(300),]),
      Passing_Percentage: new FormControl(this.quiz.passingPercentage, [Validators.required, Validators.max(100), Validators.min(0)])
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


