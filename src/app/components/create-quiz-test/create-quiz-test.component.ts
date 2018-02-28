import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonUtility } from '../../shared/common-utility';

@Component({
  selector: 'app-create-quiz-test',
  templateUrl: './create-quiz-test.component.html',
  styleUrls: ['./create-quiz-test.component.css']
})
export class CreateQuizTestComponent implements OnInit {

  createExamForm:FormGroup;

  @Input()
  totalQuestions:number;

  @Output() onsubmit:EventEmitter<any>=new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.createValidationControls();
  }

  private createValidationControls(): void {

    this.createExamForm = new FormGroup({
      Code: new FormControl('', Validators.required),
      Available_From: new FormControl('', Validators.required),    
      Duration: new FormControl('', [Validators.required,Validators.min(20)]),     
      Passing_Percentage: new FormControl('', [Validators.required,Validators.max(100),Validators.min(1)]),     
    });
  }

  createExam()
  {
    if(this.createExamForm.valid)
    {
      this.onsubmit.emit(false);
    }
    else{
      this.onsubmit.emit(true);
      CommonUtility.validateAllFormFields(this.createExamForm);
    }
    
  }
  resetForm()
  {
    this.createExamForm.reset();
  }
}
