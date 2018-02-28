import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonUtility } from '../../shared/common-utility';
import { QuizMaster } from '../../models/quiz-master';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  createQuizForm: FormGroup;
  statusMessage:string;
  constructor(private _location: Location,
              private _quizService:QuizService) { }

  ngOnInit() {
    this.createValidationControls();
  }

  private createValidationControls(): void {

    this.createQuizForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required)    
    });
  }

  addQuiz() {
    if (this.createQuizForm.valid) {
      let quiz= new QuizMaster()
      quiz.name=this.createQuizForm.get('Name').value;
      quiz.description=this.createQuizForm.get('Description').value;   
      quiz.isActive=true;
    
      this._quizService.createQuiz(quiz).subscribe(
        res=>{
          if(res.isSucceeded){
            this._location.back();
          }
          else
          {
             this.statusMessage="Failed, Please try again !!"
          }
        },
        error=>console.error(error)        
      );
      
    }
    else {
      CommonUtility.validateAllFormFields(this.createQuizForm);
    }
  }



}


